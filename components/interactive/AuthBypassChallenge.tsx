"use client";

import { useState } from "react";
import { Shield, Lock, Key, AlertTriangle, CheckCircle2, XCircle, ChevronRight, RotateCcw, Lightbulb, HelpCircle, Award, Cookie, Eye } from "lucide-react";

interface Level {
  id: number;
  title: string;
  description: string;
  difficulty: number;
  hint: string;
  context: string;
  checkAnswer: (input: string) => { success: boolean; message: string };
  explanation: string;
  protection: string;
  serverResponse?: (input: string) => string;
}

function base64Encode(str: string): string {
  try { return btoa(str); } catch { return str; }
}
function base64Decode(str: string): string {
  try { return atob(str); } catch { return str; }
}

const levels: Level[] = [
  {
    id: 1,
    title: "Default Credentials",
    description: "Dieser Webserver nutzt Standard-Zugangsdaten. Viele Admin-Interfaces haben Default-Passwörter die nie geändert werden!",
    difficulty: 1,
    hint: "Probiere die häufigsten Kombinationen: admin/admin, root/root, admin/password...",
    context: "Ein Router-Admin-Panel ist erreichbar unter 192.168.1.1. Der Installateur hat das Passwort nie geändert.",
    checkAnswer: (input) => {
      const combos = ["admin/admin", "admin/password", "root/root", "admin/1234", "admin/admin123", "root/toor", "admin/"];
      const normalized = input.toLowerCase().trim().replace(/\s+/g, "/");
      const found = combos.some(c => normalized === c || normalized.includes(c.split("/")[0]) && normalized.includes(c.split("/")[1]));
      return found
        ? { success: true, message: "✅ Zugriff erhalten! Standard-Zugangsdaten funktionieren — der Router ist kompromittiert." }
        : { success: false, message: "❌ Login fehlgeschlagen. Probiere typische Standard-Kombinationen." };
    },
    explanation: "Viele Geräte (Router, IoT, Server) kommen mit Default-Credentials. Wenn diese nicht geändert werden, kann jeder damit einloggen. In Deutschland: §202a StGB — Ausspähen von Daten!",
    protection: "SOFORT nach Installation Passwort ändern! Hersteller-Website nach Default-Credentials prüfen. Passwort-Manager verwenden.",
  },
  {
    id: 2,
    title: "PIN Brute-Force",
    description: "Ein 4-stelliger PIN schützt ein Admin-Panel. Es gibt kein Rate-Limiting — du kannst unbegrenzt versuchen!",
    difficulty: 2,
    hint: "Eine 4-stellige PIN hat nur 10.000 Möglichkeiten (0000-9999). Ein Computer braucht < 1 Sekunde zum Durchprobieren!",
    context: "SIM-Karte gesperrt? Nein — ein Admin-Panel mit 4-stelligem PIN. Kein Lockout nach Fehlversuchen.",
    checkAnswer: (input) => {
      if (input === "7392") return { success: true, message: "✅ PIN geknackt! 7392 — gefunden durch Brute-Force." };
      if (/^\d{4}$/.test(input)) return { success: false, message: `❌ PIN ${input} ist falsch. Versuche einen anderen — es gibt keine Sperre!` };
      return { success: false, message: "⚠️ Gib eine 4-stellige PIN ein (0000-9999)." };
    },
    explanation: "4-stellige PINs = 10.000 Kombinationen. Ohne Rate-Limiting (z.B. Sperre nach 3 Versuchen) kann ein Angreifer alle in < 1 Sekunde durchprobieren.",
    protection: "Rate-Limiting aktivieren (max. 5 Versuche, dann Sperre). Längere PINs/Passwörter. CAPTCHA nach Fehlversuchen. Account-Lockout.",
  },
  {
    id: 3,
    title: "JWT Token Manipulation",
    description: "Die App gibt dir einen JWT Token. Dekodiere ihn und ändere die Rolle von 'user' zu 'admin'!",
    difficulty: 3,
    hint: "JWT besteht aus 3 Teilen: Header.Payload.Signature — alle sind Base64-codiert. Ändere den Payload und codiere ihn neu!",
    context: "Du hast einen Login-Token erhalten. Du bist als 'user' eingeloggt — aber es gibt eine /admin-Seite.",
    checkAnswer: (input) => {
      const clean = input.trim();
      if (!clean.includes(".")) return { success: false, message: "⚠️ Ein JWT hat das Format: xxxxx.yyyyy.zzzzz" };
      try {
        const parts = clean.split(".");
        const payload = JSON.parse(base64Decode(parts[1]));
        if (payload.role === "admin") return { success: true, message: "✅ Admin-Zugriff! Du hast die Rolle im JWT geändert — die App akzeptiert den manipulierten Token!" };
        return { success: false, message: `❌ Rolle ist '${payload.role}'. Ändere sie zu 'admin' im Payload.` };
      } catch { return { success: false, message: "❌ JWT konnte nicht dekodiert werden. Prüfe das Format." }; }
    },
    explanation: "JWTs werden nur SIGNIERT, nicht VERSCHLÜSSELT! Jeder kann den Payload Base64-decodieren, ändern und neu codieren. OHNE gültige Signatur sollte der Server den Token ablehnen — viele prüfen aber nicht!",
    protection: "JWT-Signatur IMMER serverseitig prüfen! RS256 statt HS256. Kurze Ablaufzeiten. Refresh Tokens. Niemals sensible Daten im Payload.",
    serverResponse: (input) => {
      const defaultToken = base64Encode(JSON.stringify({ alg: "HS256", typ: "JWT" })) + "." + base64Encode(JSON.stringify({ user: "max", role: "user", iat: Date.now() })) + ".fakesignature";
      return `HTTP/1.1 200 OK\nSet-Cookie: token=${defaultToken}\nContent-Type: application/json\n\n{"message": "Login erfolgreich", "user": "max", "role": "user"}`;
    },
  },
  {
    id: 4,
    title: "Session Fixation",
    description: "Der Server setzt eine Session-ID BEVOR der Nutzer sich einloggt. Wenn du die Session-ID kennst, kannst du die Session stehlen!",
    difficulty: 4,
    hint: "Wenn die Session-ID in der URL steht (z.B. ?session=abc123), kann ein Angreifer dem Opfer einen Link mit einer bekannten Session-ID schicken.",
    context: "Eine Webapp nutzt URL-basierte Sessions: https://shop.de/login?session=abc123. Nach dem Login bleibt dieselbe Session-ID aktiv.",
    checkAnswer: (input) => {
      if (input.toLowerCase().includes("session") && (input.toLowerCase().includes("fix") || input.toLowerCase().includes("stehlen") || input.toLowerCase().includes("kennen"))) {
        return { success: true, message: "✅ Session Fixation erkannt! Der Angreifer kennt die Session-ID vor dem Login des Opfers." };
      }
      if (input.toLowerCase().includes("abc123") || input.toLowerCase().includes("session=")) {
        return { success: true, message: "✅ Richtig! Die Session-ID abc123 war VOR dem Login bekannt — nach dem Login hat der Angreifer Zugriff." };
      }
      return { success: false, message: "❌ Überlege: Was passiert, wenn die Session-ID schon BEVOR du dich einloggst bekannt ist?" };
    },
    explanation: "Session Fixation: Der Angreifer zwingt dem Opfer eine bekannte Session-ID auf (z.B. per Link). Nach dem Login des Opfers ist dieselbe Session-ID gültig → der Angreifer hat Zugriff.",
    protection: "Session-ID NACH Login neu generieren! Cookies statt URL-Parameter. HttpOnly + Secure + SameSite Flags.",
  },
  {
    id: 5,
    title: "Password Reset Flaw",
    description: "Die 'Passwort vergessen'-Funktion nutzt eine Sicherheitsfrage. Die Antwort kann erraten oder recherchiert werden!",
    difficulty: 5,
    hint: "Social Engineering: Der Angreifer recherchiert das Opfer in sozialen Medien. 'Mädchenname der Mutter' steht oft auf Facebook!",
    context: "admin@firma.de hat die Sicherheitsfrage: 'Mädchenname Ihrer Mutter?' Der Angreifer findet auf Facebook: 'Schmidt ist meine liebe Mama!'",
    checkAnswer: (input) => {
      if (input.toLowerCase().includes("schmidt")) return { success: true, message: "✅ Passwort zurückgesetzt! Mädchenname 'Schmidt' war auf Facebook zu finden — Social Engineering!" };
      if (input.toLowerCase().includes("social") || input.toLowerCase().includes("facebook") || input.toLowerCase().includes("recherche")) {
        return { success: true, message: "✅ Richtig erkannt! Die Antwort ist über Social Engineering (Facebook) zu finden: 'Schmidt'." };
      }
      return { success: false, message: "❌ Überlege: Wo findet man den Mädchennamen der Mutter eines Fremden? (Hinweis: Soziale Medien)" };
    },
    explanation: "Sicherheitsfragen sind UNSICHER — die Antworten sind oft öffentlich recherchierbar (Facebook, Instagram, LinkedIn). 'Mädchenname der Mutter' ist ein Klassiker für Social Engineering.",
    protection: "Keine Sicherheitsfragen! Stattdessen: E-Mail-Link + MFA. Passwort-Reset nur über verifizierten Kanal. One-Time-Codes.",
  },
];

export function AuthBypassChallenge() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showProtection, setShowProtection] = useState(false);
  const [completedLevels, setCompletedLevels] = useState<Set<number>>(new Set());
  const [points, setPoints] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);

  const level = levels[currentLevel];

  const handleTest = () => {
    const res = level.checkAnswer(input);
    setResult(res);
    if (res.success && !completedLevels.has(level.id)) {
      setCompletedLevels((prev) => new Set([...prev, level.id]));
      setPoints((p) => p + level.difficulty * 100);
    }
  };

  const handleShowHint = () => {
    setShowHint(true);
    if (!showHint) setHintsUsed((h) => h + 1);
  };

  const handleReset = () => {
    setInput("");
    setResult(null);
    setShowHint(false);
    setShowProtection(false);
  };

  const diffStars = (d: number) => "⭐".repeat(d);

  return (
    <div className="bg-slate-800 rounded-xl p-4 sm:p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2"><Lock className="w-5 h-5 text-purple-400" /> Authentication Bypass Challenge</h3>
          <p className="text-slate-400 text-sm">Finde Schwachstellen in Authentifizierungs-Mechanismen</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-yellow-400">{points} Pkt</div>
          <div className="text-slate-500 text-xs">{completedLevels.size}/{levels.length} gelöst</div>
        </div>
      </div>

      {/* Level Selector */}
      <div className="flex flex-wrap gap-2 mb-4">
        {levels.map((l) => (
          <button
            key={l.id}
            onClick={() => { setCurrentLevel(l.id - 1); handleReset(); }}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              currentLevel === l.id - 1 ? "bg-purple-600 text-white shadow-md" : completedLevels.has(l.id) ? "bg-green-900/30 text-green-400 border border-green-700" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
          >
            {completedLevels.has(l.id) ? <CheckCircle2 className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            L{l.id} {diffStars(l.difficulty)}
          </button>
        ))}
      </div>

      {/* Level Info */}
      <div className="bg-slate-900 rounded-lg p-4 mb-4">
        <h4 className="text-white font-bold mb-1 flex items-center gap-2">
          <Key className="w-4 h-4 text-yellow-400" />
          Level {level.id}: {level.title} {diffStars(level.difficulty)}
        </h4>
        <p className="text-slate-300 text-sm mb-3">{level.description}</p>
        <div className="bg-slate-800 rounded-lg p-3 border border-slate-700 mb-3">
          <p className="text-slate-400 text-xs mb-1">📋 Szenario:</p>
          <p className="text-slate-200 text-sm">{level.context}</p>
        </div>

        {/* Server Response */}
        {level.serverResponse && (
          <div className="bg-slate-800 rounded-lg p-3 border border-slate-700 mb-3">
            <p className="text-slate-400 text-xs mb-1">🖥️ Server-Antwort:</p>
            <pre className="text-green-400 font-mono text-xs whitespace-pre-wrap">{level.serverResponse(input)}</pre>
          </div>
        )}

        {/* Input */}
        <div className="mb-3">
          <label className="text-slate-400 text-xs mb-1 block">
            {level.id === 3 ? "JWT Token eingeben (dein manipulierter Token):" : level.id === 4 ? "Erkläre den Angriff oder gib die Session-ID an:" : "Deine Eingabe:"}
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleTest()}
              placeholder={level.id === 1 ? "admin/admin" : level.id === 2 ? "0000" : level.id === 3 ? "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4ifQ.xxx" : "..."}
              className="flex-1 bg-slate-800 text-purple-400 font-mono rounded-lg px-3 py-2 text-sm border border-slate-600 focus:border-purple-400 focus:outline-none"
            />
            <button onClick={handleTest} className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-medium">🧪 Testen</button>
            <button onClick={handleReset} className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm"><RotateCcw className="w-4 h-4" /></button>
          </div>
        </div>

        {/* JWT Dekodier-Hilfe */}
        {level.id === 3 && (
          <div className="bg-slate-800 rounded-lg p-3 border border-slate-700 mb-3">
            <p className="text-slate-400 text-xs mb-2 flex items-center gap-1"><Eye className="w-3 h-3" /> JWT Dekodierer:</p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="JWT einfügen zum Dekodieren..."
                className="flex-1 bg-slate-900 text-yellow-400 font-mono rounded px-2 py-1 text-xs border border-slate-600"
                onChange={(e) => {
                  try {
                    const parts = e.target.value.split(".");
                    if (parts.length >= 2) {
                      const header = base64Decode(parts[0]);
                      const payload = base64Decode(parts[1]);
                      const el = document.getElementById("jwt-decoded");
                      if (el) el.textContent = `Header: ${header}\nPayload: ${payload}`;
                    }
                  } catch {}
                }}
              />
            </div>
            <pre id="jwt-decoded" className="text-yellow-300 font-mono text-xs mt-2 whitespace-pre-wrap">Dekodierter Inhalt erscheint hier...</pre>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className={`rounded-lg p-3 border ${result.success ? "bg-green-900/30 border-green-700" : "bg-red-900/30 border-red-700"}`}>
            <p className={`text-sm ${result.success ? "text-green-300" : "text-red-300"}`}>{result.message}</p>
          </div>
        )}
      </div>

      {/* Hint & Protection */}
      <div className="flex gap-2 mb-3">
        <button onClick={handleShowHint} className="text-xs text-yellow-400 hover:text-yellow-300 flex items-center gap-1">
          <Lightbulb className="w-3 h-3" /> {showHint ? "Tipp verbergen" : "💡 Tipp anzeigen"}
        </button>
        <button onClick={() => setShowProtection(!showProtection)} className="text-xs text-green-400 hover:text-green-300 flex items-center gap-1">
          <Shield className="w-3 h-3" /> {showProtection ? "Schutz verbergen" : "🛡️ Schutzmaßnahmen"}
        </button>
      </div>

      {showHint && (
        <div className="bg-yellow-900/20 border border-yellow-800/30 rounded-lg p-3 mb-3">
          <p className="text-yellow-300 text-sm flex items-start gap-2"><Lightbulb className="w-4 h-4 flex-shrink-0 mt-0.5" /> {level.hint}</p>
        </div>
      )}

      {showProtection && (
        <div className="bg-green-900/20 border border-green-800/30 rounded-lg p-3 mb-3">
          <h5 className="text-green-400 font-semibold text-xs mb-1 flex items-center gap-1"><Shield className="w-3 h-3" /> Gegenmaßnahmen:</h5>
          <p className="text-green-200 text-sm">{level.protection}</p>
        </div>
      )}

      {/* Explanation */}
      {result?.success && (
        <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-3 mb-3">
          <h5 className="text-blue-400 font-semibold text-xs mb-1 flex items-center gap-1"><HelpCircle className="w-3 h-3" /> Erklärung:</h5>
          <p className="text-blue-200 text-sm">{level.explanation}</p>
        </div>
      )}

      {/* All completed */}
      {completedLevels.size === levels.length && (
        <div className="bg-emerald-900/30 border border-emerald-700 rounded-lg p-4 mt-4 text-center">
          <Award className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
          <p className="text-emerald-300 font-bold text-lg">🎉 Alle Auth-Challenges gelöst!</p>
          <p className="text-emerald-400 text-sm mt-1">Du kennst jetzt die häufigsten Authentifizierungs-Schwachstellen.</p>
          <p className="text-emerald-500 text-xs mt-2">Punkte: {points} | Hints verwendet: {hintsUsed}</p>
        </div>
      )}

      {/* Merksatz */}
      <div className="mt-4 bg-purple-900/20 border border-purple-800/30 rounded-lg p-3">
        <p className="text-purple-300 text-sm">
          💡 <strong>Merke (OWASP #7):</strong> Broken Authentication ist eine der häufigsten Schwachstellen!
          Schutz: MFA, sichere Session-Management, Rate-Limiting, sichere Passwort-Reset-Verfahren.
        </p>
      </div>
    </div>
  );
}
