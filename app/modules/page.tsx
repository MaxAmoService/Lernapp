"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { allModules, categories } from "@/lib/data";
import { ModuleCard } from "@/components/ModuleCard";
import { useAuth } from "@/components/AuthProvider";
import {
  BookOpen,
  Search,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  Sparkles,
  X,
  Filter,
  SlidersHorizontal,
} from "lucide-react";

export default function ModulesPage() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(categories.map((c) => c.id))
  );
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    if (!showCategoryDropdown) return;
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowCategoryDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showCategoryDropdown]);

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
      !search ||
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
  const totalLessons = allModules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedLessons = user
    ? allModules.reduce((acc, m) => acc + (user.completedLessons[m.slug]?.length || 0), 0)
    : 0;
  const avgProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const selectedCat = categories.find((c) => c.id === selectedCategory);
  const activeFilterCount = (selectedCategory ? 1 : 0) + (search ? 1 : 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <section className="text-center py-6 sm:py-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">
          <BookOpen className="inline-block w-8 h-8 sm:w-10 sm:h-10 mr-2 text-blue-400" />
          Lern-Module
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Wähle ein Modul und starte deine Lernreise
        </p>
      </section>

      {/* Stats Bar */}
      <section className="grid grid-cols-3 gap-3">
        <div className="glass rounded-xl p-3 sm:p-4 text-center">
          <div className="text-xl sm:text-2xl font-bold text-blue-400">{totalModules}</div>
          <div className="text-[11px] sm:text-xs text-slate-400 mt-0.5">Module</div>
        </div>
        <div className="glass rounded-xl p-3 sm:p-4 text-center">
          <div className="text-xl sm:text-2xl font-bold text-green-400">{completedLessons}</div>
          <div className="text-[11px] sm:text-xs text-slate-400 mt-0.5">Lektionen</div>
        </div>
        <div className="glass rounded-xl p-3 sm:p-4 text-center">
          <div className="flex items-center justify-center gap-1.5">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
            <span className="text-xl sm:text-2xl font-bold text-emerald-400">{avgProgress}%</span>
          </div>
          <div className="text-[11px] sm:text-xs text-slate-400 mt-0.5">Ø Fortschritt</div>
        </div>
      </section>

      {/* Search + Filter Toolbar */}
      <section className="max-w-3xl mx-auto">
        <div className="glass rounded-xl p-3 sm:p-4">
          <div className="flex gap-2 sm:gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Module durchsuchen..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-8 sm:pr-10 py-2.5 sm:py-3 bg-slate-800/80 border border-slate-700/60 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-slate-500 text-sm sm:text-base transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border transition-all text-sm sm:text-base font-medium whitespace-nowrap ${
                  selectedCategory
                    ? "bg-blue-500/20 border-blue-500/40 text-blue-400"
                    : "bg-slate-800/80 border-slate-700/60 text-slate-300 hover:border-slate-600"
                }`}
              >
                {selectedCat ? (
                  <>
                    <span>{selectedCat.icon}</span>
                    <span className="hidden sm:inline">{selectedCat.name}</span>
                  </>
                ) : (
                  <>
                    <SlidersHorizontal className="w-4 h-4" />
                    <span className="hidden sm:inline">Kategorie</span>
                  </>
                )}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showCategoryDropdown ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown Menu */}
              {showCategoryDropdown && (
                <div className="absolute right-0 top-full mt-2 w-64 rounded-xl overflow-hidden border border-slate-700/80 bg-slate-900/95 backdrop-blur-xl shadow-2xl shadow-black/50 z-50 animate-slide-up">
                  <div className="p-2">
                    <button
                      onClick={() => { setSelectedCategory(null); setShowCategoryDropdown(false); }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all text-left ${
                        !selectedCategory
                          ? "bg-blue-500/20 text-blue-400"
                          : "text-slate-300 hover:bg-slate-800/80"
                      }`}
                    >
                      <span className="w-6 text-center">📋</span>
                      <span className="flex-1">Alle Kategorien</span>
                      <span className="text-xs text-slate-500">{totalModules}</span>
                    </button>
                    {categories.map((cat) => {
                      const count = allModules.filter((m) => m.category === cat.id).length;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => {
                            setSelectedCategory(selectedCategory === cat.id ? null : cat.id);
                            setShowCategoryDropdown(false);
                          }}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all text-left ${
                            selectedCategory === cat.id
                              ? "bg-blue-500/20 text-blue-400"
                              : "text-slate-300 hover:bg-slate-800/80"
                          }`}
                        >
                          <span className="w-6 text-center">{cat.icon}</span>
                          <span className="flex-1">{cat.name}</span>
                          <span className="text-xs text-slate-500">{count}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Active Filters */}
          {activeFilterCount > 0 && (
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-700/40">
              <Filter className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-xs text-slate-500">Filter:</span>
              {selectedCategory && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-500/15 text-blue-400 text-xs rounded-lg font-medium">
                  {selectedCat?.icon} {selectedCat?.name}
                  <button onClick={() => setSelectedCategory(null)} className="hover:text-white">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {search && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-violet-500/15 text-violet-400 text-xs rounded-lg font-medium">
                  &quot;{search}&quot;
                  <button onClick={() => setSearch("")} className="hover:text-white">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              <button
                onClick={() => { setSearch(""); setSelectedCategory(null); }}
                className="text-xs text-slate-500 hover:text-white ml-auto transition-colors"
              >
                Alle löschen
              </button>
            </div>
          )}
        </div>

        {/* Results count */}
        <p className="text-xs text-slate-500 text-center mt-2">
          {filteredModules.length} {filteredModules.length === 1 ? "Modul" : "Module"} gefunden
        </p>
      </section>

      {/* Modules by Category */}
      {groupedModules.length > 0 ? (
        <div className="space-y-4">
          {groupedModules.map((group) => {
            const isExpanded = expandedCategories.has(group.id);

            return (
              <section key={group.id} className="glass rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleCategory(group.id)}
                  className="w-full flex items-center gap-3 sm:gap-4 p-4 sm:p-5 hover:bg-slate-800/50 transition-colors text-left"
                >
                  <span className="text-2xl sm:text-3xl">{group.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg sm:text-xl font-bold">{group.name}</h2>
                    <p className="text-slate-400 text-xs sm:text-sm truncate">{group.description}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-xs sm:text-sm text-slate-500">
                      {group.modules.length} {group.modules.length === 1 ? "Modul" : "Module"}
                    </span>
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
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
        <div className="text-center py-12 glass rounded-xl">
          <p className="text-slate-400 text-lg mb-2">Keine Module gefunden</p>
          <p className="text-slate-500 text-sm">
            {search && `Für &quot;${search}&quot; `}
            {selectedCategory && `In ${selectedCat?.name} `}
            nicht verfügbar
          </p>
          <button
            onClick={() => { setSearch(""); setSelectedCategory(null); }}
            className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm text-slate-300 transition-colors"
          >
            Filter zurücksetzen
          </button>
        </div>
      )}

      {/* Coming Soon */}
      <section className="glass rounded-xl p-5 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-yellow-400" />
          Demnächst
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
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
