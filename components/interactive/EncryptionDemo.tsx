"use client";

import { useState, useEffect } from "react";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function caesarEncrypt(text: string, shift: number): string {
  return text
    .toUpperCase()
    .split("")
    .map((ch) => {
      const idx = ALPHABET.indexOf(ch);
      if (idx === -1) return ch;
      return ALPHABET[(idx + shift) % 26];
    })
    .join("");
}

function caesarDecrypt(text: string, shift: number): string {
  return caesarEncrypt(text, 26 - shift);
}

function xorEncrypt(text: string, key: string): string {
  return text
    .split("")
    .map((ch, i) => {
      const code = ch.charCodeAt(0) ^ key.charCodeAt(i % key.length);
      return code.toString(16).padStart(2, "0").toUpperCase();
    })
    .join(" ");
}

function xorDecrypt(hex: string, key: string): string {
  const bytes = hex.split(" ").map((h) => parseInt(h, 16));
  return bytes
    .map((b, i) => String.fromCharCode(b ^ key.charCodeAt(i % key.length)))
    .join("");
}

export function EncryptionDemo() {
  const [mode, setMode] = useState<"caesar" | "xor" | "tls">("tls");
  const [plaintext, setPlaintext] = useState("Hallo Welt!");
  const [shift, setShift] = useState(3);
  const [xorKey, setXorKey] = useState("SECRET");
  const [encrypted, setEncrypted] = useState("");
  const [decrypted, setDecrypted] = useState("");
  const [showSteps, setShowSteps] = useState(true);
  const [tlsPhase, setTlsPhase] = useState(0);
  const [tlsAnimating, setTlsAnimating] = useState(false);

  useEffect(() => {
    if (mode === "caesar") {
      const enc = caesarEncrypt(plaintext, shift);
      setEncrypted(enc);
      setDecrypted(caesarDecrypt(enc, shift));
    } else if (mode === "xor") {
      const enc = xorEncrypt(plaintext, xorKey);
      setEncrypted(enc);
      setDecrypted(xorDecrypt(enc, xorKey));
    }
  }, [plaintext, shift, xorKey, mode]);

  const tlsPhases = [
    { name: "Client Hello", icon: "👋", description: "Client: 'Hallo! Ich unterstütze diese Verschlüsselungsverfahren:'", detail: "Unterstützte Cipher Suites: TLS_AES_256_GCM_SHA384, TLS_CHACHA20_POLY1305...\nClient Random: 32 Byte Zufallszahl", color: "#3B82F6" },
    { name: "Server Hello", icon: "🤝", description: "Server: 'Hallo! Ich wähle TLS_AES_256_GCM_SHA384'", detail: "Server Random: 32 Byte Zufallszahl\nServer-Zertifikat: Ausgestellt von Let's Encrypt\nPublic Key: RSA 2048-bit", color: "#22C55E" },
    { name: "Zertifikat prüfen", icon: "🔒", description: "Client prüft das Server-Zertifikat gegen vertrauenswürdige CAs", detail: "✅ Zertifikat gültig\n✅ Ausgestellt von vertrauenswürdiger CA\n✅ Domain stimmt überein\n✅ Nicht abgelaufen", color: "#EAB308" },
    { name: "Key Exchange", icon: "🔑", description: "Beide Seiten einigen sich auf einen gemeinsamen Sitzungsschlüssel", detail: "Pre-Master-Secret: Client generiert 48 Byte\nVerschlüsselt mit Server-Public-Key gesendet\nBeide berechnen: Master-Secret = PRF(PMS, Client Random, Server Random)\nSitzungsschlüssel abgeleitet!", color: "#F97316" },
    { name: "Finished", icon: "✅", description: "Verbindung steht — alle Daten sind jetzt verschlüsselt!", detail: "Cipher: TLS_AES_256_GCM_SHA384\nKey: 256-bit AES\nIV: Abgeleitet vom Master-Secret\nAlle Daten werden jetzt verschlüsselt übertragen!", color: "#8B5CF6" },
  ];

  const startTLS = () => {
    setTlsPhase(0);
    setTlsAnimating(true);
    let phase = 0;
    const interval = setInterval(() => {
      phase++;
      if (phase >= tlsPhases.length) {
        clearInterval(interval);
        setTlsAnimating(false);
      }
      setTlsPhase(phase);
    }, 2000);
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="text-xl font-bold text-white mb-2">🔐 Verschlüsselung — Interaktiv erleben</h3>
      <p className="text-slate-300 text-sm mb-4">
        Wie schützt HTTPS deine Daten? Erlebe Verschlüsselung von Caesar bis TLS!
      </p>

      {/* Modus Toggle */}
      <div className="flex gap-2 mb-4">
        <button onClick={() => setMode("caesar")}
          className={`px-3 py-2 rounded-lg text-sm font-medium ${mode === "caesar" ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"}`}>
          🔤 Caesar
        </button>
        <button onClick={() => setMode("xor")}
          className={`px-3 py-2 rounded-lg text-sm font-medium ${mode === "xor" ? "bg-green-600 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"}`}>
          🔑 XOR
        </button>
        <button onClick={() => setMode("tls")}
          className={`px-3 py-2 rounded-lg text-sm font-medium ${mode === "tls" ? "bg-purple-600 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"}`}>
          🔒 TLS (HTTPS)
        </button>
      </div>

      {/* Caesar & XOR */}
      {mode !== "tls" && (
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-slate-400 text-xs mb-1 block">📝 Klartext (Plaintext)</label>
              <input
                type="text"
                value={plaintext}
                onChange={(e) => setPlaintext(e.target.value)}
                className="w-full bg-slate-700 text-white rounded-lg px-3 py-2 text-sm font-mono"
              />
            </div>
            {mode === "caesar" ? (
              <div>
                <label className="text-slate-400 text-xs mb-1 block">🔢 Verschiebung (Shift): {shift}</label>
                <input
                  type="range"
                  min="1"
                  max="25"
                  value={shift}
                  onChange={(e) => setShift(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            ) : (
              <div>
                <label className="text-slate-400 text-xs mb-1 block">🔑 Schlüssel (Key)</label>
                <input
                  type="text"
                  value={xorKey}
                  onChange={(e) => setXorKey(e.target.value)}
                  className="w-full bg-slate-700 text-white rounded-lg px-3 py-2 text-sm font-mono"
                />
              </div>
            )}
          </div>

          {/* Verschlüsselungs-Visualisierung */}
          {showSteps && (
            <div className="bg-slate-900 rounded-lg p-4 mb-4">
              <h4 className="text-white font-semibold text-sm mb-3">🔄 Verschlüsselung Schritt für Schritt:</h4>

              {mode === "caesar" ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-mono text-sm">
                    <span className="text-slate-500 w-24">Klartext:</span>
                    <span className="text-white">{plaintext.toUpperCase()}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-sm">
                    <span className="text-slate-500 w-24">Verschiebung:</span>
                    <span className="text-blue-400">+{shift} Positionen</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-sm">
                    <span className="text-slate-500 w-24">Beispiel:</span>
                    <span className="text-slate-300">
                      {plaintext.toUpperCase().split("").map((ch, i) => {
                        const idx = ALPHABET.indexOf(ch);
                        if (idx === -1) return <span key={i}>{ch}</span>;
                        return (
                          <span key={i} className="inline-flex flex-col items-center mx-0.5">
                            <span className="text-white text-xs">{ch}</span>
                            <span className="text-blue-400 text-xs">↓{shift}</span>
                            <span className="text-green-400 text-xs">{ALPHABET[(idx + shift) % 26]}</span>
                          </span>
                        );
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-sm">
                    <span className="text-slate-500 w-24">Geheimtext:</span>
                    <span className="text-green-400 font-bold">{encrypted}</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="text-slate-500 w-24">Klartext:</span>
                    <span className="text-white">{plaintext}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="text-slate-500 w-24">ASCII:</span>
                    <span className="text-slate-300">{plaintext.split("").map((ch) => ch.charCodeAt(0).toString().padStart(3, " ")).join(" ")}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="text-slate-500 w-24">Schlüssel:</span>
                    <span className="text-blue-400">{plaintext.split("").map((_, i) => xorKey[i % xorKey.length]).join("")}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="text-slate-500 w-24">XOR:</span>
                    <span className="text-yellow-400">{plaintext.split("").map((ch, i) => (ch.charCodeAt(0) ^ xorKey.charCodeAt(i % xorKey.length)).toString().padStart(3, " ")).join(" ")}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="text-slate-500 w-24">Hex:</span>
                    <span className="text-green-400 font-bold">{encrypted}</span>
                  </div>
                </div>
              )}

              {/* Entschlüsselung */}
              <div className="mt-4 pt-3 border-t border-slate-700">
                <div className="flex items-center gap-2 font-mono text-sm">
                  <span className="text-slate-500 w-24">Entschlüsselt:</span>
                  <span className="text-green-400">{decrypted}</span>
                  <span className="text-slate-500 text-xs">✅ = Original</span>
                </div>
              </div>
            </div>
          )}

          {/* Sicherheits-Bewertung */}
          <div className={`rounded-lg p-3 ${mode === "caesar" ? "bg-red-900/30 border border-red-700" : "bg-orange-900/30 border border-orange-700"}`}>
            <p className={`text-sm ${mode === "caesar" ? "text-red-300" : "text-orange-300"}`}>
              {mode === "caesar"
                ? "🚨 Caesar-Verschlüsselung ist UNSICHER! Nur 25 mögliche Schlüssel — leicht durch Brute Force knackbar. Wird heute NICHT mehr verwendet!"
                : "⚠️ XOR-Verschlüsselung ist besser als Caesar, aber unsicher bei kurzem Schlüssel. In der Praxis: AES-256 verwenden!"}
            </p>
          </div>
        </div>
      )}

      {/* TLS */}
      {mode === "tls" && (
        <div className="mb-6">
          <button onClick={startTLS} disabled={tlsAnimating}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:bg-slate-600 text-white rounded-lg text-sm font-medium mb-4">
            🔒 TLS-Handshake starten
          </button>

          <div className="space-y-2">
            {tlsPhases.map((phase, idx) => {
              const isActive = idx < tlsPhase;
              const isCurrent = idx === tlsPhase;

              return (
                <div
                  key={idx}
                  className={`rounded-lg border-2 transition-all duration-500 ${
                    isActive || isCurrent
                      ? isCurrent && tlsAnimating
                        ? "border-white shadow-lg"
                        : "border-slate-600"
                      : "border-slate-800 opacity-30"
                  }`}
                  style={{ backgroundColor: (isActive || isCurrent) ? `${phase.color}15` : "transparent" }}
                >
                  <div className="flex items-center gap-3 p-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shrink-0"
                      style={{ backgroundColor: phase.color }}>
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{phase.icon}</span>
                        <span className="text-white font-semibold text-sm">{phase.name}</span>
                      </div>
                      <p className="text-slate-400 text-xs">{phase.description}</p>
                    </div>
                    {isActive && <span className="text-green-400 text-xs">✅</span>}
                  </div>

                  {isCurrent && (
                    <div className="px-3 pb-3 border-t border-slate-700">
                      <pre className="text-xs text-slate-300 font-mono bg-slate-900 rounded p-2 mt-2 whitespace-pre-wrap">
                        {phase.detail}
                      </pre>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {tlsPhase >= tlsPhases.length && (
            <div className="bg-green-900/30 border border-green-700 rounded-lg p-3 mt-4">
              <p className="text-green-300 text-sm">
                🔒 <strong>Verbindung verschlüsselt!</strong> Alle Daten werden jetzt mit AES-256-GCM übertragen.
                Ein Angreifer sieht nur: <code className="font-mono bg-slate-900 px-1 rounded">0x7A 0x3F 0xB1 0x9C 0xE2 ...</code>
              </p>
            </div>
          )}
        </div>
      )}

      {/* Merksatz */}
      <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-3">
        <p className="text-blue-300 text-sm">
          💡 <strong>Merke:</strong> {mode === "tls"
            ? "HTTPS = HTTP + TLS. Der TLS-Handshake einigt sich auf einen Schlüssel, ohne ihn zu übertragen (Public-Key-Kryptografie). Danach: AES-Verschlüsselung!"
            : mode === "caesar"
              ? "Caesar-Verschlüsselung ist ein historisches Verfahren — heute nur noch als Lehrbeispiel. In der Praxis: AES-256!"
              : "XOR ist die Grundlage vieler Verschlüsselungsverfahren. In der Praxis werden AES oder ChaCha20 verwendet."}
        </p>
      </div>
    </div>
  );
}
