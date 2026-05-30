"use client";

import { SkillTreeGraph } from "@/components/SkillTreeGraph";

export default function SkillTreePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="text-center pt-8 pb-4 px-4">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
          🌳 Skill Tree
        </h1>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Dein Lernpfad — schalte Module frei, indem du die Voraussetzungen abschließt.
          Klicke auf einen Knoten um zum Modul zu gehen.
        </p>
        <div className="flex justify-center gap-6 mt-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-green-400 shadow-[0_0_8px_rgba(0,255,136,0.6)]"></span>
            <span className="text-slate-400">Abgeschlossen</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(0,170,255,0.4)]"></span>
            <span className="text-slate-400">Verfügbar</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-slate-600"></span>
            <span className="text-slate-400">Gesperrt</span>
          </span>
        </div>
      </div>

      {/* Skill Tree */}
      <div className="w-full h-[calc(100vh-200px)]">
        <SkillTreeGraph />
      </div>
    </div>
  );
}
