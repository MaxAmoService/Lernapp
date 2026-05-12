"use client";

import { useState } from "react";

function ipToBinary(ip: string): string {
  return ip
    .split(".")
    .map((octet) => parseInt(octet).toString(2).padStart(8, "0"))
    .join(".");
}

function ipToNumber(ip: string): number {
  return ip
    .split(".")
    .reduce((acc, octet) => (acc << 8) + parseInt(octet), 0) >>> 0;
}

function numberToIp(num: number): string {
  return [
    (num >>> 24) & 255,
    (num >>> 16) & 255,
    (num >>> 8) & 255,
    num & 255,
  ].join(".");
}

function cidrToMask(cidr: number): string {
  const mask = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
  return numberToIp(mask);
}

function cidrToMaskBinary(cidr: number): string {
  let bits = "";
  for (let i = 0; i < 32; i++) {
    if (i > 0 && i % 8 === 0) bits += ".";
    bits += i < cidr ? "1" : "0";
  }
  return bits;
}

interface SubnetResult {
  network: string;
  broadcast: string;
  firstHost: string;
  lastHost: string;
  numHosts: number;
  subnetMask: string;
  wildcardMask: string;
  networkBinary: string;
  broadcastBinary: string;
}

function calculateSubnet(ip: string, cidr: number): SubnetResult {
  const ipNum = ipToNumber(ip);
  const maskNum = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
  const networkNum = (ipNum & maskNum) >>> 0;
  const broadcastNum = (networkNum | ~maskNum) >>> 0;
  const wildcardNum = (~maskNum) >>> 0;
  const numHosts = Math.max(0, broadcastNum - networkNum - 1);

  return {
    network: numberToIp(networkNum),
    broadcast: numberToIp(broadcastNum),
    firstHost: numHosts > 0 ? numberToIp(networkNum + 1) : "N/A",
    lastHost: numHosts > 0 ? numberToIp(broadcastNum - 1) : "N/A",
    numHosts,
    subnetMask: cidrToMask(cidr),
    wildcardMask: numberToIp(wildcardNum),
    networkBinary: ipToBinary(numberToIp(networkNum)),
    broadcastBinary: ipToBinary(numberToIp(broadcastNum)),
  };
}

interface SubnetTask {
  ip: string;
  cidr: number;
  question: string;
  answer: string;
}

function generateTask(): SubnetTask {
  const classes = [
    { ip: "192.168.1.", cidr: 24 },
    { ip: "10.0.", cidr: 16 },
    { ip: "172.16.", cidr: 20 },
    { ip: "192.168.10.", cidr: 26 },
    { ip: "10.10.1.", cidr: 28 },
    { ip: "172.20.5.", cidr: 22 },
    { ip: "192.168.100.", cidr: 25 },
    { ip: "10.0.1.", cidr: 30 },
  ];

  const cls = classes[Math.floor(Math.random() * classes.length)];
  let ip: string;
  if (cls.ip.endsWith(".")) {
    ip = cls.ip + (Math.floor(Math.random() * 254) + 1);
  } else {
    ip = cls.ip;
  }

  const questions = [
    "Netzadresse",
    "Broadcast-Adresse",
    "Erste nutzbare Host-Adresse",
    "Letzte nutzbare Host-Adresse",
    "Anzahl nutzbarer Hosts",
    "Subnetzmaske",
  ];
  const q = questions[Math.floor(Math.random() * questions.length)];
  const result = calculateSubnet(ip, cls.cidr);

  let answer: string;
  switch (q) {
    case "Netzadresse": answer = result.network; break;
    case "Broadcast-Adresse": answer = result.broadcast; break;
    case "Erste nutzbare Host-Adresse": answer = result.firstHost; break;
    case "Letzte nutzbare Host-Adresse": answer = result.lastHost; break;
    case "Anzahl nutzbarer Hosts": answer = String(result.numHosts); break;
    case "Subnetzmaske": answer = result.subnetMask; break;
    default: answer = result.network;
  }

  return { ip, cidr: cls.cidr, question: q, answer };
}

export function SubnetCalculator() {
  const [ip, setIp] = useState("192.168.1.100");
  const [cidr, setCidr] = useState(24);
  const [result, setResult] = useState<SubnetResult | null>(null);
  const [tab, setTab] = useState<"calc" | "bits" | "quiz">("calc");
  const [task, setTask] = useState<SubnetTask | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  const doCalculate = () => {
    const parts = ip.split(".");
    if (parts.length !== 4 || parts.some((p) => isNaN(Number(p)) || Number(p) < 0 || Number(p) > 255)) {
      return;
    }
    setResult(calculateSubnet(ip, cidr));
  };

  const newTask = () => {
    const t = generateTask();
    setTask(t);
    setUserAnswer("");
    setFeedback(null);
  };

  const checkAnswer = () => {
    if (!task) return;
    const clean = userAnswer.trim();
    if (clean === task.answer) {
      setFeedback("✅ Richtig!");
    } else {
      setFeedback(`❌ Falsch. Die richtige Antwort ist: ${task.answer}`);
    }
  };

  const maskBinary = cidrToMaskBinary(cidr);
  const ipBinary = ipToBinary(ip);

  return (
    <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
      <h3 className="text-lg font-bold text-white mb-3">🔢 Subnet Calculator</h3>

      {/* Tabs */}
      <div className="flex gap-1 mb-4 bg-slate-700 rounded-lg p-1">
        {([["calc", "🧮 Rechner"], ["bits", "📊 Bit-Ansicht"], ["quiz", "🎯 Aufgaben"]] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key as typeof tab)}
            className={`flex-1 px-3 py-1.5 rounded text-sm transition-colors ${
              tab === key ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-600"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "calc" && (
        <div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="text-xs text-slate-400 mb-1 block">IP-Adresse</label>
              <input
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                placeholder="192.168.1.100"
                className="w-full px-3 py-2 bg-slate-700 rounded-lg text-white text-sm border border-slate-600 focus:border-blue-500 outline-none font-mono"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">CIDR: /{cidr}</label>
              <input
                type="range"
                min={0}
                max={32}
                value={cidr}
                onChange={(e) => setCidr(Number(e.target.value))}
                className="w-full mt-2"
              />
              <div className="flex justify-between text-xs text-slate-500">
                <span>/0</span>
                <span>/32</span>
              </div>
            </div>
          </div>

          <button
            onClick={doCalculate}
            className="w-full mb-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors"
          >
            🔢 Berechnen
          </button>

          {result && (
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <InfoBox label="Netzadresse" value={result.network} color="blue" />
                <InfoBox label="Broadcast" value={result.broadcast} color="red" />
                <InfoBox label="Erster Host" value={result.firstHost} color="green" />
                <InfoBox label="Letzter Host" value={result.lastHost} color="green" />
                <InfoBox label="Anzahl Hosts" value={String(result.numHosts)} color="purple" />
                <InfoBox label="Subnetzmaske" value={result.subnetMask} color="yellow" />
                <InfoBox label="Wildcard-Maske" value={result.wildcardMask} color="orange" />
                <InfoBox label="CIDR" value={`/${cidr}`} color="cyan" />
              </div>
            </div>
          )}
        </div>
      )}

      {tab === "bits" && (
        <div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="text-xs text-slate-400 mb-1 block">IP-Adresse</label>
              <input
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 rounded-lg text-white text-sm border border-slate-600 focus:border-blue-500 outline-none font-mono"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">CIDR: /{cidr}</label>
              <input
                type="range"
                min={0}
                max={32}
                value={cidr}
                onChange={(e) => setCidr(Number(e.target.value))}
                className="w-full mt-2"
              />
            </div>
          </div>

          {/* Bit visualization */}
          <div className="space-y-3">
            <div>
              <p className="text-xs text-slate-400 mb-1">IP-Adresse (Binär)</p>
              <div className="flex gap-0.5 flex-wrap">
                {ipBinary.split("").map((bit, i) => {
                  const pos = i - (ipBinary.slice(0, i + 1).split(".").length - 1);
                  const isNet = pos < cidr;
                  return bit === "." ? (
                    <span key={i} className="text-slate-500 mx-0.5">.</span>
                  ) : (
                    <span
                      key={i}
                      className={`w-6 h-6 flex items-center justify-center rounded text-xs font-mono ${
                        isNet ? "bg-blue-600 text-white" : "bg-orange-600 text-white"
                      }`}
                    >
                      {bit}
                    </span>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="text-xs text-slate-400 mb-1">Subnetzmaske (Binär)</p>
              <div className="flex gap-0.5 flex-wrap">
                {maskBinary.split("").map((bit, i) =>
                  bit === "." ? (
                    <span key={i} className="text-slate-500 mx-0.5">.</span>
                  ) : (
                    <span
                      key={i}
                      className={`w-6 h-6 flex items-center justify-center rounded text-xs font-mono ${
                        bit === "1" ? "bg-blue-600 text-white" : "bg-slate-600 text-slate-400"
                      }`}
                    >
                      {bit}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="flex gap-4 text-xs">
              <span className="flex items-center gap-1">
                <span className="w-4 h-4 bg-blue-600 rounded inline-block" /> Netz-Bits ({cidr})
              </span>
              <span className="flex items-center gap-1">
                <span className="w-4 h-4 bg-orange-600 rounded inline-block" /> Host-Bits ({32 - cidr})
              </span>
            </div>
          </div>
        </div>
      )}

      {tab === "quiz" && (
        <div>
          {!task ? (
            <button
              onClick={newTask}
              className="w-full px-4 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-medium transition-colors"
            >
              🎯 Neue Aufgabe starten
            </button>
          ) : (
            <div className="space-y-3">
              <div className="p-3 bg-slate-700 rounded-lg">
                <p className="text-sm text-white mb-1">
                  <span className="font-mono text-blue-400">{task.ip}</span>
                  <span className="text-slate-400"> /</span>
                  <span className="font-mono text-orange-400">{task.cidr}</span>
                </p>
                <p className="text-sm text-slate-300">
                  Berechne die <strong className="text-white">{task.question}</strong>:
                </p>
              </div>

              <input
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Deine Antwort..."
                className="w-full px-3 py-2 bg-slate-700 rounded-lg text-white text-sm border border-slate-600 focus:border-blue-500 outline-none font-mono"
                onKeyDown={(e) => e.key === "Enter" && checkAnswer()}
              />

              <div className="flex gap-2">
                <button
                  onClick={checkAnswer}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm transition-colors"
                >
                  ✅ Prüfen
                </button>
                <button
                  onClick={newTask}
                  className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg text-sm transition-colors"
                >
                  ➡️ Nächste
                </button>
              </div>

              {feedback && (
                <div className={`p-3 rounded-lg text-sm ${
                  feedback.startsWith("✅") ? "bg-green-900/30 text-green-300 border border-green-700" : "bg-red-900/30 text-red-300 border border-red-700"
                }`}>
                  {feedback}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function InfoBox({ label, value, color }: { label: string; value: string; color: string }) {
  const colors: Record<string, string> = {
    blue: "border-blue-600 bg-blue-900/20",
    red: "border-red-600 bg-red-900/20",
    green: "border-green-600 bg-green-900/20",
    purple: "border-purple-600 bg-purple-900/20",
    yellow: "border-yellow-600 bg-yellow-900/20",
    orange: "border-orange-600 bg-orange-900/20",
    cyan: "border-cyan-600 bg-cyan-900/20",
  };
  return (
    <div className={`p-2 rounded-lg border ${colors[color] || colors.blue}`}>
      <p className="text-xs text-slate-400">{label}</p>
      <p className="text-sm font-mono text-white font-medium">{value}</p>
    </div>
  );
}
