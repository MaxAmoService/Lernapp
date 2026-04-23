"use client";

import { useState, useMemo } from "react";
import { allModules, categories } from "@/lib/data";
import { ModuleCard } from "@/components/ModuleCard";
import {
  BookOpen,
  Search,
  ChevronDown,
  ChevronRight,
  BarChart3,
  CheckCircle2,
  TrendingUp,
  Sparkles,
} from "lucide-react";

export default function ModulesPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(categories.map((c) => c.id))
  );

  const toggleCategory = (catId: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(catId)) next.delete(catId);
      else next.add(catId);
      return next;
    });
  };

  const filteredModules = allModules.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !selectedCategory || m.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const groupedModules = useMemo(() => {
    return categories
      .map((cat) => ({
        ...cat,
        modules: filteredModules.filter((m) => m.category === cat.id),
      }))
      .filter((group) => group.modules.length > 0);
  }, [filteredModules]);

  // Stats
  const totalModules = allModules.length;
  const mathModules = allModules.filter((m) => m.category !== "programmieren").length;
  const programmingModules = allModules.filter((m) => m.category === "programmieren").length;
  const completedModules = allModules.filter((m) => m.progress === 100).length;
  const avgProgress =
    totalModules > 0
      ? Math.round(
          allModules.reduce((sum, m) => sum + (m.progress || 0), 0) / totalModules
        )
      : 0;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold mb-4">
          <BookOpen className="inline-block w-10 h-10 mr-3 text-blue-400" />
          Lern-Module
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Wähle ein Modul und starte deine Lernreise
        </p>
      </section>

      {/* Stats Bar */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">{totalModules}</div>
          <div className="text-xs text-slate-400 mt-1">Module gesamt</div>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-purple-400">{mathModules}</div>
          <div className="text-xs text-slate-400 mt-1">Mathematik</div>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-cyan-400">{programmingModules}</div>
          <div className="text-xs text-slate-400 mt-1">Programmieren</div>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <span className="text-2xl font-bold text-emerald-400">{avgProgress}%</span>
          </div>
          <div className="text-xs text-slate-400 mt-1">Ø Fortschritt</div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="max-w-2xl mx-auto space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Module durchsuchen..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-lg transition-all ${
              !selectedCategory
                ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            Alle ({totalModules})
          </button>
          {categories.map((cat) => {
            const count = allModules.filter((m) => m.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() =>
                  setSelectedCategory(selectedCategory === cat.id ? null : cat.id)
                }
                className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                  selectedCategory === cat.id
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
                <span className="text-xs opacity-70">({count})</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Modules by Category - Accordion */}
      {groupedModules.length > 0 ? (
        <div className="space-y-6">
          {groupedModules.map((group) => {
            const isExpanded = expandedCategories.has(group.id);
            const catProgress =
              group.modules.length > 0
                ? Math.round(
                    group.modules.reduce((s, m) => s + (m.progress || 0), 0) /
                      group.modules.length
                  )
                : 0;

            return (
              <section key={group.id} className="glass rounded-xl overflow-hidden">
                {/* Category Header - Clickable */}
                <button
                  onClick={() => toggleCategory(group.id)}
                  className="w-full flex items-center gap-4 p-5 hover:bg-slate-800/50 transition-colors text-left"
                >
                  <span className="text-3xl">{group.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-bold">{group.name}</h2>
                    <p className="text-slate-400 text-sm">{group.description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    {/* Mini progress bar */}
                    <div className="hidden md:flex items-center gap-2">
                      <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all"
                          style={{ width: `${catProgress}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-400 w-10 text-right">
                        {catProgress}%
                      </span>
                    </div>
                    <span className="text-sm text-slate-500">
                      {group.modules.length}{" "}
                      {group.modules.length === 1 ? "Modul" : "Module"}
                    </span>
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </button>

                {/* Modules Grid - Collapsible */}
                {isExpanded && (
                  <div className="px-5 pb-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {group.modules.map((module) => (
                        <ModuleCard key={module.id} module={module} />
                      ))}
                    </div>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-slate-400 text-lg">
            Keine Module gefunden für &quot;{search}&quot;
          </p>
        </div>
      )}

      {/* Coming Soon */}
      <section className="glass rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-yellow-400" />
          Demnächst
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: "🐍", name: "Python", desc: "Programmieren" },
            { icon: "🗄️", name: "Datenbanken", desc: "Programmieren" },
            { icon: "📊", name: "Machine Learning", desc: "KI" },
          ].map((item) => (
            <div
              key={item.name}
              className="p-4 bg-slate-800/30 rounded-lg border border-dashed border-slate-600"
            >
              <span className="text-2xl mb-2 block">{item.icon}</span>
              <span className="font-medium text-slate-400">{item.name}</span>
              <p className="text-sm text-slate-500 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
