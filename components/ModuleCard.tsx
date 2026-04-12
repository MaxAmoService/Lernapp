"use client";

import { Module, categories } from "@/lib/data";
import { ProgressBar } from "./ProgressBar";
import { Clock, BookOpen } from "lucide-react";

interface ModuleCardProps {
  module: Module;
}

export function ModuleCard({ module }: ModuleCardProps) {
  const category = categories.find(c => c.id === module.category);

  return (
    <a
      href={`/modules/${module.slug}`}
      className="glass rounded-xl p-6 card-hover block group"
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-4xl">{module.icon}</span>
        <div className="flex items-center gap-2">
          {category && (
            <span className="px-2 py-1 rounded-full text-xs bg-slate-700 text-slate-300">
              {category.icon} {category.name}
            </span>
          )}
          <span
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={{ backgroundColor: `${module.color}20`, color: module.color }}
          >
            {module.progress}% fertig
          </span>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
        {module.title}
      </h3>
      <p className="text-slate-400 text-sm mb-4 line-clamp-2">
        {module.description}
      </p>

      <ProgressBar value={module.progress} color={module.color} />

      <div className="flex items-center gap-4 mt-4 text-sm text-slate-400">
        <span className="flex items-center gap-1">
          <BookOpen className="w-4 h-4" />
          {module.lessons.length} Lektionen
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          ~{module.lessons.length * 10} min
        </span>
      </div>
    </a>
  );
}
