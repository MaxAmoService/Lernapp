"use client";

import React from "react";

interface PAPSymbolProps {
  width?: number;
  height?: number;
  className?: string;
}

// Einzelne PAP-Symbole als SVG
export function PAPStartEnd({ width = 200, height = 80, className = "" }: PAPSymbolProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 200 80" className={className}>
      <defs>
        <linearGradient id="pap-start-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>
      </defs>
      <rect x="10" y="10" width="180" height="60" rx="30" ry="30"
        fill="url(#pap-start-grad)" stroke="#15803d" strokeWidth="2" />
      <text x="100" y="46" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">
        Start / Ende
      </text>
    </svg>
  );
}

export function PAPOperation({ width = 200, height = 80, className = "" }: PAPSymbolProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 200 80" className={className}>
      <defs>
        <linearGradient id="pap-op-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
      </defs>
      <rect x="10" y="10" width="180" height="60" rx="4" ry="4"
        fill="url(#pap-op-grad)" stroke="#1d4ed8" strokeWidth="2" />
      <text x="100" y="46" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">
        Operation
      </text>
    </svg>
  );
}

export function PAPDecision({ width = 200, height = 100, className = "" }: PAPSymbolProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 200 100" className={className}>
      <defs>
        <linearGradient id="pap-dec-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
      <polygon points="100,5 190,50 100,95 10,50"
        fill="url(#pap-dec-grad)" stroke="#b45309" strokeWidth="2" />
      <text x="100" y="46" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
        Entscheidung
      </text>
      <text x="100" y="64" textAnchor="middle" fill="white" fontSize="11">
        (Ja / Nein)
      </text>
    </svg>
  );
}

export function PAPIO({ width = 220, height = 80, className = "" }: PAPSymbolProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 220 80" className={className}>
      <defs>
        <linearGradient id="pap-io-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      {/* Parallelogramm */}
      <polygon points="40,10 210,10 180,70 10,70"
        fill="url(#pap-io-grad)" stroke="#6d28d9" strokeWidth="2" />
      <text x="110" y="46" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
        Ein- / Ausgabe
      </text>
    </svg>
  );
}

export function PAPConnector({ width = 200, height = 80, className = "" }: PAPSymbolProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 200 80" className={className}>
      <circle cx="100" cy="40" r="28" fill="#06b6d4" stroke="#0891b2" strokeWidth="2" />
      <text x="100" y="45" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">
        Verbinder
      </text>
    </svg>
  );
}

// Alle Symbole zusammen als Übersicht
export function PAPSymbolOverview({ width = 400, height = 500, className = "" }: PAPSymbolProps) {
  return (
    <div className={`flex flex-col items-center gap-6 ${className}`}>
      <h3 className="text-lg font-bold text-white">PAP-Symbole nach DIN 66001</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl">
        <div className="flex flex-col items-center p-3 bg-slate-800/50 rounded-lg border border-green-500/30">
          <svg width="160" height="60" viewBox="0 0 200 80">
            <rect x="10" y="10" width="180" height="60" rx="30" ry="30" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
            <text x="100" y="46" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Start / Ende</text>
          </svg>
          <p className="text-sm text-slate-400 mt-2 text-center">Beginn oder Ende des Programms</p>
        </div>
        <div className="flex flex-col items-center p-3 bg-slate-800/50 rounded-lg border border-blue-500/30">
          <svg width="160" height="60" viewBox="0 0 200 80">
            <rect x="10" y="10" width="180" height="60" rx="4" ry="4" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2" />
            <text x="100" y="46" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Operation</text>
          </svg>
          <p className="text-sm text-slate-400 mt-2 text-center">Berechnung, Zuweisung, Aktion</p>
        </div>
        <div className="flex flex-col items-center p-3 bg-slate-800/50 rounded-lg border border-amber-500/30">
          <svg width="160" height="80" viewBox="0 0 200 100">
            <polygon points="100,5 190,50 100,95 10,50" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
            <text x="100" y="46" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Entscheidung</text>
            <text x="100" y="62" textAnchor="middle" fill="white" fontSize="10">(Ja / Nein)</text>
          </svg>
          <p className="text-sm text-slate-400 mt-2 text-center">Verzweigung: Ja oder Nein</p>
        </div>
        <div className="flex flex-col items-center p-3 bg-slate-800/50 rounded-lg border border-purple-500/30">
          <svg width="180" height="60" viewBox="0 0 220 80">
            <polygon points="40,10 210,10 180,70 10,70" fill="#a855f7" stroke="#6d28d9" strokeWidth="2" />
            <text x="110" y="46" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Ein- / Ausgabe</text>
          </svg>
          <p className="text-sm text-slate-400 mt-2 text-center">Eingabe vom Nutzer oder Ausgabe</p>
        </div>
        <div className="flex flex-col items-center p-3 bg-slate-800/50 rounded-lg border border-cyan-500/30 col-span-1 sm:col-span-2">
          <svg width="60" height="60" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="28" fill="#06b6d4" stroke="#0891b2" strokeWidth="2" />
            <text x="40" y="44" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Verbinder</text>
          </svg>
          <p className="text-sm text-slate-400 mt-2 text-center">Verbindung zwischen entfernten Punkten im Flussdiagramm</p>
        </div>
      </div>
      {/* Flusspfeil */}
      <div className="flex items-center gap-2 text-slate-400">
        <svg width="30" height="20" viewBox="0 0 30 20">
          <line x1="0" y1="10" x2="22" y2="10" stroke="#94a3b8" strokeWidth="2" />
          <polygon points="22,5 30,10 22,15" fill="#94a3b8" />
        </svg>
        <span className="text-sm">Flusspfeil = Richtung des Ablaufs</span>
      </div>
    </div>
  );
}

// Ein einfacher PAP als Beispiel (Kaffeemaschine)
export function PAPExample({ width = 400, height = 600, className = "" }: PAPSymbolProps) {
  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <h3 className="text-lg font-bold text-white mb-2">Beispiel: PAP Kaffeemaschine</h3>
      <svg width={width} height={height} viewBox="0 0 400 650">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
          </marker>
        </defs>

        {/* START */}
        <rect x="140" y="10" width="120" height="50" rx="25" ry="25" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
        <text x="200" y="40" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Start</text>
        {/* Pfeil */}
        <line x1="200" y1="60" x2="200" y2="90" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead)" />

        {/* Ausgabe: Bitte Geld einwerfen */}
        <polygon points="120,95 300,95 280,135 100,135" fill="#a855f7" stroke="#6d28d9" strokeWidth="2" />
        <text x="200" y="120" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Geld einwerfen</text>
        {/* Pfeil */}
        <line x1="200" y1="135" x2="200" y2="165" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead)" />

        {/* Eingabe: Betrag */}
        <polygon points="120,170 300,170 280,210 100,210" fill="#a855f7" stroke="#6d28d9" strokeWidth="2" />
        <text x="200" y="195" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Betrag eingeben</text>
        {/* Pfeil */}
        <line x1="200" y1="210" x2="200" y2="240" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead)" />

        {/* Entscheidung: Betrag >= Preis? */}
        <polygon points="200,245 310,290 200,335 90,290" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
        <text x="200" y="286" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Betrag</text>
        <text x="200" y="300" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">≥ Preis?</text>

        {/* JA-Pfeil nach rechts */}
        <line x1="310" y1="290" x2="350" y2="290" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <text x="330" y="283" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">Ja</text>

        {/* Operation: Kaffee zubereiten (rechts) */}
        <rect x="350" y="265" width="40" height="50" rx="3" ry="3" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2" />
        <text x="370" y="294" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Kaffee</text>
        {/* Pfeil nach unten zu Ausgabe */}
        <line x1="370" y1="315" x2="370" y2="370" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead)" />
        {/* Ausgabe: Ihr Kaffee */}
        <polygon points="300,375 440,375 420,415 280,415" fill="#a855f7" stroke="#6d28d9" strokeWidth="2" />
        <text x="360" y="400" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Ihr Kaffee</text>
        {/* Pfeil zu Ende */}
        <line x1="360" y1="415" x2="360" y2="450" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead)" />
        {/* ENDE */}
        <rect x="300" y="455" width="120" height="45" rx="22" ry="22" fill="#ef4444" stroke="#dc2626" strokeWidth="2" />
        <text x="360" y="482" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Ende</text>

        {/* NEIN-Pfeil nach unten */}
        <line x1="200" y1="335" x2="200" y2="380" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <text x="215" y="360" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">Nein</text>

        {/* Ausgabe: Zu wenig Geld */}
        <polygon points="120,385 300,385 280,425 100,425" fill="#a855f7" stroke="#6d28d9" strokeWidth="2" />
        <text x="200" y="410" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Zu wenig Guthaben!</text>
        {/* Pfeil zurück */}
        <line x1="200" y1="425" x2="200" y2="460" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead)" />
        {/* Pfeil zurück nach oben (Geld einwerfen) */}
        <line x1="200" y1="460" x2="60" y2="460" stroke="#94a3b8" strokeWidth="2" />
        <line x1="60" y1="460" x2="60" y2="115" stroke="#94a3b8" strokeWidth="2" />
        <line x1="60" y1="115" x2="100" y2="115" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead)" />

        {/* Legende */}
        <rect x="10" y="530" width="15" height="15" rx="8" ry="8" fill="#22c55e" />
        <text x="32" y="543" fill="#94a3b8" fontSize="10">Start/Ende</text>
        <rect x="120" y="530" width="15" height="15" rx="2" ry="2" fill="#3b82f6" />
        <text x="142" y="543" fill="#94a3b8" fontSize="10">Operation</text>
        <polygon points="250,530 265,538 250,546 235,538" fill="#f59e0b" />
        <text x="272" y="543" fill="#94a3b8" fontSize="10">Entscheidung</text>
        <polygon points="10,560 25,552 40,560 25,568" fill="#a855f7" />
        <text x="48" y="564" fill="#94a3b8" fontSize="10">Ein-/Ausgabe</text>
      </svg>
    </div>
  );
}
