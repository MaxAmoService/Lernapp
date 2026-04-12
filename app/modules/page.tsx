"use client";

import { useState } from "react";
import { allModules, categories } from "@/lib/data";
import { ModuleCard } from "@/components/ModuleCard";
import { BookOpen, Search } from "lucide-react";

export default function ModulesPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredModules = allModules.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !selectedCategory || m.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Group modules by category
  const groupedModules = categories.map((cat) => ({
    ...cat,
    modules: filteredModules.filter((m) => m.category === cat.id),
  })).filter((group) => group.modules.length > 0);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold mb-4">
          <BookOpen className="inline-block w-10 h-10 mr-3 text-blue-400" />
          Lern-Module
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Wähle ein Modul und starte deine Lernreise. Jedes Modul enthält
          interaktive Lektionen, Code-Beispiele und Quizzes.
        </p>
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
            className={`px-4 py-2 rounded-lg transition-colors ${
              !selectedCategory
                ? "bg-blue-500 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            Alle
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                selectedCategory === cat.id
                  ? "bg-blue-500 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Modules by Category */}
      {groupedModules.length > 0 ? (
        groupedModules.map((group) => (
          <section key={group.id}>
            {/* Category Header */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">{group.icon}</span>
              <div>
                <h2 className="text-2xl font-bold">{group.name}</h2>
                <p className="text-slate-400 text-sm">{group.description}</p>
              </div>
              <span className="ml-auto text-sm text-slate-500">
                {group.modules.length} {group.modules.length === 1 ? "Modul" : "Module"}
              </span>
            </div>

            {/* Modules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.modules.map((module) => (
                <ModuleCard key={module.id} module={module} />
              ))}
            </div>
          </section>
        ))
      ) : (
        <div className="text-center py-12">
          <p className="text-slate-400 text-lg">
            Keine Module gefunden für "{search}"
          </p>
        </div>
      )}

      {/* Coming Soon */}
      <section className="glass rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">🚧 Demnächst</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-800/30 rounded-lg border border-dashed border-slate-600">
            <span className="text-2xl mb-2 block">🐍</span>
            <span className="font-medium text-slate-400">Python</span>
            <p className="text-sm text-slate-500 mt-1">Programmieren</p>
          </div>
          <div className="p-4 bg-slate-800/30 rounded-lg border border-dashed border-slate-600">
            <span className="text-2xl mb-2 block">🗄️</span>
            <span className="font-medium text-slate-400">Datenbanken</span>
            <p className="text-sm text-slate-500 mt-1">Programmieren</p>
          </div>
          <div className="p-4 bg-slate-800/30 rounded-lg border border-dashed border-slate-600">
            <span className="text-2xl mb-2 block">📊</span>
            <span className="font-medium text-slate-400">Statistik</span>
            <p className="text-sm text-slate-500 mt-1">Mathe</p>
          </div>
        </div>
      </section>
    </div>
  );
}
