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

export function PAPExample({ width = 400, height = 700, className = "" }: PAPSymbolProps) {
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <div className="text-center">
        <h3 className="text-xl font-bold text-white mb-1">☕ Beispiel: Kaffeemaschine</h3>
        <p className="text-sm text-slate-400">Ein kompletter PAP mit Entscheidung und Rückkopplung</p>
      </div>
      <div className="bg-slate-900/40 rounded-xl p-5 border border-slate-700/30">
        <svg width={width} height={height} viewBox="0 0 420 660" className="max-w-full">
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
          <rect x="150" y="15" width="120" height="48" rx="24" ry="24" fill="#22c55e" stroke="#15803d" strokeWidth="2.5" />
          <text x="210" y="44" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">Start</text>
          <line x1="210" y1="63" x2="210" y2="95" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#ex-arrow)" />

          {/* Eingabe: Geld */}
          <polygon points="125,100 295,100 275,140 105,140" fill="#a855f7" stroke="#6d28d9" strokeWidth="2.5" />
          <text x="200" y="125" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Geld einwerfen</text>
          <line x1="200" y1="140" x2="200" y2="175" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#ex-arrow)" />

          {/* Eingabe: Betrag */}
          <polygon points="125,180 295,180 275,220 105,220" fill="#a855f7" stroke="#6d28d9" strokeWidth="2.5" />
          <text x="200" y="205" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Betrag eingeben</text>
          <line x1="200" y1="220" x2="200" y2="260" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#ex-arrow)" />

          {/* Entscheidung */}
          <polygon points="200,265 295,320 200,375 105,320" fill="#f59e0b" stroke="#b45309" strokeWidth="2.5" />
          <text x="200" y="315" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Betrag</text>
          <text x="200" y="333" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">≥ Preis?</text>

          {/* JA-Pfeil */}
          <line x1="295" y1="320" x2="340" y2="320" stroke="#22c55e" strokeWidth="2.5" markerEnd="url(#ex-arrow-green)" />
          <rect x="326" y="294" width="28" height="18" rx="9" ry="9" fill="#22c55e" />
          <text x="340" y="307" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Ja</text>

          {/* Operation: Kaffee */}
          <rect x="345" y="300" width="70" height="44" rx="3" ry="3" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2.5" />
          <text x="380" y="320" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Kaffee</text>
          <text x="380" y="336" textAnchor="middle" fill="white" fontSize="10">zubereiten</text>
          <line x1="380" y1="344" x2="380" y2="395" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#ex-arrow)" />

          {/* Ausgabe: Ihr Kaffee */}
          <polygon points="305,400 455,400 435,440 285,440" fill="#a855f7" stroke="#6d28d9" strokeWidth="2.5" />
          <text x="370" y="425" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Ihr Kaffee ☕</text>
          <line x1="370" y1="440" x2="370" y2="485" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#ex-arrow)" />

          {/* Ende */}
          <rect x="310" y="490" width="120" height="48" rx="24" ry="24" fill="#ef4444" stroke="#dc2626" strokeWidth="2.5" />
          <text x="370" y="520" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">Ende</text>

          {/* NEIN-Pfeil */}
          <line x1="200" y1="375" x2="200" y2="425" stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#ex-arrow-red)" />
          <rect x="186" y="392" width="28" height="18" rx="9" ry="9" fill="#ef4444" />
          <text x="200" y="405" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Nein</text>

          {/* Ausgabe: Zu wenig */}
          <polygon points="125,430 295,430 275,470 105,470" fill="#a855f7" stroke="#6d28d9" strokeWidth="2.5" />
          <text x="200" y="455" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Zu wenig Guthaben!</text>

          {/* Rückpfeil */}
          <line x1="200" y1="470" x2="200" y2="510" stroke="#94a3b8" strokeWidth="2" />
          <line x1="200" y1="510" x2="70" y2="510" stroke="#94a3b8" strokeWidth="2" />
          <line x1="70" y1="510" x2="70" y2="125" stroke="#94a3b8" strokeWidth="2" />
          <line x1="70" y1="125" x2="105" y2="125" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#ex-arrow)" />
          <text x="60" y="320" textAnchor="end" fill="#94a3b8" fontSize="11" transform="rotate(-90, 60, 320)">↩ Erneut versuchen</text>

          {/* Legende */}
          <g transform="translate(10, 580)">
            <rect x="0" y="0" width="14" height="14" rx="7" fill="#22c55e" />
            <text x="20" y="12" fill="#94a3b8" fontSize="11">Start/Ende</text>
            <rect x="110" y="0" width="14" height="14" rx="2" fill="#3b82f6" />
            <text x="130" y="12" fill="#94a3b8" fontSize="11">Operation</text>
            <polygon points="240,0 254,7 240,14 226,7" fill="#f59e0b" />
            <text x="262" y="12" fill="#94a3b8" fontSize="11">Entscheidung</text>
            <polygon points="0,28 14,21 28,28 14,35" fill="#a855f7" />
            <text x="36" y="30" fill="#94a3b8" fontSize="11">Ein-/Ausgabe</text>
            <line x1="180" y1="28" x2="210" y2="28" stroke="#94a3b8" strokeWidth="2" />
            <polygon points="210,23 220,28 210,33" fill="#94a3b8" />
            <text x="228" y="30" fill="#94a3b8" fontSize="11">Flusspfeil</text>
          </g>
        </svg>
      </div>
    </div>
  );
}
