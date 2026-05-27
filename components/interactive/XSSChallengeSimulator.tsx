"use client";

import { useState, useCallback, useRef, useEffect } from "react";

// ============================================================================
// XSS Challenge Simulator — Simulierter Blog mit XSS-Schwachstellen
// ============================================================================

interface XSSLevel {
  id: number;
  title: string;
  type: string;
  difficulty: "leicht" | "mittel" | "schwer";
  description: string;
  hints: string[];
  vulnerableCode: string;
  successPayloads: string[];
  explanation: string;
  protection: string;
  points: number;
  inputLabel: string;
  inputPlaceholder: string;
  /** Context: where does user input appear? */
  context: "url" | "comment" | "search" | "profile" | "csp";
}

const xssLevels: XSSLevel[] = [
  {
    id: 1,
    title: "Reflected XSS",
    type: "Reflected",
    difficulty: "leicht",
    description:
      "Die Suchseite zeigt den Suchbegriff direkt in der Seite an — ohne Escaping. Schleuse JavaScript ein, das eine Alert-Box öffnet!",
    hints: [
      "Script-Tags funktionieren: <script>alert('XSS')</script>",
      "Auch ohne Script-Tag: <img src=x onerror=alert(1)>",
    ],
    vulnerableCode: `<div class="search-results">\n  <h2>Suchergebnisse für: <?= $search_query ?></h2>\n  <!-- Kein Escaping! Direkte Ausgabe des Parameters -->\n</div>`,
    successPayloads: [
      "<script>alert('xss')</script>",
      "<script>alert(1)</script>",
      '<img src=x onerror=alert(1)>',
      "<svg onload=alert(1)>",
      "<body onload=alert(1)>",
      "<iframe src='javascript:alert(1)'>",
    ],
    explanation:
      "Reflected XSS: Der eingegebene Text wird direkt in die HTML-Seite eingefügt. Der Browser interpretiert <script>-Tags als Code und führt ihn aus. Der Payload 'reflektiert' sich vom Server zurück an den Browser.",
    protection:
      "Output Encoding: Sonderzeichen wie < > \" werden zu &lt; &gt; &quot; umgewandelt. Content Security Policy (CSP) blockiert Inline-Scripts.",
    points: 100,
    inputLabel: "Suchbegriff",
    inputPlaceholder: "<script>alert('XSS')</script>",
    context: "url",
  },
  {
    id: 2,
    title: "Stored XSS",
    type: "Stored",
    difficulty: "mittel",
    description:
      "Der Blog speichert Kommentare in der Datenbank — ohne Bereinigung. Jeder Besucher sieht den bösartigen Code!",
    hints: [
      "Stored XSS bleibt dauerhaft — jeder Besucher ist betroffen.",
      "Versuche: <script>document.title='HACKED'</script>",
    ],
    vulnerableCode: `// Kommentar wird gespeichert und bei jedem Aufruf angezeigt\nINSERT INTO comments (body) VALUES ('$_POST[comment]');\n\n// Anzeige:\necho "<div class='comment'>$row[body]</div>";`,
    successPayloads: [
      "<script>alert('xss')</script>",
      "<script>alert(1)</script>",
      "<script>document.title='hacked'</script>",
      '<img src=x onerror=alert(document.cookie)>',
      "<svg onload=alert(1)>",
    ],
    explanation:
      "Stored XSS: Der Payload wird in der Datenbank gespeichert. Jeder Besucher der Seite empfängt den bösartigen Code. Besonders gefährlich, da kein Link-Klick nötig ist!",
    protection:
      "Input Validation + Output Encoding beim Rendern. DOMPurify für Rich-Text. HTTPOnly-Cookies schützen Session-Cookies vor JavaScript-Zugriff.",
    points: 200,
    inputLabel: "Kommentar",
    inputPlaceholder: "<script>alert('XSS')</script>",
    context: "comment",
  },
  {
    id: 3,
    title: "DOM-based XSS",
    type: "DOM-based",
    difficulty: "mittel",
    description:
      "Die Seite liest URL-Parameter mit JavaScript aus und fügt sie direkt ins DOM ein — ohne Bereinigung!",
    hints: [
      "Die Schwachstelle liegt im Client-JavaScript, nicht auf dem Server.",
      "Nutze: #<img src=x onerror=alert(1)> in der URL",
    ],
    vulnerableCode: `// JavaScript liest URL-Parameter und setzt ihn direkt ins DOM\nconst params = new URLSearchParams(window.location.search);\nconst name = params.get('name');\ndocument.getElementById('greeting').innerHTML = 'Hallo ' + name;\n// Kein Escaping! innerHTML interpretiert HTML-Tags!`,
    successPayloads: [
      "<img src=x onerror=alert(1)>",
      "<svg onload=alert(1)>",
      "<script>alert(1)</script>",
      "<img src=x onerror=alert('dom')>",
      "<body onload=alert(1)>",
    ],
    explanation:
      "DOM-based XSS: Der Payload wird NUR im Browser verarbeitet — der Server sieht ihn nie. JavaScript liest unsichere Daten (URL, localStorage) und fügt sie via innerHTML ins DOM ein.",
    protection:
      "textContent statt innerHTML verwenden. DOMPurify für sicheres HTML. URL-Parameter escapen.",
    points: 300,
    inputLabel: "URL-Parameter (name=...)",
    inputPlaceholder: "<img src=x onerror=alert(1)>",
    context: "search",
  },
  {
    id: 4,
    title: "Event-Handler XSS",
    type: "Event-Handler",
    difficulty: "schwer",
    description:
      "Die Seite filtert <script>-Tags, aber erlaubt andere HTML-Elemente. Nutze Event-Handler wie onerror oder onload!",
    hints: [
      "<script> ist blockiert, aber <img>, <svg>, <body> sind erlaubt.",
      "Versuche: <img src=x onerror=alert(1)>",
    ],
    vulnerableCode: `// Server filtert <script> Tags\nif (input.includes('<script>')) {\n  input = input.replace(/<script>/gi, '');  // Blocklist!\n}\n// Aber: <img onerror>, <svg onload> kommen durch!`,
    successPayloads: [
      '<img src=x onerror=alert(1)>',
      "<svg onload=alert(1)>",
      '<input onfocus=alert(1) autofocus>',
      '<details open ontoggle=alert(1)>',
      '<marquee onstart=alert(1)>',
      '<video src=x onerror=alert(1)>',
    ],
    explanation:
      "Event-Handler XSS: Eine Blocklist ist unsicher — es gibt hunderte HTML-Elemente mit Event-Handlern. onerror wird ausgelöst, wenn das Bild (src=x) nicht geladen werden kann.",
    protection:
      "Allowlist statt Blocklist! Nur erlaubte Tags/Attribute. Output Encoding. CSP mit 'unsafe-inline' vermeiden.",
    points: 400,
    inputLabel: "Profil-Beschreibung",
    inputPlaceholder: '<img src=x onerror=alert(1)>',
    context: "profile",
  },
  {
    id: 5,
    title: "CSP Bypass",
    type: "CSP Bypass",
    difficulty: "schwer",
    description:
      "Die Seite hat eine Content Security Policy — aber sie ist falsch konfiguriert. Finde einen Weg, JavaScript auszuführen!",
    hints: [
      "Die CSP erlaubt 'unsafe-inline' — das ist die Schwachstelle!",
      "Selbst mit CSP können Inline-Event-Handler funktionieren.",
    ],
    vulnerableCode: `// CSP Header (falsch konfiguriert):\nContent-Security-Policy: default-src 'self'; script-src 'unsafe-inline'\n\n// 'unsafe-inline' erlaubt ALLE Inline-Scripts!\n// Besser: script-src 'self' (kein Inline-Code erlaubt)`,
    successPayloads: [
      "<script>alert(1)</script>",
      "<script>alert('csp')</script>",
      '<img src=x onerror=alert(1)>',
      "<svg onload=alert(1)>",
    ],
    explanation:
      "CSP Bypass: Die Policy erlaubt 'unsafe-inline' — damit sind Inline-Scripts und Event-Handler erlaubt. Eine korrekte CSP mit script-src 'self' würde Inline-Scripts blockieren.",
    protection:
      "CSP OHNE 'unsafe-inline'. Nonce-basierte CSP. Script-src 'self' nur für externe Dateien. Regelmäßige CSP-Audits.",
    points: 500,
    inputLabel: "Kommentar (CSP-geschützte Seite)",
    inputPlaceholder: "<script>alert(1)</script>",
    context: "csp",
  },
];

// ── Simulated Browser ──────────────────────────────────────────────────────

function SimulatedBrowser({
  url,
  content,
  showAlert,
  alertMessage,
  onAlertClose,
  cspHeader,
}: {
  url: string;
  content: string;
  showAlert: boolean;
  alertMessage: string;
  onAlertClose: () => void;
  cspHeader?: string;
}) {
  return (
    <div className="bg-slate-950 rounded-xl border border-slate-600 overflow-hidden mb-4">
      {/* Browser Chrome */}
      <div className="bg-slate-800 px-3 py-2 flex items-center gap-2 border-b border-slate-700">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="flex-1 bg-slate-700 rounded-md px-3 py-1 text-slate-300 text-xs font-mono truncate ml-2">
          🔒 {url}
        </div>
      </div>

      {/* CSP Header Display */}
      {cspHeader && (
        <div className="bg-slate-900 px-3 py-1 border-b border-slate-800">
          <span className="text-[10px] text-slate-500">CSP: </span>
          <span className="text-[10px] text-orange-400 font-mono">
            {cspHeader}
          </span>
        </div>
      )}

      {/* Page Content */}
      <div className="relative min-h-[120px] p-4">
        <div
          className="text-slate-200 text-sm"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* Simulated Alert Box */}
        {showAlert && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
            <div className="bg-white rounded-lg shadow-2xl p-6 max-w-xs text-center">
              <div className="text-4xl mb-3">🚨</div>
              <p className="text-gray-800 font-bold text-sm mb-1">
                Alert Box
              </p>
              <p className="text-gray-600 text-xs font-mono mb-4 break-all">
                {alertMessage}
              </p>
              <p className="text-green-600 text-xs font-bold mb-3">
                ✅ XSS erfolgreich ausgeführt!
              </p>
              <button
                onClick={onAlertClose}
                className="px-4 py-1.5 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-500 transition-colors"
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Level Detail ───────────────────────────────────────────────────────────

function XSSLevelDetail({
  level,
  result,
  hintIndex,
  showProtection,
  onHint,
  onToggleProtection,
}: {
  level: XSSLevel;
  result: { success: boolean; message: string } | null;
  hintIndex: number;
  showProtection: boolean;
  onHint: () => void;
  onToggleProtection: () => void;
}) {
  const diffColor =
    level.difficulty === "leicht"
      ? "text-green-400 bg-green-900/30 border-green-800/40"
      : level.difficulty === "mittel"
      ? "text-yellow-400 bg-yellow-900/30 border-yellow-800/40"
      : "text-red-400 bg-red-900/30 border-red-800/40";

  return (
    <div className="bg-slate-900 rounded-lg p-4 mb-4">
      <div className="flex items-center gap-3 mb-2 flex-wrap">
        <h4 className="text-white font-bold">
          🎯 Level {level.id}: {level.title}
        </h4>
        <span
          className={`px-2 py-0.5 rounded text-[10px] font-bold border ${diffColor}`}
        >
          {level.difficulty.toUpperCase()}
        </span>
        <span className="px-2 py-0.5 rounded text-[10px] bg-purple-900/40 text-purple-300 border border-purple-800/40">
          {level.type}
        </span>
        <span className="ml-auto text-yellow-400 text-xs font-bold">
          +{level.points} Punkte
        </span>
      </div>
      <p className="text-slate-300 text-sm mb-3">{level.description}</p>

      {/* Vulnerable Code */}
      <div className="bg-slate-800 rounded-lg p-3 border border-slate-700 mb-3">
        <p className="text-slate-400 text-xs mb-1">Verwundbarer Quellcode:</p>
        <pre className="text-yellow-400 font-mono text-xs whitespace-pre-wrap">
          {level.vulnerableCode}
        </pre>
      </div>

      {/* Result */}
      {result && (
        <div
          className={`rounded-lg p-3 border mb-3 ${
            result.success
              ? "bg-green-900/30 border-green-700"
              : "bg-red-900/30 border-red-700"
          }`}
        >
          <p
            className={`text-sm ${
              result.success ? "text-green-300" : "text-red-300"
            }`}
          >
            {result.message}
          </p>
        </div>
      )}

      {/* Hints & Protection */}
      <div className="flex gap-2 mb-3">
        <button
          onClick={onHint}
          className="text-xs text-yellow-400 hover:text-yellow-300 transition-colors"
        >
          {hintIndex > 0
            ? `💡 Tipp ${hintIndex}/${level.hints.length} (−50 Pkt)`
            : "💡 Tipp anzeigen (kostenlos)"}
        </button>
        <button
          onClick={onToggleProtection}
          className="text-xs text-green-400 hover:text-green-300 transition-colors"
        >
          {showProtection
            ? "🛡️ Schutz verbergen"
            : "🛡️ Schutzmaßnahmen anzeigen"}
        </button>
      </div>

      {hintIndex > 0 && (
        <div className="bg-yellow-900/20 border border-yellow-800/30 rounded-lg p-3 mb-3">
          {level.hints.slice(0, hintIndex).map((h, i) => (
            <p key={i} className="text-yellow-300 text-sm">
              💡 {h}
            </p>
          ))}
        </div>
      )}

      {showProtection && (
        <div className="bg-green-900/20 border border-green-800/30 rounded-lg p-3 mb-3">
          <h5 className="text-green-400 font-semibold text-xs mb-1">
            🛡️ Schutzmaßnahmen:
          </h5>
          <p className="text-green-200 text-sm">{level.protection}</p>
        </div>
      )}

      {result?.success && (
        <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-3">
          <h5 className="text-blue-400 font-semibold text-xs mb-1">
            📖 Erklärung:
          </h5>
          <p className="text-blue-200 text-sm">{level.explanation}</p>
        </div>
      )}
    </div>
  );
}

// ── Haupt-Komponente ───────────────────────────────────────────────────────

export function XSSChallengeSimulator() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [hintIndex, setHintIndex] = useState(0);
  const [showProtection, setShowProtection] = useState(false);
  const [completedLevels, setCompletedLevels] = useState<Set<number>>(
    new Set()
  );
  const [scores, setScores] = useState<Record<number, number>>({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [browserContent, setBrowserContent] = useState(
    "<p class='text-slate-400 text-sm'>Gib einen Payload ein und klicke auf 'Testen'...</p>"
  );
  const [browserUrl, setBrowserUrl] = useState(
    "https://blog.example.com/search?q="
  );

  const level = xssLevels[currentLevel];
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const maxScore = xssLevels.reduce((a, l) => a + l.points, 0);
  const starCount = Math.min(5, Math.ceil((totalScore / maxScore) * 5));

  // Simulate the XSS in the "browser"
  const simulateXSS = useCallback(
    (payload: string, lvl: XSSLevel) => {
      const normalized = payload.toLowerCase().trim();

      const success = lvl.successPayloads.some((p) =>
        normalized.includes(p.toLowerCase().trim())
      );

      if (!payload.trim()) {
        setBrowserContent(
          "<p class='text-slate-400 text-sm'>Bitte gib einen Payload ein.</p>"
        );
        return { success: false, message: "⚠️ Bitte gib einen Payload ein." };
      }

      if (success) {
        // Show the payload rendered in the browser (simulating XSS)
        let rendered = "";
        let alertMsg = "XSS Alert!";

        if (lvl.context === "url") {
          rendered = `<h2 class="text-white">Suchergebnisse für: ${payload}</h2><p class="text-slate-400">Keine Ergebnisse gefunden.</p>`;
          setBrowserUrl(
            `https://blog.example.com/search?q=${encodeURIComponent(payload)}`
          );
        } else if (lvl.context === "comment") {
          rendered = `<div class="border-b border-slate-700 pb-2 mb-2"><p class="text-slate-300 text-xs">Kommentar von Besucher:</p><div class="text-white text-sm">${payload}</div></div>`;
          setBrowserUrl("https://blog.example.com/artikel/42");
        } else if (lvl.context === "search") {
          rendered = `<p class="text-white">Hallo, ${payload}!</p><p class="text-slate-400">Willkommen auf unserer Seite.</p>`;
          setBrowserUrl(
            `https://blog.example.com/welcome?name=${encodeURIComponent(payload)}`
          );
        } else if (lvl.context === "profile") {
          rendered = `<h3 class="text-white">Profil: Max</h3><p class="text-slate-300">Beschreibung: ${payload}</p>`;
          setBrowserUrl("https://blog.example.com/profile/max");
        } else if (lvl.context === "csp") {
          rendered = `<h2 class="text-white">Kommentare</h2><div class="text-white text-sm">${payload}</div>`;
          setBrowserUrl("https://blog.example.com/artikel/99");
        }

        // Extract alert message from payload
        const alertMatch = payload.match(/alert\(['"]?(.*?)['"]?\)/i);
        if (alertMatch) {
          alertMsg = alertMatch[1] || "XSS!";
        }

        setBrowserContent(rendered);
        setAlertMessage(alertMsg);
        // Delay alert to simulate script execution
        setTimeout(() => setShowAlert(true), 300);

        return {
          success: true,
          message: `✅ Script wurde ausgeführt! "${lvl.type}" XSS erfolgreich.`,
        };
      }

      // Failed
      let rendered = "";
      if (lvl.context === "url") {
        rendered = `<h2 class="text-white">Suchergebnisse für: ${escapeHtml(payload)}</h2><p class="text-slate-400">Keine Ergebnisse gefunden.</p>`;
        setBrowserUrl(
          `https://blog.example.com/search?q=${encodeURIComponent(payload)}`
        );
      } else if (lvl.context === "comment") {
        rendered = `<div class="border-b border-slate-700 pb-2 mb-2"><p class="text-slate-300 text-xs">Kommentar:</p><div class="text-white text-sm">${escapeHtml(payload)}</div></div>`;
        setBrowserUrl("https://blog.example.com/artikel/42");
      } else if (lvl.context === "search") {
        rendered = `<p class="text-white">Hallo, ${escapeHtml(payload)}!</p>`;
        setBrowserUrl(
          `https://blog.example.com/welcome?name=${encodeURIComponent(payload)}`
        );
      } else if (lvl.context === "profile") {
        rendered = `<h3 class="text-white">Profil: Max</h3><p class="text-slate-300">Beschreibung: ${escapeHtml(payload)}</p>`;
        setBrowserUrl("https://blog.example.com/profile/max");
      } else if (lvl.context === "csp") {
        rendered = `<h2 class="text-white">Kommentare</h2><div class="text-white text-sm">${escapeHtml(payload)}</div>`;
        setBrowserUrl("https://blog.example.com/artikel/99");
      }

      setBrowserContent(rendered);
      return {
        success: false,
        message:
          "❌ Script wurde NICHT ausgeführt. Der Payload wurde gefiltert oder ist ungültig.",
      };
    },
    []
  );

  const handleTest = useCallback(() => {
    const res = simulateXSS(input, level);
    setResult(res);
    if (res.success && !completedLevels.has(level.id)) {
      setCompletedLevels((prev) => new Set([...prev, level.id]));
      const penalty = hintIndex > 1 ? (hintIndex - 1) * 50 : 0;
      setScores((prev) => ({
        ...prev,
        [level.id]: Math.max(0, level.points - penalty),
      }));
    }
  }, [input, level, completedLevels, hintIndex, simulateXSS]);

  const handleReset = useCallback(() => {
    setInput("");
    setResult(null);
    setHintIndex(0);
    setShowProtection(false);
    setShowAlert(false);
    setBrowserContent(
      "<p class='text-slate-400 text-sm'>Gib einen Payload ein und klicke auf 'Testen'...</p>"
    );
    setBrowserUrl("https://blog.example.com/search?q=");
  }, []);

  const switchLevel = useCallback((idx: number) => {
    setCurrentLevel(idx);
    setInput("");
    setResult(null);
    setHintIndex(0);
    setShowProtection(false);
    setShowAlert(false);
    setBrowserContent(
      "<p class='text-slate-400 text-sm'>Gib einen Payload ein und klicke auf 'Testen'...</p>"
    );
  }, []);

  return (
    <div className="bg-slate-800 rounded-xl p-4 sm:p-6 border border-slate-700">
      <h3 className="text-xl font-bold text-white mb-1">
        📜 XSS Challenge Simulator
      </h3>
      <p className="text-slate-300 text-sm mb-4">
        Finde und exploit XSS-Schwachstellen in einem simulierten Blog!
      </p>

      {/* Scoreboard */}
      <div className="bg-slate-900 rounded-lg p-3 mb-4 flex flex-wrap items-center gap-4">
        <div>
          <span className="text-slate-400 text-xs block">Punkte</span>
          <span className="text-white text-xl font-bold">{totalScore}</span>
          <span className="text-slate-500 text-xs"> / {maxScore}</span>
        </div>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={`text-lg ${
                i < starCount ? "opacity-100" : "opacity-20"
              }`}
            >
              ⭐
            </span>
          ))}
        </div>
        <div className="ml-auto text-slate-400 text-xs">
          {completedLevels.size} / {xssLevels.length} Level geschafft
        </div>
      </div>

      {/* Level Selector */}
      <div className="flex flex-wrap gap-2 mb-4">
        {xssLevels.map((l, idx) => (
          <button
            key={l.id}
            onClick={() => switchLevel(idx)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              currentLevel === idx
                ? "bg-purple-600 text-white shadow-md"
                : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
          >
            {completedLevels.has(l.id) && (
              <span className="text-green-400">✅</span>
            )}
            L{l.id}
          </button>
        ))}
      </div>

      {/* Level Detail */}
      <XSSLevelDetail
        level={level}
        result={result}
        hintIndex={hintIndex}
        showProtection={showProtection}
        onHint={() =>
          setHintIndex((prev) =>
            prev < level.hints.length ? prev + 1 : prev
          )
        }
        onToggleProtection={() => setShowProtection((v) => !v)}
      />

      {/* Simulated Browser */}
      <SimulatedBrowser
        url={browserUrl}
        content={browserContent}
        showAlert={showAlert}
        alertMessage={alertMessage}
        onAlertClose={() => setShowAlert(false)}
        cspHeader={
          level.context === "csp"
            ? "script-src 'unsafe-inline'; default-src 'self'"
            : undefined
        }
      />

      {/* Input */}
      <div className="mb-3">
        <label className="text-slate-400 text-xs mb-1 block">
          {level.inputLabel}:
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleTest()}
            placeholder={level.inputPlaceholder}
            className="flex-1 bg-slate-800 text-purple-400 font-mono rounded-lg px-3 py-2 text-sm border border-slate-600 focus:border-purple-400 focus:outline-none"
          />
          <button
            onClick={handleTest}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-medium transition-colors"
          >
            🧪 Testen
          </button>
          <button
            onClick={handleReset}
            className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* All completed */}
      {completedLevels.size === xssLevels.length && (
        <div className="bg-emerald-900/30 border border-emerald-700 rounded-lg p-4 mt-4 text-center">
          <p className="text-emerald-300 font-bold text-lg">
            🎉 Alle XSS-Level geschafft!
          </p>
          <p className="text-emerald-400 text-sm mt-1">
            Du kennst jetzt alle XSS-Typen. Merke:{" "}
            <strong>Output Encoding + CSP</strong> sind die beste Verteidigung!
          </p>
          <p className="text-yellow-400 text-sm mt-2 font-bold">
            Gesamtpunktzahl: {totalScore} / {maxScore}{" "}
            {"⭐".repeat(starCount)}
          </p>
        </div>
      )}

      {/* Merksatz */}
      <div className="mt-4 bg-purple-900/20 border border-purple-800/30 rounded-lg p-3">
        <p className="text-purple-300 text-sm">
          💡 <strong>Merke (OWASP #7):</strong> Cross-Site Scripting (XSS) ist
          eine der häufigsten Schwachstellen. Schutz:{" "}
          <strong>Output Encoding, CSP, HTTPOnly-Cookies, DOMPurify</strong>.
        </p>
      </div>
    </div>
  );
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
