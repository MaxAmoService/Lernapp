"use client";

import { useState } from "react";

interface VLANDevice {
  id: string;
  name: string;
  type: "pc" | "switch" | "router" | "server";
  vlanId: number | null;
  port: number;
  icon: string;
  x: number;
  y: number;
}

interface VLAN {
  id: number;
  name: string;
  color: string;
  devices: string[];
}

const INITIAL_VLANS: VLAN[] = [
  { id: 10, name: "Verwaltung", color: "#3b82f6", devices: ["pc1", "pc2"] },
  { id: 20, name: "Produktion", color: "#22c55e", devices: ["pc3", "pc4"] },
  { id: 30, name: "Gast", color: "#f59e0b", devices: ["pc5"] },
];

const DEVICES: VLANDevice[] = [
  { id: "pc1", name: "PC-Verwaltung 1", type: "pc", vlanId: 10, port: 1, icon: "💻", x: 60, y: 40 },
  { id: "pc2", name: "PC-Verwaltung 2", type: "pc", vlanId: 10, port: 2, icon: "💻", x: 60, y: 120 },
  { id: "pc3", name: "PC-Produktion 1", type: "pc", vlanId: 20, port: 3, icon: "💻", x: 60, y: 200 },
  { id: "pc4", name: "PC-Produktion 2", type: "pc", vlanId: 20, port: 4, icon: "💻", x: 60, y: 280 },
  { id: "pc5", name: "Gast-PC", type: "pc", vlanId: 30, port: 5, icon: "💻", x: 60, y: 360 },
];

export function VLANExplorer() {
  const [vlans, setVlans] = useState<VLAN[]>(INITIAL_VLANS);
  const [selectedVlan, setSelectedVlan] = useState<number | null>(10);
  const [showTagged, setShowTagged] = useState(false);
  const [dragDevice, setDragDevice] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"visual" | "config" | "learn">("visual");

  const getVlanColor = (vlanId: number | null) => {
    if (!vlanId) return "#6b7280";
    return vlans.find((v) => v.id === vlanId)?.color || "#6b7280";
  };

  const getVlanName = (vlanId: number | null) => {
    if (!vlanId) return "Kein VLAN";
    return vlans.find((v) => v.id === vlanId)?.name || `VLAN ${vlanId}`;
  };

  const moveDeviceToVlan = (deviceId: string, newVlanId: number) => {
    setVlans((prev) =>
      prev.map((v) => ({
        ...v,
        devices: v.id === newVlanId
          ? [...new Set([...v.devices, deviceId])]
          : v.devices.filter((d) => d !== deviceId),
      }))
    );
  };

  const addVlan = () => {
    const newId = Math.max(...vlans.map((v) => v.id)) + 10;
    const colors = ["#ef4444", "#8b5cf6", "#ec4899", "#14b8a6", "#f97316"];
    setVlans((prev) => [
      ...prev,
      {
        id: newId,
        name: `VLAN ${newId}`,
        color: colors[prev.length % colors.length],
        devices: [],
      },
    ]);
  };

  const canCommunicate = (dev1Id: string, dev2Id: string) => {
    const dev1 = DEVICES.find((d) => d.id === dev1Id);
    const dev2 = DEVICES.find((d) => d.id === dev2Id);
    if (!dev1 || !dev2) return false;
    return dev1.vlanId === dev2.vlanId && dev1.vlanId !== null;
  };

  const selectedVlanData = vlans.find((v) => v.id === selectedVlan);
  const devicesInVlan = DEVICES.filter((d) =>
    selectedVlanData?.devices.includes(d.id)
  );

  return (
    <div className="w-full bg-slate-900/50 rounded-xl p-6 border border-slate-700">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            🏷️ VLAN-Explorer
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Virtuelle LANs — ein großes Netzwerk in kleinere Broadcast-Domänen aufteilen.
          </p>
        </div>
        <div className="flex gap-2">
          {(["visual", "config", "learn"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                activeTab === tab
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }`}
            >
              {tab === "visual" ? "🖼️ Visualisierung" : tab === "config" ? "⚙️ Konfiguration" : "📖 Lernen"}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "visual" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Network visualization */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              {/* Switch */}
              <div className="flex justify-center mb-8">
                <div className="bg-slate-700 rounded-lg p-4 border-2 border-slate-500 min-w-[300px]">
                  <div className="text-center mb-2">
                    <span className="text-2xl">🔀</span>
                    <p className="text-sm font-semibold text-white">Managed Switch (Layer 3)</p>
                    <p className="text-xs text-slate-400">VLAN-fähig</p>
                  </div>
                  {/* Ports */}
                  <div className="flex justify-center gap-1 flex-wrap">
                    {DEVICES.map((device) => (
                      <div
                        key={device.id}
                        className="w-12 h-8 rounded border-2 flex items-center justify-center text-[10px] font-mono cursor-pointer transition-all hover:scale-110"
                        style={{
                          borderColor: getVlanColor(device.vlanId),
                          backgroundColor: `${getVlanColor(device.vlanId)}15`,
                          color: getVlanColor(device.vlanId),
                        }}
                        title={`Port ${device.port}: ${device.name} (${getVlanName(device.vlanId)})`}
                      >
                        P{device.port}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Devices */}
              <div className="grid grid-cols-5 gap-3">
                {DEVICES.map((device) => {
                  const vlan = vlans.find((v) => v.devices.includes(device.id));
                  const isSelected = selectedVlan === vlan?.id;

                  return (
                    <div
                      key={device.id}
                      className={`flex flex-col items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        isSelected
                          ? "border-white/50 bg-slate-700/50"
                          : "border-transparent bg-slate-800/30 hover:border-slate-600"
                      }`}
                      style={{
                        borderColor: isSelected ? getVlanColor(device.vlanId) : undefined,
                      }}
                      onClick={() => setSelectedVlan(vlan?.id || null)}
                    >
                      <span className="text-2xl mb-1">{device.icon}</span>
                      <span className="text-xs text-white font-medium">{device.name}</span>
                      <span
                        className="text-[10px] px-1.5 py-0.5 rounded mt-1"
                        style={{
                          backgroundColor: `${getVlanColor(device.vlanId)}20`,
                          color: getVlanColor(device.vlanId),
                        }}
                      >
                        VLAN {device.vlanId}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Communication test */}
              <div className="mt-4 bg-slate-700/30 rounded-lg p-3">
                <h5 className="text-xs font-semibold text-slate-300 mb-2">🔗 Kommunikationstest:</h5>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    ["pc1", "pc2"],
                    ["pc1", "pc3"],
                    ["pc3", "pc4"],
                    ["pc1", "pc5"],
                  ].map(([d1, d2]) => {
                    const dev1 = DEVICES.find((d) => d.id === d1)!;
                    const dev2 = DEVICES.find((d) => d.id === d2)!;
                    const canComm = canCommunicate(d1, d2);
                    return (
                      <div
                        key={`${d1}-${d2}`}
                        className={`flex items-center gap-1 p-1.5 rounded ${
                          canComm ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                        }`}
                      >
                        <span>{canComm ? "✅" : "❌"}</span>
                        <span>{dev1.name} ↔ {dev2.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* VLAN legend */}
          <div>
            <h4 className="text-sm font-semibold text-slate-300 mb-3">🏷️ VLANs</h4>
            <div className="space-y-2">
              {vlans.map((vlan) => (
                <button
                  key={vlan.id}
                  onClick={() => setSelectedVlan(selectedVlan === vlan.id ? null : vlan.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    selectedVlan === vlan.id
                      ? "border-white/30 bg-slate-700/50"
                      : "border-slate-700 hover:border-slate-600"
                  }`}
                  style={{
                    borderLeftColor: vlan.color,
                    borderLeftWidth: 3,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white">VLAN {vlan.id}</span>
                    <span className="text-xs text-slate-400">{vlan.name}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {vlan.devices.length} Gerät{vlan.devices.length !== 1 ? "e" : ""}
                  </p>
                </button>
              ))}
            </div>

            <button
              onClick={addVlan}
              className="w-full mt-2 px-3 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors text-sm"
            >
              + VLAN hinzufügen
            </button>
          </div>
        </div>
      )}

      {activeTab === "config" && (
        <div>
          <h4 className="text-sm font-semibold text-slate-300 mb-3">⚙️ VLAN-Konfiguration</h4>
          <p className="text-xs text-slate-400 mb-4">
            Weise Geräte VLANs zu. Klicke auf ein Gerät, um es in ein anderes VLAN zu verschieben.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DEVICES.map((device) => (
              <div key={device.id} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{device.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-white">{device.name}</p>
                    <p className="text-xs text-slate-400">Port {device.port}</p>
                  </div>
                  <span
                    className="ml-auto px-2 py-1 rounded text-xs"
                    style={{
                      backgroundColor: `${getVlanColor(device.vlanId)}20`,
                      color: getVlanColor(device.vlanId),
                    }}
                  >
                    VLAN {device.vlanId}
                  </span>
                </div>
                <select
                  value={device.vlanId || ""}
                  onChange={(e) => {
                    const newVlan = parseInt(e.target.value);
                    if (!isNaN(newVlan)) {
                      moveDeviceToVlan(device.id, newVlan);
                      DEVICES.find((d) => d.id === device.id)!.vlanId = newVlan;
                    }
                  }}
                  className="w-full bg-slate-700 text-white text-sm rounded px-3 py-1.5 border border-slate-600"
                >
                  {vlans.map((v) => (
                    <option key={v.id} value={v.id}>
                      VLAN {v.id} — {v.name}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          {/* Tagged/Untagged explanation */}
          <div className="mt-6 bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <h5 className="text-sm font-semibold text-white mb-2">📡 Tagged vs. Untagged Ports:</h5>
            <div className="grid grid-cols-2 gap-4 text-xs text-slate-300">
              <div className="bg-blue-500/10 p-3 rounded">
                <p className="font-semibold text-blue-400 mb-1">Access Port (Untagged)</p>
                <p>Port gehört zu genau einem VLAN. Endgeräte (PCs) werden hier angeschlossen. Der Switch taggt/enttaggt automatisch.</p>
              </div>
              <div className="bg-purple-500/10 p-3 rounded">
                <p className="font-semibold text-purple-400 mb-1">Trunk Port (Tagged)</p>
                <p>Port für Verbindungen zwischen Switches. Transportiert mehrere VLANs gleichzeitig mit 802.1Q-Tags.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "learn" && (
        <div className="space-y-4">
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <h4 className="text-base font-semibold text-white mb-2">❓ Was ist ein VLAN?</h4>
            <p className="text-sm text-slate-300">
              Ein <strong>VLAN</strong> (Virtual Local Area Network) teilt ein physisches Netzwerk in mehrere
              <strong> logische Netzwerke</strong> auf. Geräte im gleichen VLAN können miteinander kommunizieren,
              auch wenn sie an verschiedenen Switches angeschlossen sind — ohne dass der Datenverkehr
              andere VLANs erreicht.
            </p>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <h4 className="text-base font-semibold text-white mb-2">✅ Vorteile von VLANs:</h4>
            <ul className="text-sm text-slate-300 space-y-1">
              <li>• <strong>Broadcast-Domäne verkleinern:</strong> Broadcasts bleiben im VLAN</li>
              <li>• <strong>Sicherheit:</strong> Abteilungen werden voneinander isoliert</li>
              <li>• <strong>Flexibilität:</strong> Geräte können logisch umgruppiert werden, ohne Kabel zu ziehen</li>
              <li>• <strong>Weniger IP-Adressen:</strong> Jedes VLAN hat eigene Adressierung</li>
              <li>• <strong>Energieersparnis:</strong> Weniger Broadcast-Verkehr = weniger Last</li>
            </ul>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <h4 className="text-base font-semibold text-white mb-2">⚙️ Technische Umsetzung:</h4>
            <ul className="text-sm text-slate-300 space-y-1">
              <li>• Benötigt einen <strong>Layer 3 Switch</strong> oder <strong>Managed Switch</strong></li>
              <li>• <strong>802.1Q</strong> Standard für VLAN-Tagging (4 Bytes im Ethernet-Frame)</li>
              <li>• <strong>VLAN 1</strong> ist das Standard-VLAN (wird oft geändert)</li>
              <li>• Inter-VLAN-Routing über den Layer 3 Switch oder Router</li>
            </ul>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-yellow-400 mb-2">🏭 Praxisbeispiel:</h4>
            <p className="text-sm text-slate-300">
              In einer Fabrik werden Produktionslinien softwarebasiert voneinander abgekapselt.
              VLAN 10 = Verwaltung, VLAN 20 = Produktion, VLAN 30 = Gäste-WLAN.
              Jedes VLAN hat eigene Sicherheitsregeln und IP-Bereiche.
            </p>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-blue-400 mb-2">💡 IHK-Tipps:</h4>
            <ul className="text-sm text-slate-300 space-y-1">
              <li>• VLAN = <strong>Layer 2</strong> (Data Link) — nicht Layer 3!</li>
              <li>• <strong>802.1Q</strong> = Standard für VLAN-Tagging</li>
              <li>• <strong>Access Port</strong> = für Endgeräte (1 VLAN), <strong>Trunk Port</strong> = für Switch-Verbindungen (mehrere VLANs)</li>
              <li>• VLANs reduzieren die <strong>Kollisionsdomäne</strong> nicht — nur die <strong>Broadcast-Domäne</strong></li>
              <li>• <strong>Layer 3 Switch</strong> = Switch mit Routing-Funktion für Inter-VLAN-Routing</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
