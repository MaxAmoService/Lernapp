"use client";

import { Module, categories } from "@/lib/data";
import { useAuth } from "./AuthProvider";
import { ProgressBar } from "./ProgressBar";
import { Clock, BookOpen, CheckCircle2, Bookmark, BookmarkCheck } from "lucide-react";

interface ModuleCardProps {
  module: Module;
  compact?: boolean;
}

export function ModuleCard({ module, compact }: ModuleCardProps) {
  const { user, toggleSaveModule } = useAuth();
  const category = categories.find(c => c.id === module.category);

  // Calculate REAL progress from user data
  const completedLessons = user?.completedLessons[module.slug]?.length || 0;
  const totalLessons = module.lessons.length;
  const realProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  const isCompleted = completedLessons === totalLessons && totalLessons > 0;
  const isSaved = user?.savedModules?.includes(module.slug) || false;

  return (
    <div className="glass rounded-xl overflow-hidden card-hover group relative">
      {/* Save/Bookmark button */}
      {user && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleSaveModule(module.slug);
          }}
          className="absolute top-3 right-3 z-10 p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 transition-colors"
          title={isSaved ? "Aus Merkliste entfernen" : "Merken"}
        >
          {isSaved ? (
            <BookmarkCheck className="w-4 h-4 text-yellow-400" />
          ) : (
            <Bookmark className="w-4 h-4 text-slate-400" />
          )}
        </button>
      )}

      <a
        href={`/modules/${module.slug}`}
        className="block p-6"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <span className="text-4xl">{module.icon}</span>
          <div className="flex items-center gap-2">
            {category && (
              <span className="px-2 py-1 rounded-full text-xs bg-slate-700 text-slate-300">
                {category.icon} {category.name}
              </span>
            )}
            {isCompleted ? (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Fertig
              </span>
            ) : realProgress > 0 ? (
              <span
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{ backgroundColor: `${module.color}20`, color: module.color }}
              >
                {realProgress}%
              </span>
            ) : null}
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
          {module.title}
        </h3>
        <p className="text-slate-400 text-sm mb-4 line-clamp-2">
          {module.description}
        </p>

        {/* Progress */}
        <ProgressBar value={realProgress} color={isCompleted ? "#22c55e" : module.color} />

        {/* Meta */}
        <div className="flex items-center gap-4 mt-4 text-sm text-slate-400">
          <span className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            {completedLessons > 0 ? `${completedLessons}/${totalLessons}` : totalLessons} Lektionen
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            ~{totalLessons * 10} min
          </span>
        </div>
      </a>
    </div>
  );
}
