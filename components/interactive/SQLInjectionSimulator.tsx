"use client";

import { useState } from "react";

// ============================================================================
// SQL Injection Simulator — OWASP Juice Shop inspiriert
// ============================================================================

interface Level {
  id: number;
  title: string;
  description: string;
  hint: string;
  vulnerableQuery: string;
  successPayload: string;
  explanation: string;
  protection: string;
}

const levels: Level[] = [
  {
    id: 1,
    title: "Einfache SQL Injection",
    description: "Der Login prüft Benutzername und Passwort direkt in einer SQL-Abfrage — ohne Prepared Statements. Finde einen Payload, der dich einloggt, OHNE das richtige Passwort zu kennen!",
    hint: "Denke an: Was passiert, wenn die WHERE-Bedingung immer WAHR ist?",
    vulnerableQuery: `SELECT * FROM users 
WHERE username = '[INPUT]' 
  AND password = '[INPUT]'`,
    successPayload: "' OR 1=1 --",
    explanation: `' OR 1=1 -- wird zu:
SELECT * FROM users 
WHERE username = '' OR 1=1 --' AND password = '...'

Das -- kommentiert den Rest aus. OR 1=1 ist IMMER wahr → die DB gibt ALLE User zurück → Login erfolgreich!`,
    protection: "Prepared Statements mit Platzhaltern: SELECT * FROM users WHERE username = ? AND password = ?",
  },
  {
    id: 2,
    title: "UNION-basierte Injection",
    description: "Die Anwendung zeigt Produktsuche-Ergebnisse. Nutze UNION SELECT, um versteckte Daten (z.B. Passwort-Hashes) aus einer anderen Tabelle auszulesen!",
    hint: "UNION SELECT verbindet das Ergebnis einer zweiten SELECT-Abfrage mit der ersten.",
    vulnerableQuery: `SELECT name, price FROM products 
WHERE name LIKE '%[INPUT]%'`,
    successPayload: "' UNION SELECT username, password FROM users --",
    explanation: `' UNION SELECT username, password FROM users -- wird zu:
SELECT name, price FROM products 
WHERE name LIKE '%' UNION SELECT username, password FROM users --%'

Die DB zeigt jetzt die Produkttabelle UND die Usernamen+Passwörter!`,
    protection: "Input Validation: Nur erlaubte Zeichen akzeptieren. Prepared Statements. Least Privilege für DB-User.",
  },
  {
    id: 3,
    title: "Blind SQL Injection (Zeit-basiert)",
    description: "Die Anwendung zeigt KEINE Fehlermeldungen und KEINE Daten direkt an. Aber: Du kannst durch geschickte SQL-Befehle die Antwortzeit beeinflussen. Wenn die Abfrage länger dauert → Bedingung ist WAHR!",
    hint: "Nutze: ' OR IF(1=1, SLEEP(3), 0) -- Wenn die Antwort 3 Sekunden dauert, funktioniert die Injection!",
    vulnerableQuery: `SELECT * FROM products 
WHERE id = [INPUT]`,
    successPayload: "' OR IF(1=1, SLEEP(3), 0) --",
    explanation: `' OR IF(1=1, SLEEP(3), 0) -- wird zu:
SELECT * FROM products 
WHERE id = '' OR IF(1=1, SLEEP(3), 0) --

IF(1=1) ist wahr → SLEEP(3) → Server wartet 3 Sekunden → Wir wissen: Es gibt eine Injection!
So kann man bitweise Daten auslesen (z.B. Passwort-Hash Zeichen für Zeichen).`,
    protection: "Prepared Statements! Keine Fehlermeldungen in Produktion. Web Application Firewall (WAF). Rate Limiting.",
  },
];

function simulateQuery(input: string, level: Level): { success: boolean; query: string; response: string } {
  const normalized = input.toLowerCase().trim();
  const successPayloads: Record<number, string[]> = {
    1: ["' or 1=1 --", "\" or 1=1 --", "' or '1'='1' --", "' or 1=1#", "admin' --"],
    2: ["' union select username, password from users --", "' union select username,password from users--", "' union all select username, password from users --"],
    3: ["' or if(1=1, sleep(3), 0) --", "' or sleep(3) --", "' or pg_sleep(3) --", "' or if(1=1, pg_sleep(3), 0) --"],
  };

  const success = successPayloads[level.id]?.some((p) =>
    normalized.includes(p.replace(/\s+/g, " ").trim())
  ) ?? false;

  const generatedQuery = level.vulnerableQuery.replace(/\[INPUT\]/g, input || "[leer]");

  if (!input) {
    return {
      success: false,
      query: generatedQuery,
      response: "⚠️ Bitte gib einen Wert ein.",
    };
  }

  if (success) {
    if (level.id === 1) {
      return {
        success: true,
        query: generatedQuery,
        response: "✅ LOGIN ERFOLGREICH! Die Datenbank gibt alle User zurück — du bist eingeloggt als erster User (Admin).",
      };
    }
    if (level.id === 2) {
      return {
        success: true,
        query: generatedQuery,
        response: "✅ DATEN GEFUNDEN! Die Suchergebnisse zeigen jetzt: admin:e10adc3949ba59abbe56e057f20f883e, user1:5f4dcc3b5aa765d...",
      };
    }
    if (level.id === 3) {
      return {
        success: true,
        query: generatedQuery,
        response: "✅ ANTWORT DAUERTE 3 SEKUNDEN! Blind SQL Injection erfolgreich — die Bedingung ist wahr!",
      };
    }
  }

  return {
    success: false,
    query: generatedQuery,
    response: level.id === 3
      ? "⏱️ Antwort kam sofort — keine Verzögerung erkannt. Versuche es mit SLEEP()."
      : "❌ Login fehlgeschlagen. Die WHERE-Bedingung ist falsch — versuche einen anderen Payload.",
  };
}

export function SQLInjectionSimulator() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{ success: boolean; query: string; response: string } | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showProtection, setShowProtection] = useState(false);
  const [completedLevels, setCompletedLevels] = useState<Set<number>>(new Set());

  const level = levels[currentLevel];

  const handleTest = () => {
    const res = simulateQuery(input, level);
    setResult(res);
    if (res.success) {
      setCompletedLevels((prev) => new Set([...prev, level.id]));
    }
  };

  const handleReset = () => {
    setInput("");
    setResult(null);
    setShowHint(false);
    setShowProtection(false);
  };

  return (
    <div className="bg-slate-800 rounded-xl p-4 sm:p-6 border border-slate-700">
      <h3 className="text-xl font-bold text-white mb-1">💉 SQL Injection Simulator</h3>
      <p className="text-slate-300 text-sm mb-4">
        Inspiriert vom OWASP Juice Shop — finde Schwachstellen in simulierten SQL-Abfragen!
      </p>

      {/* Level Selector */}
      <div className="flex gap-2 mb-4">
        {levels.map((l) => (
          <button
            key={l.id}
            onClick={() => { setCurrentLevel(l.id - 1); handleReset(); }}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              currentLevel === l.id - 1
                ? "bg-red-600 text-white shadow-md"
                : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
          >
            {completedLevels.has(l.id) && <span className="text-green-400">✅</span>}
            Level {l.id}
          </button>
        ))}
      </div>

      {/* Level Info */}
      <div className="bg-slate-900 rounded-lg p-4 mb-4">
        <h4 className="text-white font-bold mb-1">🎯 Level {level.id}: {level.title}</h4>
        <p className="text-slate-300 text-sm mb-3">{level.description}</p>

        {/* Vulnerable Query */}
        <div className="bg-slate-800 rounded-lg p-3 border border-slate-700 mb-3">
          <p className="text-slate-400 text-xs mb-1">Verwundbare SQL-Abfrage:</p>
          <pre className="text-yellow-400 font-mono text-xs whitespace-pre-wrap">{level.vulnerableQuery}</pre>
        </div>

        {/* Input */}
        <div className="mb-3">
          <label className="text-slate-400 text-xs mb-1 block">Dein Input (als Benutzername):</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleTest()}
              placeholder="' OR 1=1 --"
              className="flex-1 bg-slate-800 text-green-400 font-mono rounded-lg px-3 py-2 text-sm border border-slate-600 focus:border-red-400 focus:outline-none"
            />
            <button
              onClick={handleTest}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm font-medium"
            >
              🧪 Testen
            </button>
            <button
              onClick={handleReset}
              className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Result */}
        {result && (
          <div className={`rounded-lg p-3 border ${
            result.success
              ? "bg-green-900/30 border-green-700"
              : "bg-red-900/30 border-red-700"
          }`}>
            <p className={`text-sm font-mono mb-2 ${result.success ? "text-green-300" : "text-red-300"}`}>
              {result.response}
            </p>
            <details className="mt-2">
              <summary className="text-slate-400 text-xs cursor-pointer hover:text-slate-300">
                Generierte SQL-Abfrage anzeigen
              </summary>
              <pre className="text-xs font-mono text-yellow-400 mt-1 bg-slate-900 rounded p-2 whitespace-pre-wrap">
                {result.query}
              </pre>
            </details>
          </div>
        )}
      </div>

      {/* Hint */}
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => setShowHint(!showHint)}
          className="text-xs text-yellow-400 hover:text-yellow-300"
        >
          {showHint ? "💡 Tipp verbergen" : "💡 Tipp anzeigen"}
        </button>
        <button
          onClick={() => setShowProtection(!showProtection)}
          className="text-xs text-green-400 hover:text-green-300"
        >
          {showProtection ? "🛡️ Schutz verbergen" : "🛡️ Schutzmaßnahmen anzeigen"}
        </button>
      </div>

      {showHint && (
        <div className="bg-yellow-900/20 border border-yellow-800/30 rounded-lg p-3 mb-3">
          <p className="text-yellow-300 text-sm">💡 {level.hint}</p>
        </div>
      )}

      {showProtection && (
        <div className="bg-green-900/20 border border-green-800/30 rounded-lg p-3 mb-3">
          <h5 className="text-green-400 font-semibold text-xs mb-1">🛡️ So schützt du dich:</h5>
          <p className="text-green-200 text-sm">{level.protection}</p>
        </div>
      )}

      {/* Explanation after success */}
      {result?.success && (
        <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-3 mb-3">
          <h5 className="text-blue-400 font-semibold text-xs mb-1">📖 Erklärung:</h5>
          <pre className="text-blue-200 text-xs font-mono whitespace-pre-wrap">{level.explanation}</pre>
        </div>
      )}

      {/* All levels completed */}
      {completedLevels.size === levels.length && (
        <div className="bg-emerald-900/30 border border-emerald-700 rounded-lg p-4 mt-4 text-center">
          <p className="text-emerald-300 font-bold text-lg">🎉 Alle Level geschafft!</p>
          <p className="text-emerald-400 text-sm mt-1">
            Du kennst jetzt die 3 wichtigsten SQL-Injection-Typen. Merke: <strong>Prepared Statements</strong> schützen vor allen!
          </p>
        </div>
      )}

      {/* Merksatz */}
      <div className="mt-4 bg-red-900/20 border border-red-800/30 rounded-lg p-3">
        <p className="text-red-300 text-sm">
          💡 <strong>Merke (OWASP #1):</strong> SQL Injection ist der häufigste Web-Angriff! 
          Schutz: <strong>Prepared Statements</strong> (Platzhalter statt String-Konkatenation), 
          Input Validation und das Least-Privilege-Prinzip für Datenbank-User.
        </p>
      </div>
    </div>
  );
}
