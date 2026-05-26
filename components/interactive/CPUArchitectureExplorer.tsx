"use client";

import { useState } from "react";

// ============================================================================
// CPU Architecture Explorer — Fetch-Decode-Execute Zyklus Interaktiv
// ============================================================================

interface RegisterState {
  name: string;
  value: string;
  description: string;
}

interface Step {
  label: string;
  description: string;
  highlight: string[];
  registers: RegisterState[];
  busActivity: string;
}

const sampleInstructions = [
  {
    name: "LOAD AX, [0x10]",
    description: "Lade den Wert aus Speicheradresse 0x10 in Register AX",
    steps: [
      {
        label: "Fetch: PC → MAR",
        description: "Der Program Counter (PC) enthält die Adresse des nächsten Befehls. Diese wird ins Memory Address Register (MAR) kopiert.",
        highlight: ["pc", "mar"],
        registers: [
          { name: "PC", value: "0x00", description: "Befehlsadresse" },
          { name: "MAR", value: "0x00", description: "Wird gesetzt" },
          { name: "IR", value: "---", description: "" },
          { name: "AX", value: "0x00", description: "" },
        ],
        busActivity: "Adressbus: CPU → Speicher (Adresse 0x00)",
      },
      {
        label: "Fetch: Speicher → MDR → IR",
        description: "Der Speicher liefert den Befehl an dieser Adresse über den Datenbus. Der Befehl landet erst im Memory Data Register (MDR), dann im Instruction Register (IR).",
        highlight: ["mdr", "ir", "memory"],
        registers: [
          { name: "PC", value: "0x01", description: "Inkrementiert" },
          { name: "MAR", value: "0x00", description: "" },
          { name: "IR", value: "LOAD AX,[0x10]", description: "Befehl geladen" },
          { name: "AX", value: "0x00", description: "" },
        ],
        busActivity: "Datenbus: Speicher → CPU (Befehl: LOAD AX,[0x10])",
      },
      {
        label: "Decode: Befehl entschlüsseln",
        description: "Das Steuerwerk analysiert den Befehl im IR: Opcode = LOAD (Laden), Zielregister = AX, Quelladresse = 0x10.",
        highlight: ["cu", "ir"],
        registers: [
          { name: "PC", value: "0x01", description: "" },
          { name: "IR", value: "LOAD AX,[0x10]", description: "Wird decodiert" },
          { name: "AX", value: "0x00", description: "" },
        ],
        busActivity: "Steuerbus: Intern — Befehl wird analysiert",
      },
      {
        label: "Execute: Daten laden",
        description: "Die ALU berechnet die Speicheradresse 0x10. Der Wert an dieser Adresse wird über den Datenbus geholt und in AX gespeichert.",
        highlight: ["alu", "ax", "memory"],
        registers: [
          { name: "PC", value: "0x01", description: "" },
          { name: "IR", value: "LOAD AX,[0x10]", description: "" },
          { name: "AX", value: "0x42", description: "Wert geladen!" },
        ],
        busActivity: "Datenbus: Speicher → CPU (Wert 0x42 aus Adresse 0x10)",
      },
    ] as Step[],
  },
  {
    name: "ADD AX, BX",
    description: "Addiere den Wert von BX zum Wert in AX",
    steps: [
      {
        label: "Fetch: PC → MAR",
        description: "PC wird ins MAR kopiert — der nächste Befehl wird geholt.",
        highlight: ["pc", "mar"],
        registers: [
          { name: "PC", value: "0x02", description: "Befehlsadresse" },
          { name: "MAR", value: "0x02", description: "Wird gesetzt" },
          { name: "IR", value: "---", description: "" },
          { name: "AX", value: "0x42", description: "Vorheriger Wert" },
          { name: "BX", value: "0x15", description: "" },
        ],
        busActivity: "Adressbus: CPU → Speicher (Adresse 0x02)",
      },
      {
        label: "Fetch: Speicher → IR",
        description: "Der Befehl ADD AX, BX wird aus dem Speicher geholt und ins IR geladen.",
        highlight: ["mdr", "ir", "memory"],
        registers: [
          { name: "PC", value: "0x03", description: "Inkrementiert" },
          { name: "IR", value: "ADD AX,BX", description: "Befehl geladen" },
          { name: "AX", value: "0x42", description: "" },
          { name: "BX", value: "0x15", description: "" },
        ],
        busActivity: "Datenbus: Speicher → CPU (Befehl: ADD AX,BX)",
      },
      {
        label: "Decode: Befehl entschlüsseln",
        description: "Opcode = ADD, Operand 1 = AX (Ziel), Operand 2 = BX (Quelle). Das Steuerwerk weist die ALU an, AX + BX zu berechnen.",
        highlight: ["cu", "ir"],
        registers: [
          { name: "PC", value: "0x03", description: "" },
          { name: "IR", value: "ADD AX,BX", description: "Wird decodiert" },
          { name: "AX", value: "0x42", description: "" },
          { name: "BX", value: "0x15", description: "" },
        ],
        busActivity: "Steuerbus: Intern — ALU wird angewiesen zu addieren",
      },
      {
        label: "Execute: Addition durchführen",
        description: "Die ALU addiert AX (0x42) + BX (0x15) = 0x57. Das Ergebnis wird in AX gespeichert.",
        highlight: ["alu", "ax"],
        registers: [
          { name: "PC", value: "0x03", description: "" },
          { name: "IR", value: "ADD AX,BX", description: "" },
          { name: "AX", value: "0x57", description: "Ergebnis: 0x42 + 0x15" },
          { name: "BX", value: "0x15", description: "Unverändert" },
        ],
        busActivity: "Intern: ALU → AX (Ergebnis 0x57)",
      },
    ] as Step[],
  },
  {
    name: "CMP AX, BX",
    description: "Vergleiche AX mit BX (setze Flags)",
    steps: [
      {
        label: "Fetch: Befehl holen",
        description: "Der CMP-Befehl wird aus dem Speicher geholt.",
        highlight: ["pc", "mar", "ir"],
        registers: [
          { name: "PC", value: "0x04", description: "" },
          { name: "IR", value: "CMP AX,BX", description: "Geladen" },
          { name: "AX", value: "0x57", description: "" },
          { name: "BX", value: "0x15", description: "" },
        ],
        busActivity: "Fetch-Phase: Befehl aus Speicher",
      },
      {
        label: "Decode: Vergleich vorbereiten",
        description: "Opcode = CMP — die ALU soll AX - BX rechnen, aber NICHT speichern. Nur Flags werden gesetzt.",
        highlight: ["cu", "ir"],
        registers: [
          { name: "IR", value: "CMP AX,BX", description: "Decodiert" },
          { name: "AX", value: "0x57", description: "" },
          { name: "BX", value: "0x15", description: "" },
        ],
        busActivity: "Steuerbus: CMP = Subtraktion ohne Speicherung",
      },
      {
        label: "Execute: Vergleich ausführen",
        description: "Die ALU berechnet 0x57 - 0x15 = 0x42 (positiv). Ergebnis wird NICHT gespeichert, aber Flags gesetzt: Zero=0, Carry=0, Sign=0. AX bleibt unverändert!",
        highlight: ["alu"],
        registers: [
          { name: "AX", value: "0x57", description: "Unverändert!" },
          { name: "BX", value: "0x15", description: "Unverändert" },
        ],
        busActivity: "Intern: Nur Flags werden aktualisiert",
      },
    ] as Step[],
  },
];

const cpuComponents = [
  { id: "pc", label: "PC", full: "Program Counter", x: 10, y: 15, w: 70, h: 30 },
  { id: "ir", label: "IR", full: "Instruction Register", x: 100, y: 15, w: 100, h: 30 },
  { id: "mar", label: "MAR", full: "Memory Address Register", x: 10, y: 55, w: 70, h: 30 },
  { id: "mdr", label: "MDR", full: "Memory Data Register", x: 100, y: 55, w: 100, h: 30 },
  { id: "cu", label: "Steuerwerk", full: "Control Unit", x: 220, y: 15, w: 100, h: 40 },
  { id: "alu", label: "ALU", full: "Arithmetic Logic Unit", x: 220, y: 65, w: 100, h: 40 },
  { id: "ax", label: "AX", full: "Akkumulator", x: 340, y: 15, w: 60, h: 30 },
  { id: "bx", label: "BX", full: "Basisregister", x: 340, y: 55, w: 60, h: 30 },
  { id: "memory", label: "RAM", full: "Hauptspeicher", x: 120, y: 120, w: 160, h: 35 },
];

export default function CPUArchitectureExplorer() {
  const [selectedInstruction, setSelectedInstruction] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const instruction = sampleInstructions[selectedInstruction];
  const step = instruction.steps[currentStep];

  const isHighlighted = (id: string) => step.highlight.includes(id);

  const nextStep = () => {
    if (currentStep < instruction.steps.length - 1) {
      setCurrentStep((s) => s + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  };

  const reset = () => setCurrentStep(0);

  return (
    <div className="space-y-4">
      {/* Instruction selector */}
      <div className="flex flex-wrap gap-2">
        {sampleInstructions.map((instr, i) => (
          <button
            key={i}
            onClick={() => {
              setSelectedInstruction(i);
              setCurrentStep(0);
            }}
            className={`px-3 py-1.5 rounded-lg text-sm font-mono transition-all ${
              i === selectedInstruction
                ? "bg-amber-500 text-white shadow-md"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {instr.name}
          </button>
        ))}
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400">{instruction.description}</p>

      {/* CPU Diagram */}
      <div className="relative bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700 overflow-x-auto">
        <svg viewBox="0 0 420 170" className="w-full max-w-lg mx-auto" style={{ minWidth: 380 }}>
          {/* CPU Box */}
          <rect x="5" y="5" width="410" height="110" rx="8" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeDasharray="6,3" />
          <text x="210" y="12" textAnchor="middle" className="text-[9px] fill-gray-400">CPU</text>

          {/* Components */}
          {cpuComponents.filter(c => c.id !== "memory").map((comp) => (
            <g key={comp.id}>
              <rect
                x={comp.x}
                y={comp.y}
                width={comp.w}
                height={comp.h}
                rx="4"
                fill={isHighlighted(comp.id) ? "#FCD34D" : "#E5E7EB"}
                stroke={isHighlighted(comp.id) ? "#F59E0B" : "#9CA3AF"}
                strokeWidth={isHighlighted(comp.id) ? 2 : 1}
                className="transition-all duration-300"
              />
              <text
                x={comp.x + comp.w / 2}
                y={comp.y + comp.h / 2 + 4}
                textAnchor="middle"
                className={`text-[10px] font-bold ${isHighlighted(comp.id) ? "fill-amber-900" : "fill-gray-600"}`}
              >
                {comp.label}
              </text>
            </g>
          ))}

          {/* Memory */}
          {cpuComponents.filter(c => c.id === "memory").map((comp) => (
            <g key={comp.id}>
              <rect
                x={comp.x}
                y={comp.y}
                width={comp.w}
                height={comp.h}
                rx="4"
                fill={isHighlighted(comp.id) ? "#BBF7D0" : "#E5E7EB"}
                stroke={isHighlighted(comp.id) ? "#22C55E" : "#9CA3AF"}
                strokeWidth={isHighlighted(comp.id) ? 2 : 1}
                className="transition-all duration-300"
              />
              <text
                x={comp.x + comp.w / 2}
                y={comp.y + comp.h / 2 + 4}
                textAnchor="middle"
                className={`text-[10px] font-bold ${isHighlighted(comp.id) ? "fill-green-900" : "fill-gray-600"}`}
              >
                {comp.full}
              </text>
            </g>
          ))}

          {/* Bus arrows */}
          <line x1="180" y1="98" x2="180" y2="120" stroke="#6B7280" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <text x="185" y="112" className="text-[7px] fill-gray-400">Bus</text>
        </svg>
      </div>

      {/* Step display */}
      <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 border border-amber-200 dark:border-amber-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-amber-600 dark:text-amber-400">
            Schritt {currentStep + 1} / {instruction.steps.length}
          </span>
          <span className="text-xs font-semibold text-amber-700 dark:text-amber-300">
            {step.label}
          </span>
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{step.description}</p>
        <div className="text-xs font-mono bg-white dark:bg-gray-800 rounded p-2 text-gray-600 dark:text-gray-400">
          {step.busActivity}
        </div>
      </div>

      {/* Register state */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {step.registers.map((reg) => (
          <div
            key={reg.name}
            className={`rounded-lg p-2 text-center border transition-all ${
              reg.description
                ? "bg-amber-100 dark:bg-amber-900/30 border-amber-300 dark:border-amber-700"
                : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            }`}
          >
            <div className="text-[10px] font-semibold text-gray-500 dark:text-gray-400">{reg.name}</div>
            <div className="font-mono text-sm font-bold text-gray-800 dark:text-gray-200">{reg.value}</div>
            {reg.description && (
              <div className="text-[10px] text-amber-600 dark:text-amber-400 mt-0.5">{reg.description}</div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-40 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm"
        >
          ← Zurück
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm"
        >
          Reset
        </button>
        <button
          onClick={nextStep}
          disabled={currentStep === instruction.steps.length - 1}
          className="px-4 py-2 rounded-lg bg-amber-500 text-white disabled:opacity-40 hover:bg-amber-600 transition-colors text-sm font-semibold"
        >
          Nächster Schritt →
        </button>
      </div>
    </div>
  );
}
