// ============================================================================
// Flashcard-Daten — Generiert aus Lektionsinhalten
// ============================================================================

import { Flashcard } from "./flashcards";

// ─── Netzwerktechnik ────────────────────────────────────────────────────────

export const netzwerkFlashcards: Flashcard[] = [
  // OSI-Modell
  { id: "nw-os-1", moduleId: "ihk-netzwerk", front: "Wie viele Schichten hat das OSI-Modell?", back: "7 Schichten", hint: "Merksatz: Alle Priester Essen Tafelschokolade Am Palmsonntag", category: "OSI" },
  { id: "nw-os-2", moduleId: "ihk-netzwerk", front: "Was ist die PDU auf Schicht 4 (Transport)?", back: "Segmente", hint: "TCP/UDP arbeiten hier", category: "OSI" },
  { id: "nw-os-3", moduleId: "ihk-netzwerk", front: "Auf welcher OSI-Schicht arbeitet ein Router?", back: "Schicht 3 — Netzwerk", hint: "IP-Adressen", category: "OSI" },
  { id: "nw-os-4", moduleId: "ihk-netzwerk", front: "Auf welcher OSI-Schicht arbeitet ein Switch?", back: "Schicht 2 — Sicherung", hint: "MAC-Adressen", category: "OSI" },
  { id: "nw-os-5", moduleId: "ihk-netzwerk", front: "Was macht Schicht 6 (Präsentation)?", back: "Datenformat, Verschlüsselung (SSL/TLS, ASCII, JPEG)", category: "OSI" },

  // TCP/IP
  { id: "nw-tcp-1", moduleId: "ihk-netzwerk", front: "Was ist der Unterschied zwischen TCP und UDP?", back: "TCP = verbindungsorientiert, zuverlässig. UDP = verbindungslos, schnell, ohne Garantie.", category: "TCP/IP" },
  { id: "nw-tcp-2", moduleId: "ihk-netzwerk", front: "Wie lautet der TCP 3-Wege-Handshake?", back: "SYN → SYN-ACK → ACK", category: "TCP/IP" },
  { id: "nw-tcp-3", moduleId: "ihk-netzwerk", front: "Welchen Port nutzt HTTPS?", back: "Port 443", hint: "HTTP=80, SSH=22, SMTP=25, DNS=53", category: "TCP/IP" },

  // IPv4
  { id: "nw-ip-1", moduleId: "ihk-netzwerk", front: "Welche IP-Bereiche sind privat (RFC 1918)?", back: "10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16", category: "IPv4" },
  { id: "nw-ip-2", moduleId: "ihk-netzwerk", front: "Was ist die Broadcast-Adresse?", back: "Letzte Adresse im Subnetz (alle Host-Bits = 1)", category: "IPv4" },

  // Subnetting
  { id: "nw-sub-1", moduleId: "ihk-netzwerk", front: "Formel für nutzbare Hosts?", back: "2^h - 2 (h = Host-Bits)", hint: "-2 für Netzwerk- und Broadcast-Adresse", category: "Subnetting" },
  { id: "nw-sub-2", moduleId: "ihk-netzwerk", front: "Was ergibt die AND-Verknüpfung von IP und Maske?", back: "Die Netzwerkadresse", category: "Subnetting" },
  { id: "nw-sub-3", moduleId: "ihk-netzwerk", front: "Wie viele Hosts hat ein /26 Netz?", back: "62 (2^6 - 2)", category: "Subnetting" },
  { id: "nw-sub-4", moduleId: "ihk-netzwerk", front: "Was ist VLSM?", back: "Variable Length Subnet Mask — verschiedene Subnetze mit verschiedenen Präfixlängen", category: "Subnetting" },
  { id: "nw-sub-5", moduleId: "ihk-netzwerk", front: "Brauche 500 Hosts — welche CIDR-Notation?", back: "/23 (2^9 - 2 = 510 Hosts)", category: "Subnetting" },

  // IPv6
  { id: "nw-ipv6-1", moduleId: "ihk-netzwerk", front: "Wie viele Bit hat eine IPv6-Adresse?", back: "128 Bit", hint: "IPv4 hat 32 Bit", category: "IPv6" },
  { id: "nw-ipv6-2", moduleId: "ihk-netzwerk", front: "Was ist die IPv6 Loopback-Adresse?", back: "::1", category: "IPv6" },
  { id: "nw-ipv6-3", moduleId: "ihk-netzwerk", front: "Was ist Dual Stack?", back: "IPv4 und IPv6 gleichzeitig auf einem Host", category: "IPv6" },

  // Netzwerkgeräte
  { id: "nw-dev-1", moduleId: "ihk-netzwerk", front: "Was trennt ein Router?", back: "Broadcast-Domänen", hint: "Switch trennt nur Kollisionsdomänen", category: "Geräte" },
  { id: "nw-dev-2", moduleId: "ihk-netzwerk", front: "Was lernt ein Switch?", back: "MAC-Adressen (CAM-Tabelle)", category: "Geräte" },

  // Protokolle
  { id: "nw-proto-1", moduleId: "ihk-netzwerk", front: "Was macht DNS?", back: "Übersetzt Domainnamen in IP-Adressen", category: "Protokolle" },
  { id: "nw-proto-2", moduleId: "ihk-netzwerk", front: "Was bedeutet DHCP DORA?", back: "Discover → Offer → Request → Acknowledge", category: "Protokolle" },
  { id: "nw-proto-3", moduleId: "ihk-netzwerk", front: "IMAP vs POP3?", back: "IMAP belässt E-Mails auf dem Server (Multi-Device). POP3 lädt herunter.", category: "Protokolle" },

  // WLAN
  { id: "nw-wlan-1", moduleId: "ihk-netzwerk", front: "Welcher WLAN-Standard ist aktuell am schnellsten?", back: "802.11ax (Wi-Fi 6) — bis 9,6 Gbit/s", category: "WLAN" },
  { id: "nw-wlan-2", moduleId: "ihk-netzwerk", front: "Welches WLAN-Sicherheitsprotokoll ist am sichersten?", back: "WPA3", category: "WLAN" },

  // Sicherheit
  { id: "nw-sec-1", moduleId: "ihk-netzwerk", front: "IDS vs IPS?", back: "IDS = nur Erkennung (passiv). IPS = Erkennung + Blockierung (aktiv).", category: "Sicherheit" },
  { id: "nw-sec-2", moduleId: "ihk-netzwerk", front: "Was steht in einer DMZ?", back: "Öffentlich erreichbare Server (Web, Mail) — zwischen Internet und internem Netz", category: "Sicherheit" },

  // Kabel
  { id: "nw-cab-1", moduleId: "ihk-netzwerk", front: "Maximale Segmentlänge bei Twisted Pair?", back: "100 Meter", category: "Kabel" },
  { id: "nw-cab-2", moduleId: "ihk-netzwerk", front: "Welches Kabel für 10 Gbit/s über 100m?", back: "Cat 6a", hint: "Cat 6 schafft 10 Gbit/s nur auf 55m", category: "Kabel" },

  // Tools
  { id: "nw-tool-1", moduleId: "ihk-netzwerk", front: "Was zeigt traceroute?", back: "Hop-by-Hop den Netzwerkweg zum Ziel mit Latenz pro Router", category: "Tools" },
  { id: "nw-tool-2", moduleId: "ihk-netzwerk", front: "Was kann Wireshark?", back: "Vollständige Netzwerkpaket-Analyse", category: "Tools" },
];

// ─── Programmieren (React) ──────────────────────────────────────────────────

export const reactFlashcards: Flashcard[] = [
  { id: "re-1", moduleId: "react-grundlagen", front: "Was ist React?", back: "Eine JavaScript-Bibliothek für Benutzeroberflächen von Meta", category: "Grundlagen" },
  { id: "re-2", moduleId: "react-grundlagen", front: "Was sind Props?", back: "Daten die von Eltern-Komponenten an Kinder übergeben werden (read-only)", category: "Grundlagen" },
  { id: "re-3", moduleId: "react-grundlagen", front: "Was ist State?", back: "Interner Zustand einer Komponente, verwaltet mit useState()", category: "Hooks" },
  { id: "re-4", moduleId: "react-grundlagen", front: "Wann wird useEffect ausgeführt?", back: "Nach dem Rendern. Mit Dependency-Array: nur bei Änderungen der Dependencies.", category: "Hooks" },
  { id: "re-5", moduleId: "react-grundlagen", front: "Was gibt useState zurück?", back: "[currentState, setterFunction]", category: "Hooks" },
];

// ─── TypeScript ─────────────────────────────────────────────────────────────

export const typescriptFlashcards: Flashcard[] = [
  { id: "ts-1", moduleId: "typescript-basics", front: "Was ist der Unterschied zwischen type und interface?", back: "interface: erweiterbar, mergebar. type: Union-Types, mapped types, nicht erweiterbar.", category: "Grundlagen" },
  { id: "ts-2", moduleId: "typescript-basics", front: "Was ist ein Generic?", back: "Ein Typ-Parameter der bei Verwendung festgelegt wird: Array<T>, function id<T>(arg: T): T", category: "Generics" },
  { id: "ts-3", moduleId: "typescript-basics", front: "Was macht 'unknown'?", back: "Type-safe any — muss erst geprüft/gecastet werden bevor Nutzung", category: "Typen" },
  { id: "ts-4", moduleId: "typescript-basics", front: "Was ist ein Union Type?", back: "type ID = string | number — kann einer von beiden sein", category: "Typen" },
];

// ─── IHK Diagramme ─────────────────────────────────────────────────────────

export const ihkFlashcards: Flashcard[] = [
  { id: "ihk-1", moduleId: "ihk-diagramme", front: "Was zeigt ein PAP (Programmablaufplan)?", back: "Die logische Struktur eines Programms mit Start/Ende, Verzweigungen, Schleifen", category: "PAP" },
  { id: "ihk-2", moduleId: "ihk-diagramme", front: "Was ist ein Struktogramm (Nassi-Shneiderman)?", back: "Grafische Darstellung der Programmstruktur mit verschachtelten Blöcken", category: "Struktogramm" },
  { id: "ihk-3", moduleId: "ihk-diagramme", front: "Bubblesort — worst case Komplexität?", back: "O(n²)", category: "Sortierung" },
  { id: "ihk-4", moduleId: "ihk-diagramme", front: "Was zeigt eine EPK?", back: "Ereignisgesteuerte Prozesskette — Geschäftsprozesse mit Ereignissen und Funktionen", category: "EPK" },
  { id: "ihk-5", moduleId: "ihk-diagramme", front: "Was ist ein ER-Modell?", back: "Entity-Relationship-Modell — Datenbankstruktur mit Entitäten und Beziehungen", category: "ER" },
];

// ─── Alle Flashcards zusammen ───────────────────────────────────────────────

export const allFlashcards: Flashcard[] = [
  ...netzwerkFlashcards,
  ...reactFlashcards,
  ...typescriptFlashcards,
  ...ihkFlashcards,
];

export function getFlashcardsForModule(moduleId: string): Flashcard[] {
  return allFlashcards.filter((c) => c.moduleId === moduleId);
}
