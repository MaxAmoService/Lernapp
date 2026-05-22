"use client";

import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { allModules as modules, categories } from "@/lib/data";
import { ModuleCard } from "@/components/ModuleCard";
import { ProgressBar } from "@/components/ProgressBar";
import { LoginModal } from "@/components/LoginModal";
import { getUserLevel } from "@/lib/auth";
import { BookOpen, Trophy, Zap, Flame, Star, ArrowRight, Library, RotateCcw } from "lucide-react";

export default function Dashboard() {
  const { user, resetAll } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const levelInfo = user ? getUserLevel(user.totalXP) : null;

  // Modules with actual progress
  const startedModules = user ? modules.filter((m) => {
    const allCompleted = user.completedLessons[m.slug] || [];
    const lessonIdSet = new Set(m.lessons.map(l => l.id));
    const completed = allCompleted.filter(id => lessonIdSet.has(id)).length;
    return completed > 0 && completed < m.lessons.length;
  }) : [];

  const completedModules = user ? modules.filter((m) => {
    return user.completedModules.includes(m.slug);
  }) : [];

  const savedModules = user?.savedModules
    ? modules.filter((m) => user.savedModules?.includes(m.slug) && !startedModules.includes(m) && !completedModules.includes(m))
    : [];

  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedLessons = user
    ? modules.reduce((acc, m) => {
      const allCompleted = user.completedLessons[m.slug] || [];
      const lessonIdSet = new Set(m.lessons.map(l => l.id));
      return acc + allCompleted.filter(id => lessonIdSet.has(id)).length;
    }, 0)
    : 0;

  const totalProgress = totalLessons > 0 ? Math.min(100, Math.round((completedLessons / totalLessons) * 100)) : 0;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <section className="text-center py-8">
        {user ? (
          <>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Willkommen zurück, <span className="gradient-text">{user.username}</span>! {user.avatar}
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              {user.streak > 1
                ? `🔥 ${user.streak} Tage Streak! Weiter so!`
                : "Bereit zum Lernen? Setze deinen Streak fort!"}
            </p>
          </>
        ) : (
          <>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Willkommen bei <span className="gradient-text">LearnHub</span>! 🎓
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Lerne Mathe, Programmierung und IHK-Inhalte — interaktiv und kostenlos.
            </p>
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={() => setShowLogin(true)}
                className="px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium text-lg transition-colors"
              >
                Jetzt kostenlos starten
              </button>
              <a
                href="/modules"
                className="px-8 py-3 border border-slate-600 hover:border-slate-500 rounded-lg font-medium text-lg transition-colors text-slate-300 hover:text-white"
              >
                Module ansehen
              </a>
            </div>
          </>
        )}
      </section>

      {/* Stats Grid (only if logged in) */}
      {user && (
        <section className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="glass rounded-xl p-4 md:p-6 card-hover">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-500/20 rounded-lg">
                <BookOpen className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-slate-400 text-xs">Module</p>
                <p className="text-xl font-bold">{user.completedModules.length}/{modules.length}</p>
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-4 md:p-6 card-hover">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-green-500/20 rounded-lg">
                <Trophy className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-slate-400 text-xs">Lektionen</p>
                <p className="text-xl font-bold">{completedLessons}/{totalLessons}</p>
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-4 md:p-6 card-hover">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-orange-500/20 rounded-lg">
                <Flame className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <p className="text-slate-400 text-xs">Streak</p>
                <p className="text-xl font-bold">{user.streak} 🔥</p>
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-4 md:p-6 card-hover">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-purple-500/20 rounded-lg">
                <Zap className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-slate-400 text-xs">XP</p>
                <p className="text-xl font-bold">{user.totalXP}</p>
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-4 md:p-6 card-hover col-span-2 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-yellow-500/20 rounded-lg">
                <Star className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-slate-400 text-xs">Level {levelInfo?.level}</p>
                <p className="text-xl font-bold">{levelInfo?.title}</p>
              </div>
            </div>
            {levelInfo && (
              <div className="mt-2">
                <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all"
                    style={{ width: `${levelInfo.progress}%` }}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">{levelInfo.xpToNext} XP bis Level {levelInfo.level + 1}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Overall Progress (only if logged in) */}
      {user && (
        <section className="glass rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Gesamtfortschritt</h2>
            <span className="text-sm text-slate-400">{totalProgress}%</span>
          </div>
          <ProgressBar value={totalProgress} />
        </section>
      )}

      {/* Continue Learning — gestartete Module */}
      {user && startedModules.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-blue-400">▶</span> Weiter lernen
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {startedModules.map((module) => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>
        </section>
      )}

      {/* Completed Modules */}
      {user && completedModules.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-green-400">✅</span> Abgeschlossen
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedModules.map((module) => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>
        </section>
      )}

      {/* Saved / Bookmarked Modules */}
      {user && savedModules.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-yellow-400">🔖</span> Gemerkt
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedModules.map((module) => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>
        </section>
      )}

      {/* Empty State — logged in but nothing started */}
      {user && startedModules.length === 0 && completedModules.length === 0 && savedModules.length === 0 && (
        <section className="glass rounded-xl p-12 text-center">
          <Library className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Noch nichts gestartet</h2>
          <p className="text-slate-400 mb-6 max-w-md mx-auto">
            Entdecke unsere {modules.length} Module und starte deine Lernreise!
          </p>
          <a
            href="/modules"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition-colors"
          >
            Module entdecken <ArrowRight className="w-4 h-4" />
          </a>
        </section>
      )}

      {/* Not logged in — show all modules by category */}
      {!user && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Verfügbare Kurse</h2>
          {categories.map((cat) => {
            const catModules = modules.filter((m) => m.category === cat.id);
            if (catModules.length === 0) return null;
            return (
              <div key={cat.id} className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{cat.icon}</span>
                  <h3 className="text-xl font-semibold">{cat.name}</h3>
                  <span className="text-sm text-slate-500">({catModules.length})</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {catModules.map((module) => (
                    <ModuleCard key={module.id} module={module} />
                  ))}
                </div>
              </div>
            );
          })}
        </section>
      )}

      {/* Features (only if not logged in) */}
      {!user && (
        <section className="glass rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Warum LearnHub?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <span className="text-4xl mb-4 block">🎯</span>
              <h3 className="font-semibold mb-2">Interaktive Lektionen</h3>
              <p className="text-slate-400 text-sm">Lerne mit Code-Beispielen, Visualisierungen und direktem Feedback</p>
            </div>
            <div className="text-center">
              <span className="text-4xl mb-4 block">🔥</span>
              <h3 className="font-semibold mb-2">Streak-Tracking</h3>
              <p className="text-slate-400 text-sm">Bleibe motiviert mit täglichen Lernzielen und Streaks</p>
            </div>
            <div className="text-center">
              <span className="text-4xl mb-4 block">🏆</span>
              <h3 className="font-semibold mb-2">XP & Level</h3>
              <p className="text-slate-400 text-sm">Sammle Erfahrung, steige auf und sammle Erfolge</p>
            </div>
          </div>
        </section>
      )}

      {/* Admin: Reset Data */}
      {user && (
        <section className="glass rounded-xl p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-400">Daten zurücksetzen</p>
            {!showResetConfirm ? (
              <button
                onClick={() => setShowResetConfirm(true)}
                className="text-xs text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Alle Daten löschen
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xs text-red-400">Wirklich alles löschen?</span>
                <button
                  onClick={() => { resetAll(); setShowResetConfirm(false); }}
                  className="text-xs px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
                >
                  Ja, löschen
                </button>
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="text-xs px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded transition-colors"
                >
                  Abbrechen
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  );
}
