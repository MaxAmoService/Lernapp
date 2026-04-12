"use client";

import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { allModules as modules, categories } from "@/lib/data";
import { ModuleCard } from "@/components/ModuleCard";
import { ProgressBar } from "@/components/ProgressBar";
import { LoginModal } from "@/components/LoginModal";
import { getUserLevel } from "@/lib/auth";
import { BookOpen, Clock, Trophy, Zap, Flame, Star, ArrowRight } from "lucide-react";

export default function Dashboard() {
  const { user, completeLesson } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  const totalProgress = user 
    ? Math.round(
        modules.reduce((acc, m) => {
          const completed = user.completedLessons[m.slug]?.length || 0;
          return acc + (completed / m.lessons.length) * 100;
        }, 0) / modules.length
      )
    : 8;

  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedLessons = user
    ? modules.reduce((acc, m) => acc + (user.completedLessons[m.slug]?.length || 0), 0)
    : 0;

  const levelInfo = user ? getUserLevel(user.totalXP) : null;

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
              Lerne React, TypeScript, Next.js und mehr - Schritt für Schritt mit interaktiven Lektionen.
            </p>
            <button
              onClick={() => setShowLogin(true)}
              className="mt-6 px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium text-lg transition-colors"
            >
              Jetzt kostenlos starten
            </button>
          </>
        )}
      </section>

      {/* Stats Grid (only if logged in) */}
      {user && (
        <section className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="glass rounded-xl p-6 card-hover">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <BookOpen className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Module</p>
                <p className="text-2xl font-bold">{user.completedModules.length}/{modules.length}</p>
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-6 card-hover">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <Trophy className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Lektionen</p>
                <p className="text-2xl font-bold">{completedLessons}/{totalLessons}</p>
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-6 card-hover">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-500/20 rounded-lg">
                <Flame className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Streak</p>
                <p className="text-2xl font-bold">{user.streak} Tage 🔥</p>
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-6 card-hover">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Zap className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">XP</p>
                <p className="text-2xl font-bold">{user.totalXP}</p>
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-6 card-hover">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-500/20 rounded-lg">
                <Star className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Level</p>
                <p className="text-2xl font-bold">{levelInfo?.level} - {levelInfo?.title}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Overall Progress */}
      <section className="glass rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">
          {user ? "Dein Gesamtfortschritt" : "Lerninhalte"}
        </h2>
        <ProgressBar value={totalProgress} />
        <p className="text-sm text-slate-400 mt-2">
          {totalProgress}% aller Module abgeschlossen
        </p>
      </section>

      {/* Continue Learning / Available Courses */}
      <section>
        <h2 className="text-2xl font-bold mb-6">
          {user ? "Weiter lernen" : "Verfügbare Kurse"}
        </h2>
        {categories.map((cat) => {
          const catModules = modules.filter((m) => m.category === cat.id);
          if (catModules.length === 0) return null;
          return (
            <div key={cat.id} className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{cat.icon}</span>
                <h3 className="text-xl font-semibold">{cat.name}</h3>
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

      {/* Quick Actions */}
      <section className="glass rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Schnellstart</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/modules/react-grundlagen"
            className="p-4 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors group"
          >
            <span className="text-2xl mb-2 block">⚛️</span>
            <span className="font-medium group-hover:text-blue-400 transition-colors">React lernen</span>
            <p className="text-sm text-slate-400 mt-1">5 Lektionen • ~50 min</p>
          </a>
          <a
            href="/modules/mathe-ableitungen"
            className="p-4 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors group"
          >
            <span className="text-2xl mb-2 block">📐</span>
            <span className="font-medium group-hover:text-blue-400 transition-colors">Mathe: Ableitungen</span>
            <p className="text-sm text-slate-400 mt-1">4 Lektionen • ~40 min</p>
          </a>
          <a
            href="/modules"
            className="p-4 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors border border-dashed border-slate-600 group"
          >
            <span className="text-2xl mb-2 block">📚</span>
            <span className="font-medium group-hover:text-blue-400 transition-colors">Alle Module ansehen</span>
            <p className="text-sm text-slate-400 mt-1">{modules.length} Module verfügbar</p>
          </a>
        </div>
      </section>

      {/* Features (only if not logged in) */}
      {!user && (
        <section className="glass rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Warum LearnHub?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <span className="text-4xl mb-4 block">🎯</span>
              <h3 className="font-semibold mb-2">Interaktive Lektionen</h3>
              <p className="text-slate-400 text-sm">Lerne mit Code-Beispielen und direktem Feedback</p>
            </div>
            <div className="text-center">
              <span className="text-4xl mb-4 block">🔥</span>
              <h3 className="font-semibold mb-2">Streak-Tracking</h3>
              <p className="text-slate-400 text-sm">Bleibe motiviert mit täglichen Lernzielen</p>
            </div>
            <div className="text-center">
              <span className="text-4xl mb-4 block">🏆</span>
              <h3 className="font-semibold mb-2">XP & Level</h3>
              <p className="text-slate-400 text-sm">Sammle Erfahrung und steige auf</p>
            </div>
          </div>
        </section>
      )}

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  );
}
