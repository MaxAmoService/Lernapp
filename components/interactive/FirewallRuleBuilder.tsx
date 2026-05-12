"use client";

import { useState } from "react";

type Rule = {
  id: number;
  action: "allow" | "deny";
  protocol: "TCP" | "UDP" | "ICMP" | "ANY";
  source: string;
  dest: string;
  port: string;
  enabled: boolean;
};

type Packet = {
  protocol: string;
  source: string;
  dest: string;
  port: number;
  description: string;
};

const DEFAULT_RULES: Rule[] = [
  { id: 1, action: "allow", protocol: "TCP", source: "192.168.1.0/24", dest: "any", port: "80,443", enabled: true },
  { id: 2, action: "allow", protocol: "TCP", source: "192.168.1.0/24", dest: "any", port: "53", enabled: true },
  { id: 3, action: "deny", protocol: "ANY", source: "any", dest: "any", port: "any", enabled: true },
];

const TEST_PACKETS: Packet[] = [
  { protocol: "TCP", source: "192.168.1.5", dest: "142.250.74.110", port: 443, description: "💻 Browser → google.com (HTTPS)" },
  { protocol: "TCP", source: "192.168.1.5", dest: "142.250.74.110", port: 80, description: "💻 Browser → google.com (HTTP)" },
  { protocol: "UDP", source: "192.168.1.5", dest: "8.8.8.8", port: 53, description: "💻 DNS-Abfrage an Google DNS" },
  { protocol: "TCP", source: "192.168.1.5", dest: "10.0.0.5", port: 22, description: "💻 SSH zu internem Server" },
  { protocol: "TCP", source: "10.0.0.100", dest: "192.168.1.5", port: 3389, description: "🌐 Externer RDP-Zugriff (Angriff!)" },
  { protocol: "ICMP", source: "192.168.1.5", dest: "8.8.8.8", port: 0, description: "💻 Ping zu 8.8.8.8" },
];

export function FirewallRuleBuilder() {
  const [rules, setRules] = useState<Rule[]>(DEFAULT_RULES);
  const [results, setResults] = useState<{ packet: string; action: "allow" | "deny"; rule: string }[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newRule, setNewRule] = useState({ action: "allow" as const, protocol: "TCP" as const, source: "", dest: "", port: "" });

  const testPacket = (pkt: Packet) => {
    for (const rule of rules) {
      if (!rule.enabled) continue;

      const protocolMatch = rule.protocol === "ANY" || rule.protocol === pkt.protocol;
      const sourceMatch = rule.source === "any" || rule.source === pkt.source || pkt.source.startsWith(rule.source.split("/")[0].split(".").slice(0, 3).join("."));
      const destMatch = rule.dest === "any" || rule.dest === pkt.dest;
      const portMatch = rule.port === "any" || rule.port.includes(String(pkt.port));

      if (protocolMatch && sourceMatch && destMatch && portMatch) {
        return { packet: pkt.description, action: rule.action, rule: `Regel #${rule.id}` };
      }
    }
    return { packet: pkt.description, action: "deny" as const, rule: "Keine Regel (Default Deny)" };
  };

  const runAllTests = () => {
    const res = TEST_PACKETS.map(testPacket);
    setResults(res);
  };

  const toggleRule = (id: number) => {
    setRules(rules.map((r) => r.id === id ? { ...r, enabled: !r.enabled } : r));
  };

  const addRule = () => {
    const id = Math.max(...rules.map((r) => r.id)) + 1;
    setRules([...rules.slice(0, -1), { ...newRule, id, enabled: true }, rules[rules.length - 1]]);
    setShowAdd(false);
    setNewRule({ action: "allow", protocol: "TCP", source: "", dest: "", port: "" });
  };

  const deleteRule = (id: number) => {
    setRules(rules.filter((r) => r.id !== id));
  };

  return (
    <div className="bg-slate-800 rounded-xl p-4 sm:p-6 border border-slate-700">
      <h3 className="text-xl font-bold text-white mb-2">🔥 Firewall-Regel-Builder</h3>
      <p className="text-slate-300 text-sm mb-4">
        Baue Firewall-Regeln und teste Pakete — was kommt durch, was wird blockiert?
      </p>

      {/* Regeln */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-white font-semibold">📋 Firewall-Regeln (oben = höchste Priorität)</h4>
          <button onClick={() => setShowAdd(!showAdd)} className="text-sm text-blue-400 hover:text-blue-300">
            ➕ Regel hinzufügen
          </button>
        </div>

        <div className="space-y-1">
          {rules.map((rule) => (
            <div
              key={rule.id}
              className={`flex items-center gap-2 p-2 rounded-lg text-xs font-mono transition-all ${
                rule.enabled ? "bg-slate-900" : "bg-slate-900/50 opacity-50"
              }`}
            >
              <span className="w-6 text-slate-500">#{rule.id}</span>
              <span className={`px-2 py-0.5 rounded font-bold ${
                rule.action === "allow" ? "bg-green-600 text-white" : "bg-red-600 text-white"
              }`}>
                {rule.action.toUpperCase()}
              </span>
              <span className="text-blue-400 w-12">{rule.protocol}</span>
              <span className="text-slate-300 flex-1">{rule.source}</span>
              <span className="text-slate-500">→</span>
              <span className="text-slate-300 flex-1">{rule.dest}</span>
              <span className="text-yellow-400 w-16">:{rule.port}</span>
              <button onClick={() => toggleRule(rule.id)} className="text-slate-400 hover:text-white">
                {rule.enabled ? "🟢" : "⚫"}
              </button>
              <button onClick={() => deleteRule(rule.id)} className="text-slate-400 hover:text-red-400">
                🗑️
              </button>
            </div>
          ))}
        </div>

        {/* Neue Regel */}
        {showAdd && (
          <div className="mt-2 p-3 bg-slate-900 rounded-lg border border-blue-700">
            <div className="flex gap-2 flex-wrap">
              <select value={newRule.action} onChange={(e) => setNewRule({ ...newRule, action: e.target.value as any })}
                className="bg-slate-700 text-white rounded px-2 py-1 text-xs">
                <option value="allow">ALLOW</option>
                <option value="deny">DENY</option>
              </select>
              <select value={newRule.protocol} onChange={(e) => setNewRule({ ...newRule, protocol: e.target.value as any })}
                className="bg-slate-700 text-white rounded px-2 py-1 text-xs">
                <option value="TCP">TCP</option>
                <option value="UDP">UDP</option>
                <option value="ICMP">ICMP</option>
                <option value="ANY">ANY</option>
              </select>
              <input placeholder="Quelle" value={newRule.source} onChange={(e) => setNewRule({ ...newRule, source: e.target.value })}
                className="bg-slate-700 text-white rounded px-2 py-1 text-xs w-32" />
              <input placeholder="Ziel" value={newRule.dest} onChange={(e) => setNewRule({ ...newRule, dest: e.target.value })}
                className="bg-slate-700 text-white rounded px-2 py-1 text-xs w-32" />
              <input placeholder="Port" value={newRule.port} onChange={(e) => setNewRule({ ...newRule, port: e.target.value })}
                className="bg-slate-700 text-white rounded px-2 py-1 text-xs w-20" />
              <button onClick={addRule} className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs">
                ✅ Hinzufügen
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Test-Pakete */}
      <div className="mb-4">
        <button onClick={runAllTests}
          className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-sm font-medium mb-3">
          🧪 Alle Pakete testen
        </button>

        {results.length > 0 && (
          <div className="space-y-1">
            {results.map((res, idx) => (
              <div key={idx} className={`flex items-center gap-2 p-2 rounded-lg text-xs ${
                res.action === "allow" ? "bg-green-900/30 border border-green-800" : "bg-red-900/30 border border-red-800"
              }`}>
                <span>{res.action === "allow" ? "✅" : "🚫"}</span>
                <span className="text-slate-300 flex-1">{res.packet}</span>
                <span className={`font-mono font-bold ${res.action === "allow" ? "text-green-400" : "text-red-400"}`}>
                  {res.action.toUpperCase()}
                </span>
                <span className="text-slate-500 text-xs">({res.rule})</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Merksatz */}
      <div className="bg-orange-900/30 border border-orange-700 rounded-lg p-3">
        <p className="text-orange-300 text-sm">
          💡 <strong>Merke:</strong> Firewall-Regeln werden von OBEN nach UNTEN geprüft. Die ERSTE passende Regel gewinnt!
          Am Ende steht immer eine &quot;Deny All&quot;-Regel als Catch-All.
        </p>
      </div>
    </div>
  );
}
