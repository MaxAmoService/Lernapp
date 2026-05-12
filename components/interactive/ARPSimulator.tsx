"use client";

import { useState, useCallback, useEffect } from "react";

interface ARPEntry {
  ip: string;
  mac: string;
  interface?: string;
  type: "static" | "dynamic";
  age: number; // seconds
}

interface NetworkDevice {
  id: string;
  name: string;
  type: "pc" | "router" | "switch" | "server";
  ip: string;
  mac: string;
  icon: string;
  x: number;
  y: number;
}

interface ARPRequest {
  id: string;
  from: string;
  targetIp: string;
  status: "pending" | "resolved" | "timeout";
  resolvedMac?: string;
  timestamp: number;
}

const INITIAL_DEVICES: NetworkDevice[] = [
  { id: "pc1", name: "PC-1", type: "pc", ip: "192.168.1.10", mac: "AA:BB:CC:DD:EE:01", icon: "💻", x: 100, y: 100 },
  { id: "pc2", name: "PC-2", type: "pc", ip: "192.168.1.20", mac: "AA:BB:CC:DD:EE:02", icon: "💻", x: 400, y: 100 },
  { id: "pc3", name: "PC-3", type: "pc", ip: "192.168.1.30", mac: "AA:BB:CC:DD:EE:03", icon: "💻", x: 100, y: 300 },
  { id: "server1", name: "Server", type: "server", ip: "192.168.1.100", mac: "AA:BB:CC:DD:EE:99", icon: "🖥️", x: 400, y: 300 },
  { id: "router1", name: "Router", type: "router", ip: "192.168.1.1", mac: "AA:BB:CC:DD:EE:00", icon: "🌐", x: 250, y: 200 },
];

export function ARPSimulator() {
  const [devices] = useState<NetworkDevice[]>(INITIAL_DEVICES);
  const [arpTables, setArpTables] = useState<Record<string, ARPEntry[]>>({
    pc1: [],
    pc2: [],
    pc3: [],
    server1: [],
    router1: [],
  });
  const [selectedDevice, setSelectedDevice] = useState<string>("pc1");
  const [targetIp, setTargetIp] = useState("192.168.1.20");
  const [requests, setRequests] = useState<ARPRequest[]>([]);
  const [animatingRequest, setAnimatingRequest] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [activeTab, setActiveTab] = useState<"simulator" | "table" | "learn">("simulator");

  const selectedDeviceData = devices.find((d) => d.id === selectedDevice);

  const sendARPRequest = useCallback(() => {
    if (!selectedDeviceData) return;

    const targetDevice = devices.find((d) => d.ip === targetIp);
    const requestId = `req-${Date.now()}`;

    const newRequest: ARPRequest = {
      id: requestId,
      from: selectedDevice,
      targetIp,
      status: "pending",
      timestamp: Date.now(),
    };

    setRequests((prev) => [...prev, newRequest]);
    setAnimatingRequest(requestId);

    // Simulate ARP resolution
    setTimeout(() => {
      if (targetDevice) {
        // Found — add to ARP table
        setRequests((prev) =>
          prev.map((r) =>
            r.id === requestId
              ? { ...r, status: "resolved", resolvedMac: targetDevice.mac }
              : r
          )
        );

        setArpTables((prev) => {
          const table = [...(prev[selectedDevice] || [])];
          const existing = table.findIndex((e) => e.ip === targetIp);
          if (existing >= 0) {
            table[existing] = { ip: targetIp, mac: targetDevice.mac, type: "dynamic", age: 0 };
          } else {
            table.push({ ip: targetIp, mac: targetDevice.mac, type: "dynamic", age: 0 });
          }
          return { ...prev, [selectedDevice]: table };
        });
      } else {
        // Not found — timeout
        setRequests((prev) =>
          prev.map((r) =>
            r.id === requestId ? { ...r, status: "timeout" } : r
          )
        );
      }
      setAnimatingRequest(null);
    }, 2000);
  }, [selectedDeviceData, selectedDevice, targetIp, devices]);

  const clearArpTable = (deviceId: string) => {
    setArpTables((prev) => ({ ...prev, [deviceId]: [] }));
  };

  const addStaticEntry = () => {
    if (!selectedDeviceData) return;
    const targetDevice = devices.find((d) => d.ip === targetIp);
    if (!targetDevice) return;

    setArpTables((prev) => {
      const table = [...(prev[selectedDevice] || [])];
      const existing = table.findIndex((e) => e.ip === targetIp);
      if (existing >= 0) {
        table[existing] = { ip: targetIp, mac: targetDevice.mac, type: "static", age: 0 };
      } else {
        table.push({ ip: targetIp, mac: targetDevice.mac, type: "static", age: 0 });
      }
      return { ...prev, [selectedDevice]: table };
    });
  };

  // Age ARP entries
  useEffect(() => {
    const interval = setInterval(() => {
      setArpTables((prev) => {
        const updated = { ...prev };
        for (const deviceId in updated) {
          updated[deviceId] = updated[deviceId]
            .map((e) => (e.type === "dynamic" ? { ...e, age: e.age + 1 } : e))
            .filter((e) => e.type === "static" || e.age < 300); // Remove after 5 min
        }
        return updated;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-slate-900/50 rounded-xl p-6 border border-slate-700">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            📡 ARP-Simulator
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Simuliere ARP-Requests und beobachte die ARP-Tabelle.
          </p>
        </div>
        <div className="flex gap-2">
          {(["simulator", "table", "learn"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                activeTab === tab
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }`}
            >
              {tab === "simulator" ? "🎮 Simulator" : tab === "table" ? "📋 ARP-Tabelle" : "📖 Lernen"}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "simulator" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Network visualization */}
          <div>
            <h4 className="text-sm font-semibold text-slate-300 mb-3">🌐 Netzwerk-Topologie</h4>
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 relative" style={{ height: 400 }}>
              {/* Connections (simplified) */}
              <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
                {devices.filter(d => d.type !== "switch").map((device) => {
                  const router = devices.find(d => d.type === "router")!;
                  return (
                    <line
                      key={device.id}
                      x1={device.x + 30}
                      y1={device.y + 30}
                      x2={router.x + 30}
                      y2={router.y + 30}
                      stroke="#475569"
                      strokeWidth={2}
                      strokeDasharray="4,4"
                    />
                  );
                })}
              </svg>

              {/* Devices */}
              {devices.map((device) => (
                <button
                  key={device.id}
                  onClick={() => setSelectedDevice(device.id)}
                  className={`absolute flex flex-col items-center p-2 rounded-lg transition-all ${
                    selectedDevice === device.id
                      ? "bg-blue-500/20 border border-blue-500/50 scale-110"
                      : "bg-slate-700/50 border border-transparent hover:border-slate-500"
                  }`}
                  style={{ left: device.x, top: device.y, zIndex: 1 }}
                >
                  <span className="text-2xl">{device.icon}</span>
                  <span className="text-xs text-white font-medium mt-1">{device.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{device.ip}</span>
                  <span className="text-[10px] text-slate-500 font-mono">{device.mac.slice(-5)}</span>
                </button>
              ))}

              {/* ARP Request animation */}
              {animatingRequest && (
                <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 2 }}>
                  <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg px-4 py-2 animate-pulse">
                    <span className="text-yellow-400 text-sm font-medium">
                      📡 ARP Request: Wer hat {targetIp}?
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div>
            <h4 className="text-sm font-semibold text-slate-300 mb-3">🎮 Steuerung</h4>

            {/* Device selection */}
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 mb-4">
              <label className="text-xs text-slate-400 mb-1 block">Sender-Gerät:</label>
              <select
                value={selectedDevice}
                onChange={(e) => setSelectedDevice(e.target.value)}
                className="w-full bg-slate-700 text-white text-sm rounded px-3 py-2 border border-slate-600 mb-3"
              >
                {devices.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.icon} {d.name} ({d.ip})
                  </option>
                ))}
              </select>

              <label className="text-xs text-slate-400 mb-1 block">Ziel-IP:</label>
              <select
                value={targetIp}
                onChange={(e) => setTargetIp(e.target.value)}
                className="w-full bg-slate-700 text-white text-sm rounded px-3 py-2 border border-slate-600 mb-3"
              >
                {devices
                  .filter((d) => d.id !== selectedDevice)
                  .map((d) => (
                    <option key={d.ip} value={d.ip}>
                      {d.icon} {d.name} ({d.ip}) — MAC: {d.mac}
                    </option>
                  ))}
                <option value="10.0.0.99">❌ Unbekannt (10.0.0.99)</option>
              </select>

              <div className="flex gap-2">
                <button
                  onClick={sendARPRequest}
                  disabled={!!animatingRequest}
                  className="flex-1 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors text-sm font-medium disabled:opacity-50"
                >
                  📡 ARP Request senden
                </button>
                <button
                  onClick={addStaticEntry}
                  className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors text-sm"
                  title="Statischen Eintrag hinzufügen"
                >
                  📌 Static
                </button>
              </div>
            </div>

            {/* ARP Table of selected device */}
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <h5 className="text-sm font-medium text-slate-300">
                  📋 ARP-Tabelle: {selectedDeviceData?.name}
                </h5>
                <button
                  onClick={() => clearArpTable(selectedDevice)}
                  className="text-xs text-red-400 hover:text-red-300"
                >
                  🗑️ Leeren
                </button>
              </div>
              {(arpTables[selectedDevice] || []).length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-4">
                  Keine Einträge — sende einen ARP Request!
                </p>
              ) : (
                <div className="space-y-1">
                  {arpTables[selectedDevice]?.map((entry, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs p-2 rounded bg-slate-700/30"
                    >
                      <span className="text-blue-400 font-mono">{entry.ip}</span>
                      <span className="text-slate-500">→</span>
                      <span className="text-green-400 font-mono">{entry.mac}</span>
                      <span
                        className={`ml-auto px-1.5 py-0.5 rounded text-[10px] ${
                          entry.type === "static"
                            ? "bg-purple-500/20 text-purple-400"
                            : "bg-slate-600 text-slate-400"
                        }`}
                      >
                        {entry.type === "static" ? "📌 Static" : `⏱️ ${300 - entry.age}s`}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent requests */}
            {requests.length > 0 && (
              <div className="mt-4 bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <h5 className="text-sm font-medium text-slate-300 mb-2">📨 Letzte Requests:</h5>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {requests.slice(-5).reverse().map((req) => (
                    <div key={req.id} className="flex items-center gap-2 text-xs">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          req.status === "resolved"
                            ? "bg-green-400"
                            : req.status === "timeout"
                            ? "bg-red-400"
                            : "bg-yellow-400 animate-pulse"
                        }`}
                      />
                      <span className="text-slate-400">
                        {devices.find((d) => d.id === req.from)?.name} → {req.targetIp}
                      </span>
                      <span className="ml-auto text-slate-500">
                        {req.status === "resolved"
                          ? `✅ ${req.resolvedMac}`
                          : req.status === "timeout"
                          ? "❌ Timeout"
                          : "⏳ Warte..."}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "table" && (
        <div>
          <h4 className="text-sm font-semibold text-slate-300 mb-3">📋 ARP-Tabellen aller Geräte</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {devices.map((device) => (
              <div key={device.id} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">
                    {device.icon} {device.name}
                    <span className="text-slate-400 text-xs ml-2">({device.ip})</span>
                  </span>
                  <button
                    onClick={() => clearArpTable(device.id)}
                    className="text-xs text-red-400 hover:text-red-300"
                  >
                    🗑️
                  </button>
                </div>
                {(arpTables[device.id] || []).length === 0 ? (
                  <p className="text-xs text-slate-500 text-center py-2">Leer</p>
                ) : (
                  <div className="space-y-1">
                    {arpTables[device.id]?.map((entry, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs p-1.5 rounded bg-slate-700/30">
                        <span className="text-blue-400 font-mono">{entry.ip}</span>
                        <span className="text-slate-500">→</span>
                        <span className="text-green-400 font-mono">{entry.mac}</span>
                        <span className={`ml-auto text-[10px] ${
                          entry.type === "static" ? "text-purple-400" : "text-slate-500"
                        }`}>
                          {entry.type === "static" ? "Static" : `${300 - entry.age}s`}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "learn" && (
        <div className="space-y-4">
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <h4 className="text-base font-semibold text-white mb-2">❓ Was ist ARP?</h4>
            <p className="text-sm text-slate-300">
              <strong>ARP</strong> (Address Resolution Protocol) löst eine IP-Adresse in eine MAC-Adresse auf.
              Da Ethernet auf Schicht 2 mit MAC-Adressen arbeitet, muss der Sender die MAC-Adresse des Ziels kennen —
              auch wenn er nur die IP-Adresse hat.
            </p>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <h4 className="text-base font-semibold text-white mb-2">🔄 So funktioniert ARP:</h4>
            <ol className="text-sm text-slate-300 space-y-2">
              <li className="flex gap-2">
                <span className="text-blue-400 font-bold">1.</span>
                <span>PC-1 möchte mit 192.168.1.20 kommunizieren, kennt aber nur die IP.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400 font-bold">2.</span>
                <span>PC-1 sendet einen <strong>Broadcast</strong> (an FF:FF:FF:FF:FF:FF): "Wer hat 192.168.1.20?"</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400 font-bold">3.</span>
                <span>Alle Geräte im Netzwerk empfangen den Request. Nur 192.168.1.20 antwortet.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400 font-bold">4.</span>
                <span>PC-2 antwortet (Unicast): "Ich bin 192.168.1.20, meine MAC ist AA:BB:CC:DD:EE:02"</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400 font-bold">5.</span>
                <span>PC-1 speichert den Eintrag in seiner <strong>ARP-Tabelle</strong> (IP → MAC).</span>
              </li>
            </ol>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-yellow-400 mb-2">⚠️ ARP-Spoofing (Sicherheitsrisiko!)</h4>
            <p className="text-sm text-slate-300">
              Ein Angreifer kann gefärfte ARP-Antworten senden und sich als Gateway ausgeben.
              Dadurch wird der gesamte Datenverkehr über den Angreifer umgeleitet (Man-in-the-Middle).
              Schutz: <strong>Dynamic ARP Inspection (DAI)</strong> auf managed Switches.
            </p>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-blue-400 mb-2">💡 IHK-Tipps:</h4>
            <ul className="text-sm text-slate-300 space-y-1">
              <li>• ARP arbeitet auf <strong>Schicht 2</strong> (Data Link) — wird aber von Schicht 3 (IP) ausgelöst</li>
              <li>• ARP-Request = <strong>Broadcast</strong>, ARP-Reply = <strong>Unicast</strong></li>
              <li>• ARP-Cache hat eine <strong>Lebenszeit</strong> (TTL) — Einträge verfallen nach ~5 Minuten</li>
              <li>• <strong>Static</strong> = manuell eingetragen, <strong>Dynamic</strong> = durch ARP gelernt</li>
              <li>• ARP-Tabelle anzeigen: <code className="bg-slate-700 px-1 rounded">arp -a</code> (Windows/Linux)</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
