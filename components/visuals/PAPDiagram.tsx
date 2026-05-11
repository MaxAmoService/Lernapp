"use client";

import React from "react";

interface PAPSymbolProps {
  width?: number;
  height?: number;
  className?: string;
}

export function PAPSymbolOverview({ width = 400, height = 500, className = "" }: PAPSymbolProps) {
  return (
    <div className={`flex flex-col items-center gap-5 ${className}`}>
      <div className="text-center">
        <h3 className="text-xl font-bold text-white mb-1">PAP-Symbole nach DIN 66001</h3>
        <p className="text-sm text-slate-400">Die 5 Grundelemente des Programmablaufplans</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl">
        {/* Start/Ende */}
        <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-xl border border-green-500/20 hover:border-green-500/40 transition-colors">
          <svg width="90" height="50" viewBox="0 0 200 80" className="shrink-0">
            <rect x="10" y="10" width="180" height="60" rx="30" ry="30" fill="#22c55e" stroke="#15803d" strokeWidth="3" />
            <text x="100" y="46" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">Start</text>
          </svg>
          <div>
            <p className="text-white font-semibold text-sm">Start / Ende</p>
            <p className="text-slate-400 text-xs mt-0.5">Oval — Beginn oder Ende des Programms</p>
          </div>
        </div>

        {/* Operation */}
        <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-colors">
          <svg width="90" height="50" viewBox="0 0 200 80" className="shrink-0">
            <rect x="10" y="10" width="180" height="60" rx="4" ry="4" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="3" />
            <text x="100" y="46" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">x = x + 1</text>
          </svg>
          <div>
            <p className="text-white font-semibold text-sm">Operation</p>
            <p className="text-slate-400 text-xs mt-0.5">Rechteck — Berechnung, Zuweisung</p>
          </div>
        </div>

        {/* Entscheidung */}
        <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-amber-500/10 to-amber-500/5 rounded-xl border border-amber-500/20 hover:border-amber-500/40 transition-colors">
          <svg width="90" height="60" viewBox="0 0 200 100" className="shrink-0">
            <polygon points="100,5 190,50 100,95 10,50" fill="#f59e0b" stroke="#b45309" strokeWidth="3" />
            <text x="100" y="46" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">x &gt; 5?</text>
            <text x="100" y="64" textAnchor="middle" fill="white" fontSize="11">(Ja / Nein)</text>
          </svg>
          <div>
            <p className="text-white font-semibold text-sm">Entscheidung</p>
            <p className="text-slate-400 text-xs mt-0.5">Raute — Ja/Nein-Verzweigung</p>
          </div>
        </div>

        {/* Ein-/Ausgabe */}
        <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-colors">
          <svg width="100" height="50" viewBox="0 0 220 80" className="shrink-0">
            <polygon points="40,10 210,10 180,70 10,70" fill="#a855f7" stroke="#6d28d9" strokeWidth="3" />
            <text x="110" y="46" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">input(x)</text>
          </svg>
          <div>
            <p className="text-white font-semibold text-sm">Ein- / Ausgabe</p>
            <p className="text-slate-400 text-xs mt-0.5">Parallelogramm — Nutzereingabe oder Ausgabe</p>
          </div>
        </div>

        {/* Verbinder + Flusspfeil */}
        <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 rounded-xl border border-cyan-500/20 hover:border-cyan-500/40 transition-colors sm:col-span-2">
          <svg width="60" height="50" viewBox="0 0 80 80" className="shrink-0">
            <circle cx="40" cy="40" r="28" fill="#06b6d4" stroke="#0891b2" strokeWidth="3" />
            <text x="40" y="44" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">A</text>
          </svg>
          <div className="flex-1">
            <p className="text-white font-semibold text-sm">Verbinder</p>
            <p className="text-slate-400 text-xs mt-0.5">Verbindung zwischen entfernten Punkten</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-lg">
            <svg width="30" height="14" viewBox="0 0 30 14">
              <line x1="0" y1="7" x2="20" y2="7" stroke="#94a3b8" strokeWidth="2.5" />
              <polygon points="20,2 30,7 20,12" fill="#94a3b8" />
            </svg>
            <span className="text-xs text-slate-400">Flusspfeil</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PAPExample({ width = 400, height = 600, className = "" }: PAPSymbolProps) {
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <div className="text-center">
        <h3 className="text-xl font-bold text-white mb-1">☕ Beispiel: Kaffeemaschine</h3>
        <p className="text-sm text-slate-400">Ein kompletter PAP mit Entscheidung und Rückkopplung</p>
      </div>
      <div className="bg-slate-900/40 rounded-xl p-4 border border-slate-700/30">
        <svg width={width} height={height} viewBox="0 0 420 520" className="max-w-full">
          <defs>
            <marker id="ex-arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
            </marker>
            <marker id="ex-arrow-green" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
            </marker>
            <marker id="ex-arrow-red" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
            </marker>
          </defs>

          {/* START */}
          <rect x="150" y="10" width="120" height="45" rx="22" ry="22" fill="#22c55e" stroke="#15803d" strokeWidth="2.5" />
          <text x="210" y="38" textAnchor="middle" fill="white" fontSize="15" fontWeight="bold">Start</text>
          <line x1="210" y1="55" x2="210" y2="80" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#ex-arrow)" />

          {/* Eingabe: Geld */}
          <polygon points="130,85 290,85 270,120 110,120" fill="#a855f7" stroke="#6d28d9" strokeWidth="2.5" />
          <text x="200" y="107" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Geld einwerfen</text>
          <line x1="200" y1="120" x2="200" y2="148" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#ex-arrow)" />

          {/* Eingabe: Betrag */}
          <polygon points="130,153 290,153 270,188 110,188" fill="#a855f7" stroke="#6d28d9" strokeWidth="2.5" />
          <text x="200" y="175" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Betrag eingeben</text>
          <line x1="200" y1="188" x2="200" y2="218" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#ex-arrow)" />

          {/* Entscheidung */}
          <polygon points="200,223 285,268 200,313 115,268" fill="#f59e0b" stroke="#b45309" strokeWidth="2.5" />
          <text x="200" y="264" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Betrag</text>
          <text x="200" y="280" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">≥ Preis?</text>

          {/* JA-Pfeil */}
          <line x1="285" y1="268" x2="330" y2="268" stroke="#22c55e" strokeWidth="2.5" markerEnd="url(#ex-arrow-green)" />
          <rect x="318" y="244" width="28" height="18" rx="9" ry="9" fill="#22c55e" />
          <text x="332" y="257" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Ja</text>

          {/* Operation: Kaffee */}
          <rect x="335" y="248" width="75" height="40" rx="3" ry="3" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2.5" />
          <text x="372" y="272" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Kaffee</text>
          <text x="372" y="284" textAnchor="middle" fill="white" fontSize="9">zubereiten</text>
          <line x1="372" y1="288" x2="372" y2="330" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#ex-arrow)" />

          {/* Ausgabe: Ihr Kaffee */}
          <polygon points="305,335 440,335 420,370 285,370" fill="#a855f7" stroke="#6d28d9" strokeWidth="2.5" />
          <text x="362" y="357" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Ihr Kaffee ☕</text>
          <line x1="362" y1="370" x2="362" y2="405" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#ex-arrow)" />

          {/* Ende */}
          <rect x="302" y="410" width="120" height="45" rx="22" ry="22" fill="#ef4444" stroke="#dc2626" strokeWidth="2.5" />
          <text x="362" y="438" textAnchor="middle" fill="white" fontSize="15" fontWeight="bold">Ende</text>

          {/* NEIN-Pfeil */}
          <line x1="200" y1="313" x2="200" y2="350" stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#ex-arrow-red)" />
          <rect x="186" y="326" width="28" height="18" rx="9" ry="9" fill="#ef4444" />
          <text x="200" y="339" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Nein</text>

          {/* Ausgabe: Zu wenig */}
          <polygon points="130,355 290,355 270,390 110,390" fill="#a855f7" stroke="#6d28d9" strokeWidth="2.5" />
          <text x="200" y="377" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Zu wenig Guthaben!</text>

          {/* Rückpfeil */}
          <line x1="200" y1="390" x2="200" y2="420" stroke="#94a3b8" strokeWidth="2" />
          <line x1="200" y1="420" x2="75" y2="420" stroke="#94a3b8" strokeWidth="2" />
          <line x1="75" y1="420" x2="75" y2="107" stroke="#94a3b8" strokeWidth="2" />
          <line x1="75" y1="107" x2="110" y2="107" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#ex-arrow)" />
          <text x="68" y="270" textAnchor="end" fill="#94a3b8" fontSize="10" transform="rotate(-90, 68, 270)">↩ Erneut versuchen</text>

          {/* Legende */}
          <g transform="translate(10, 470)">
            <rect x="0" y="0" width="12" height="12" rx="6" fill="#22c55e" />
            <text x="18" y="11" fill="#94a3b8" fontSize="10">Start/Ende</text>
            <rect x="100" y="0" width="12" height="12" rx="2" fill="#3b82f6" />
            <text x="118" y="11" fill="#94a3b8" fontSize="10">Operation</text>
            <polygon points="220,0 232,6 220,12 208,6" fill="#f59e0b" />
            <text x="240" y="11" fill="#94a3b8" fontSize="10">Entscheidung</text>
            <polygon points="10,24 22,18 34,24 22,30" fill="#a855f7" />
            <text x="42" y="25" fill="#94a3b8" fontSize="10">Ein-/Ausgabe</text>
          </g>
        </svg>
      </div>
    </div>
  );
}
