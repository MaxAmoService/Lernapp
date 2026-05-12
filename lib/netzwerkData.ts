import { Module, QuizQuestion } from "./types";

// ============================================================================
// IHK "Netzwerktechnik" — Modul-Daten
// Quelle: IHK IT-Handbuch + AP1/AP2 Prüfungsthemen
// ============================================================================

export interface Flashcard {
  id: string;
  topic: string;
  front: string;
  back: string;
  hint?: string;
}

export const netzwerkFlashcards: Flashcard[] = [
  // ==========================================================================
  // OSI-MODELL
  // ==========================================================================
  { id: "fc-osi-1", topic: "OSI-Modell", front: "Wie viele Schichten hat das OSI-Referenzmodell und wer hat es entwickelt?", back: "7 Schichten, entwickelt von der ISO (International Organization for Standardization). Es beschreibt die Kommunikation in Netzwerken schichtweise.", hint: "ISO → OSI" },
  { id: "fc-osi-2", topic: "OSI-Modell", front: "Nenne alle 7 Schichten des OSI-Modells von unten nach oben.", back: "1. Physikalisch (Bits übertragen)\n2. Sicherung/Datensicherung (Frames, MAC)\n3. Netzwerk (Pakete, IP)\n4. Transport (End-to-End, TCP/UDP)\n5. Sitzung (Session-Management)\n6. Präsentation (Datenformat, Verschlüsselung)\n7. Anwendung (Benutzerschnittstelle)", hint: "Merksatz: Alle Priester Essen Tafelschokolade Am Palmsonntag" },
  { id: "fc-osi-3", topic: "OSI-Modell", front: "Welche PDU (Protocol Data Unit) gehört zu welcher OSI-Schicht?", back: "Schicht 1: Bits\nSchicht 2: Frames\nSchicht 3: Pakete\nSchicht 4: Segmente (TCP) / Datagramme (UDP)\nSchicht 5-7: Daten", hint: "B-F-P-S-D" },
  { id: "fc-osi-4", topic: "OSI-Modell", front: "Welche Geräte arbeiten auf welchen OSI-Schichten?", back: "Schicht 1: Hub, Repeater, Kabel\nSchicht 2: Switch, Bridge, WLAN-AP\nSchicht 3: Router\nSchicht 4-7: Firewall, Proxy, Load Balancer", hint: "Switch = MAC = Schicht 2, Router = IP = Schicht 3" },
  { id: "fc-osi-5", topic: "OSI-Modell", front: "Was ist der Unterschied zwischen OSI und TCP/IP?", back: "OSI: 7 Schichten, theoretisches Referenzmodell\nTCP/IP: 4 Schichten, praktisches Modell (das Internet nutzt TCP/IP)\n\nTCP/IP kombiniert OSI-Schichten 5-7 zu einer Anwendungsschicht.", hint: "TCP/IP = das was wirklich genutzt wird" },
  { id: "fc-osi-6", topic: "OSI-Modell", front: "Was passiert bei der Datenkapselung?", back: "Jede Schicht fügt ihren eigenen Header (und manchmal Trailer) hinzu:\nAnwendung → Daten\nTransport → Header + Daten = Segment\nNetzwerk → Header + Segment = Paket\nSicherung → Header + Paket + Trailer = Frame\nPhysikalisch → Bits\n\nBeim Empfänger wird es umgekehrt entkapselt.", hint: "Wie eine Zwiebel — jede Schicht eine neue Schale" },

  // ==========================================================================
  // TCP/IP-MODELL
  // ==========================================================================
  { id: "fc-tcp-1", topic: "TCP/IP-Modell", front: "Welche 4 Schichten hat das TCP/IP-Modell?", back: "1. Netzwerkzugang (Netzwerkschnittstelle)\n2. Internet (Internetworking)\n3. Transport (End-to-End)\n4. Anwendung", hint: "Netz-Int-Trans-Anw" },
  { id: "fc-tcp-2", topic: "TCP/IP-Modell", front: "Was ist der Unterschied zwischen TCP und UDP?", back: "TCP: Verbindungsorientiert, zuverlässig (3-Wege-Handshake), langsam, HTTP/FTP/SMTP\nUDP: Verbindungslos, unzuverlässig (keine Bestätigung), schnell, DNS/DHCP/Streaming", hint: "TCP = Brief mit Empfangsbestätigung, UDP = Postkarte" },
  { id: "fc-tcp-3", topic: "TCP/IP-Modell", front: "Erkläre den TCP 3-Wege-Handshake.", back: "1. SYN: Client sendet Synchronisierungs-Anfrage\n2. SYN-ACK: Server bestätigt und synchronisiert zurück\n3. ACK: Client bestätigt → Verbindung steht\n\nDanach: Datenübertragung → FIN zum Beenden.", hint: "SYN → SYN-ACK → ACK" },
  { id: "fc-tcp-4", topic: "TCP/IP-Modell", front: "Welche Ports sind Well-Known Ports (0-1023)? Nenne die wichtigsten.", back: "20/21: FTP (Daten/Steuerung)\n22: SSH\n23: Telnet\n25: SMTP\n53: DNS\n67/68: DHCP\n80: HTTP\n110: POP3\n143: IMAP\n443: HTTPS\n993: IMAPS\n995: POP3S", hint: "80=HTTP, 443=HTTPS, 22=SSH — die merkt man sich zuerst" },
  { id: "fc-tcp-5", topic: "TCP/IP-Modell", front: "Was sind die 3 IP-Adresstypen (Unicast, Broadcast, Multicast)?", back: "Unicast: 1 Sender → 1 Empfänger (z.B. 192.168.1.5)\nBroadcast: 1 Sender → alle im Netzwerk (z.B. 192.168.1.255)\nMulticast: 1 Sender → ausgewählte Gruppe (z.B. 224.0.0.x)", hint: "Uni=1, Broad=alle, Multi=Gruppe" },

  // ==========================================================================
  // IPv4-ADRESSIERUNG
  // ==========================================================================
  { id: "fc-ipv4-1", topic: "IPv4", front: "Wie ist eine IPv4-Adresse aufgebaut?", back: "32 Bit, in 4 Oktetten à 8 Bit, dezimal mit Punkten getrennt.\nBeispiel: 192.168.1.1\nBinär: 11000000.10101000.00000001.00000001\n\nJedes Oktett: 0-255 (2^8 = 256 Werte)", hint: "4 × 8 Bit = 32 Bit" },
  { id: "fc-ipv4-2", topic: "IPv4", front: "Nenne die 5 IP-Klassen (A-E) mit ihren Bereichen und Standard-Subnetzmasken.", back: "Klasse A: 1.0.0.0 – 126.255.255.255 (/8 → 255.0.0.0)\nKlasse B: 128.0.0.0 – 191.255.255.255 (/16 → 255.255.0.0)\nKlasse C: 192.0.0.0 – 223.255.255.255 (/24 → 255.255.255.0)\nKlasse D: 224.0.0.0 – 239.255.255.255 (Multicast)\nKlasse E: 240.0.0.0 – 255.255.255.255 (Reserviert)", hint: "A=1-126, B=128-191, C=192-223" },
  { id: "fc-ipv4-3", topic: "IPv4", front: "Welche IP-Adressbereiche sind privat (RFC 1918)?", back: "Klasse A: 10.0.0.0 – 10.255.255.255 (/8)\nKlasse B: 172.16.0.0 – 172.31.255.255 (/12)\nKlasse C: 192.168.0.0 – 192.168.255.255 (/16)\n\nDiese Adressen sind NICHT im Internet routbar — nur für lokale Netzwerke.", hint: "10.x, 172.16-31.x, 192.168.x" },
  { id: "fc-ipv4-4", topic: "IPv4", front: "Was ist der Unterschied zwischen Netzwerkadresse und Broadcast-Adresse?", back: "Netzwerkadresse: Erste Adresse im Subnetz — identifiziert das Netzwerk selbst (Host-Bits alle 0)\nBroadcast-Adresse: Letzte Adresse — erreicht alle Hosts im Netzwerk (Host-Bits alle 1)\n\nBeispiel /24: 192.168.1.0 (Netzwerk) bis 192.168.1.255 (Broadcast)\nNutzbare Hosts: 192.168.1.1 bis 192.168.1.254", hint: "Netz=...0, Broadcast=...255 bei /24" },
  { id: "fc-ipv4-5", topic: "IPv4", front: "Wie viele nutzbare Hosts gibt es in einem Subnetz mit /26?", back: "/26 = 6 Host-Bits → 2^6 - 2 = 62 nutzbare Hosts\nDie -2 kommen von Netzwerkadresse (alle Host-Bits 0) und Broadcast-Adresse (alle Host-Bits 1).\n\nSubnetzmaske: 255.255.255.192", hint: "Formel: 2^Hostbits - 2" },

  // ==========================================================================
  // SUBNETTING
  // ==========================================================================
  { id: "fc-sub-1", topic: "Subnetting", front: "Was ist CIDR-Notation und wie liest man sie?", back: "CIDR = Classless Inter-Domain Routing\nNotation: IP-Adresse/Präfixlänge\nBeispiel: 192.168.1.0/24\n\nDie Zahl nach dem / gibt an, wie viele Bits für die Netzwerkadresse reserviert sind.\n/24 = 24 Bits Netzwerk, 8 Bits Host = 255.255.255.0", hint: "/24 = letztes Oktett frei = 254 Hosts" },
  { id: "fc-sub-2", topic: "Subnetting", front: "Erkläre die Subnetting-Formeln.", back: "Anzahl Subnetze: 2^s (s = entliehene Host-Bits)\nAnzahl Hosts pro Subnetz: 2^h - 2 (h = verbleibende Host-Bits)\nSubnetzmaske: Erstelle Binär mit Präfixlänge an 1en, Rest 0en\n\nBeispiel: 192.168.1.0/26 → 2^2 = 4 Subnetze, 2^6 - 2 = 62 Hosts", hint: "Hosts IMMER -2 (Netz + Broadcast)" },
  { id: "fc-sub-3", topic: "Subnetting", front: "Wie berechnet man die Netzwerkadresse einer IP mit gegebener Subnetzmaske?", back: "Bitweise UND-Verknüpfung (AND) von IP und Subnetzmaske.\n\nIP:    192.168.1.130 = 11000000.10101000.00000001.10000010\nMaske: 255.255.255.192 = 11111111.11111111.11111111.11000000\nErgebnis (AND):       11000000.10101000.00000001.10000000 = 192.168.1.128", hint: "AND: 1 UND 1 = 1, sonst 0" },
  { id: "fc-sub-4", topic: "Subnetting", front: "Ein Netzwerk hat 500 Hosts. Welche Subnetzmaske braucht man mindestens?", back: "500 Hosts → 2^h - 2 ≥ 500 → h ≥ 9 (2^9 - 2 = 510)\n→ 9 Host-Bits → 32 - 9 = 23 → /23\nSubnetzmaske: 255.255.254.0\nNetzwerk: 510 nutzbare Hosts", hint: "Nächste Zweierpotenz über 500+2 = 502 → 512 = 2^9" },
  { id: "fc-sub-5", topic: "Subnetting", front: "Was ist VLSM und warum ist es wichtig?", back: "VLSM = Variable Length Subnet Mask\nVerschiedene Subnetze können verschiedene Präfixlängen haben.\n\nVorteil: Keine IP-Adress-Verschwendung!\nBeispiel: Eine Abteilung mit 100 Hosts bekommt /25 (126 Hosts), eine mit 10 Hosts bekommt /28 (14 Hosts).", hint: "VLSM = maßgeschneiderte Subnetze" },

  // ==========================================================================
  // IPv6
  // ==========================================================================
  { id: "fc-ipv6-1", topic: "IPv6", front: "Wie ist eine IPv6-Adresse aufgebaut?", back: "128 Bit, in 8 Gruppen à 16 Bit, hexadezimal mit Doppelpunkten getrennt.\nBeispiel: 2001:0db8:85a3:0000:0000:8a2e:0370:7334\n\nVereinfachung: Führende Nullen weglassen, aufeinanderfolgende 0-Gruppen durch :: ersetzen (nur einmal!).", hint: "128 Bit = 8 × 16 Bit" },
  { id: "fc-ipv6-2", topic: "IPv6", front: "Was sind die wichtigsten IPv6-Adresstypen?", back: "Unicast:\n- Link-Local: fe80::/10 (nur lokales Netzwerk)\n- Global Unicast: 2000::/3 (öffentlich, routbar)\n- Loopback: ::1 (eigener Host)\n\nMulticast: ff00::/8\nAnycast: Wie Unicast, aber mehrere Hosts teilen eine Adresse", hint: "fe80 = lokal, 2000 = global, ::1 = localhost" },
  { id: "fc-ipv6-3", topic: "IPv6", front: "Was sind Dual Stack und Tunneling?", back: "Dual Stack: Host hat gleichzeitig IPv4 UND IPv6 — beide Protokolle parallel\nTunneling: IPv6-Pakete werden in IPv4-Pakete verpackt (z.B. 6to4, Teredo)\nNAT64: Übersetzt IPv6 → IPv4\n\nDual Stack ist die bevorzugte Übergangslösung.", hint: "Dual Stack = beide gleichzeitig" },
  { id: "fc-ipv6-4", topic: "IPv6", front: "Warum wurde IPv6 eingeführt?", back: "IPv4 hat nur ~4,3 Milliarden Adressen (2^32) — das ist zu wenig.\nIPv6 hat 2^128 ≈ 3,4 × 10^38 Adressen — genug für jedes Gerät der Welt.\n\nZusätzlich: Kein NAT nötig, vereinfachtes Header-Format, eingebaute Sicherheit (IPsec), autoconfiguration.", hint: "IPv4 = 32 Bit, IPv6 = 128 Bit" },

  // ==========================================================================
  // NETZWERKGERÄTE
  // ==========================================================================
  { id: "fc-geraet-1", topic: "Netzwerkgeräte", front: "Was ist der Unterschied zwischen Hub und Switch?", back: "Hub (Schicht 1): Sendet empfangene Daten an ALLE Ports — kein Filtering, Kollisionen möglich.\nSwitch (Schicht 2): Lernt MAC-Adressen (CAM-Tabelle), sendet Daten NUR an den Zielport — effizient, weniger Kollisionen.", hint: "Switch ist der moderne Hub — intelligentes Filtering" },
  { id: "fc-geraet-2", topic: "Netzwerkgeräte", front: "Was macht ein Router?", back: "Router (Schicht 3): Verbindet verschiedene Netzwerke miteinander.\n- Weist IP-Adressen zu (DHCP)\n- Findet beste Route (Routing-Protokolle wie OSPF, BGP)\n- Trennt Broadcast-Domänen\n- NAT für Internetzugang", hint: "Router = Netzwerk-Verbindner, IP-basiert" },
  { id: "fc-geraet-3", topic: "Netzwerkgeräte", front: "Was ist der Unterschied zwischen Switch und Bridge?", back: "Beide arbeiten auf Schicht 2 (MAC-Adressen).\nBridge: Wenige Ports (2-4), softwarebasiert, langsam\nSwitch: Viele Ports (8-48+), hardwarebasiert (ASIC), schnell, jeder Port eigene Kollisionsdomäne\n\nSwitch = moderne, leistungsfähige Bridge.", hint: "Switch = Bridge auf Steroiden" },
  { id: "fc-geraet-4", topic: "Netzwerkgeräte", front: "Was ist ein Access Point (AP)?", back: "Ein Access Point verbindet kabellose Geräte (WLAN) mit dem kabelgebundenen Netzwerk.\n- Arbeitet auf Schicht 2 (wie ein Wireless-Switch)\n- BSSID = MAC-Adresse des AP\n- SSID = Name des WLAN-Netzwerks\n- Kann mehrere SSIDs gleichzeitig bedienen (Virtual APs)", hint: "AP = WLAN-Brücke zum kabelgebundenen Netz" },
  { id: "fc-geraet-5", topic: "Netzwerkgeräte", front: "Was ist der Unterschied zwischen Stateful und Stateless Firewall?", back: "Stateless: Prüft jedes Paket einzeln anhand von Regeln (Quell-IP, Ziel-IP, Port). Schnell aber ungenau.\nStateful: Merkt sich den Verbindungsstatus (State Table). Erkennt ob ein Paket zu einer bestehenden Verbindung gehört. Sicherer.", hint: "Stateful = kennt den Kontext, Stateless = nur Regeln" },

  // ==========================================================================
  // NETZWERKTOPOLOGIEN
  // ==========================================================================
  { id: "fc-topo-1", topic: "Topologien", front: "Nenne die 5 wichtigsten Netzwerktopologien.", back: "1. Bus: Alle an einem Kabel (veraltet)\n2. Ring: Jeder mit Nachbarn verbunden (Token Ring)\n3. Stern: Alle zentral an Switch/Hub (Standard heute)\n4. Mesh: Jeder mit jedem verbunden (vollständig oder partiell)\n5. Baum: Hierarchische Stern-Struktur (VLANs)", hint: "Stern ist der heutige Standard" },
  { id: "fc-topo-2", topic: "Topologien", front: "Was sind Vor- und Nachteile der Stern-Topologie?", back: "Vorteile:\n✅ Einzelner Ausfall不影响其他\n✅ Einfache Fehlersuche\n✅ Leicht erweiterbar\n✅ Hohe Performance\n\nNachteile:\n❌ Zentraler Switch = Single Point of Failure\n❌ Mehr Kabel nötig als Bus/Ring\n❌ Switch-Kosten", hint: "Stern = Standard-LAN heute" },
  { id: "fc-topo-3", topic: "Topologien", front: "Was ist ein Single Point of Failure (SPoF)?", back: "Ein Knotenpunkt dessen Ausfall das gesamte Netzwerk lahmlegt.\n\nBeispiele:\n- Zentraler Switch in Stern-Topologie\n- Gateway/Router zum Internet\n- DNS-Server\n\nGegenmaßnahme: Redundanz (Backup-Geräte, mehrere Pfade).", hint: "SPoF = Achillesferse des Netzwerks" },

  // ==========================================================================
  // PROTOKOLLE
  // ==========================================================================
  { id: "fc-proto-1", topic: "Protokolle", front: "Was macht DNS und wie funktioniert es?", back: "DNS = Domain Name System: Übersetzt Domainnamen in IP-Adressen.\n\nAblauf: Client → Resolver → Root-Server → TLD-Server → Autoritativer Server → IP-Adresse\n\nWichtige Records: A (IPv4), AAAA (IPv6), MX (Mail), CNAME (Alias), NS (Nameserver)", hint: "DNS = Telefonbuch des Internets" },
  { id: "fc-proto-2", topic: "Protokolle", front: "Was macht DHCP?", back: "DHCP = Dynamic Host Configuration Protocol:\nWeist automatisch IP-Adressen zu.\n\nDORA-Prozess:\n1. Discover: Client sucht DHCP-Server (Broadcast)\n2. Offer: Server bietet IP an\n3. Request: Client nimmt Angebot an\n4. Acknowledge: Server bestätigt Zuweisung\n\nVermietet IP-Adressen zeitlich begrenzt (Lease Time).", hint: "DORA = Discover, Offer, Request, Acknowledge" },
  { id: "fc-proto-3", topic: "Protokolle", front: "Was ist der Unterschied zwischen HTTP und HTTPS?", back: "HTTP: Unverschlüsselt, Port 80, Daten im Klartext\nHTTPS: Verschlüsselt via TLS/SSL, Port 443, Zertifikat nötig\n\nHTTPS = HTTP + TLS\nSchützt vor: Man-in-the-Middle, Abhören, Manipulation\n\nIn der IHK: IMMER HTTPS empfehlen!", hint: "S = Secure = TLS-Verschlüsselung" },
  { id: "fc-proto-4", topic: "Protokolle", front: "Was macht ARP und wie funktioniert es?", back: "ARP = Address Resolution Protocol: Findet MAC-Adresse zu einer IP-Adresse.\n\n1. Client sendet ARP-Request (Broadcast): 'Wer hat 192.168.1.1?'\n2. Besitzer antwortet (Unicast): 'Ich! MAC: AA:BB:CC:DD:EE:FF'\n3. Ergebnis wird im ARP-Cache gespeichert.\n\nOhne ARP kein Ethernet — MAC wird für Schicht 2 benötigt.", hint: "ARP = IP → MAC Übersetzer" },
  { id: "fc-proto-5", topic: "Protokolle", front: "Was ist der Unterschied zwischen SMTP, IMAP und POP3?", back: "SMTP (Port 25/587): E-Mails SENDEN\nIMAP (Port 143/993): E-Mails EMPFANGEN — bleibt auf Server, synchronisiert\nPOP3 (Port 110/995): E-Mails EMPFANGEN — lädt herunter, löscht vom Server\n\nEmpfehlung: IMAP — von mehreren Geräten zugreifbar.", hint: "SMTP=senden, IMAP=lesen+bleibt, POP3=lesen+download" },
  { id: "fc-proto-6", topic: "Protokolle", front: "Was macht SSH und warum ist es besser als Telnet?", back: "SSH (Port 22): Verschlüsselte Fernverbindung zu Servern\nTelnet (Port 23): Unverschlüsselte Fernverbindung\n\nSSH verschlüsselt alles (Login, Befehle, Daten). Telnet sendet im Klartext.\nIn der IHK: IMMER SSH statt Telnet empfehlen!", hint: "SSH = sicheres Telnet" },
  { id: "fc-proto-7", topic: "Protokolle", front: "Was ist FTP und welche Ports nutzt es?", back: "FTP = File Transfer Protocol: Dateiübertragung zwischen Client und Server.\n\nPort 20: Daten-Verbindung\nPort 21: Steuerungs-Verbindung\n\nVarianten:\n- FTPS: FTP + TLS-Verschlüsselung\n- SFTP: SSH-basiert (Port 22) — besser!\n\nProblem: FTP überträgt unverschlüsselt (Passwörter im Klartext).", hint: "21=Befehle, 20=Daten, SFTP=besser" },
  { id: "fc-proto-8", topic: "Protokolle", front: "Was macht ICMP?", back: "ICMP = Internet Control Message Protocol:\nDiagnose- und Fehlermeldungsprotokoll.\n\nAnwendungen:\n- ping: Prüft Erreichbarkeit (Echo Request/Reply)\n- traceroute: Findet den Weg zum Ziel\n\nICMP ist KEIN Transportprotokoll — es transportiert keine Nutzdaten.", hint: "ping nutzt ICMP" },

  // ==========================================================================
  // WLAN
  // ==========================================================================
  { id: "fc-wlan-1", topic: "WLAN", front: "Nenne die wichtigsten IEEE 802.11 Standards.", back: "802.11b: 11 Mbit/s, 2,4 GHz (1999)\n802.11a: 54 Mbit/s, 5 GHz (1999)\n802.11g: 54 Mbit/s, 2,4 GHz (2003)\n802.11n (Wi-Fi 4): 600 Mbit/s, 2,4+5 GHz, MIMO (2009)\n802.11ac (Wi-Fi 5): 6,9 Gbit/s, 5 GHz, MU-MIMO (2013)\n802.11ax (Wi-Fi 6): 9,6 Gbit/s, 2,4+5 GHz, OFDMA (2019)", hint: "Merke: b→g→n→ac→ax = schneller + neuer" },
  { id: "fc-wlan-2", topic: "WLAN", front: "Was ist der Unterschied zwischen 2,4 GHz und 5 GHz?", back: "2,4 GHz: Weiter Reichweite, besser durch Wände, aber stärker gestört (Mikrowelle, Bluetooth)\n5 GHz: Kürzere Reichweite, weniger Störung, mehr Kanäle, höhere Geschwindigkeit\n\n2,4 GHz: 13 Kanäle (davon 3 nicht überlappend: 1, 6, 11)\n5 GHz: Bis zu 25 Kanäle", hint: "2,4 = Reichweite, 5 = Speed" },
  { id: "fc-wlan-3", topic: "WLAN", front: "Nenne die WLAN-Sicherheitsstandards von unsicher bis sicher.", back: "WEP (veraltet!): RC4-Verschlüsselung, leicht knackbar\nWPA: TKIP, besser als WEP, aber Schwächen\nWPA2: AES-CCMP, aktueller Standard, sicher\nWPA3: SAE (Simultaneous Authentication of Equals), Schutz gegen Brute-Force\n\nIn der IHK: IMMER mindestens WPA2, besser WPA3!", hint: "WEP < WPA < WPA2 < WPA3" },
  { id: "fc-wlan-4", topic: "WLAN", front: "Was ist der Unterschied zwischen WPA2-Personal und WPA2-Enterprise?", back: "WPA2-Personal (PSK): Ein gemeinsames Passwort (Pre-Shared Key) für alle. Für Heimnetzwerke.\nWPA2-Enterprise (802.1X): Individuelle Anmeldung via RADIUS-Server, Zertifikate. Für Unternehmen.\n\nEnterprise = pro Benutzer ein Login, zentral verwaltbar.", hint: "Personal = 1 Passwort, Enterprise = pro User Login" },

  // ==========================================================================
  // NETZWERKSICHERHEIT
  // ==========================================================================
  { id: "fc-sicher-1", topic: "Netzwerksicherheit", front: "Was ist ein VLAN und warum wird es verwendet?", back: "VLAN = Virtual Local Area Network:\nLogische Unterteilung eines physischen Switches in separate Broadcast-Domänen.\n\nVorteile:\n✅ Sicherheit: Abteilungen getrennt\n✅ Performance: Weniger Broadcast-Traffic\n✅ Flexibilität: Kein physikalisches Umverkabeln\n\nTagged/Untagged Ports, VLAN-ID (1-4094).", hint: "VLAN = logische Netzwerk-Trennung" },
  { id: "fc-sicher-2", topic: "Netzwerksicherheit", front: "Was ist ein VPN und welche Typen gibt es?", back: "VPN = Virtual Private Network: Verschlüsselte Verbindung über öffentliche Netzwerke.\n\nTypen:\n- Site-to-Site: Verbindet zwei Netzwerke (Standort ↔ Standort)\n- Remote Access: Einzelner Client ins Firmennetzwerk\n- SSL/TLS-VPN: Über den Browser (z.B. OpenVPN)\n- IPSec: Auf Netzwerkschicht, sehr sicher", hint: "VPN = sicherer Tunnel durchs Internet" },
  { id: "fc-sicher-3", topic: "Netzwerksicherheit", front: "Was ist eine DMZ?", back: "DMZ = Demilitarisierte Zone:\nNetzwerksegment zwischen Internem und Internet.\n\nEnthält öffentliche Server (Webserver, Mailserver).\nDurch 2 Firewalls geschützt:\n- Außen-Firewall: Internet → DMZ erlaubt\n- Innen-Firewall: DMZ → Internes NICHT erlaubt (nur bestimmte Ports)", hint: "DMZ = Pufferzone zwischen Internet und internem Netz" },
  { id: "fc-sicher-4", topic: "Netzwerksicherheit", front: "Was ist ein IDS und ein IPS?", back: "IDS = Intrusion Detection System: Erkennt Angriffe, meldet sie (passiv).\nIPS = Intrusion Detection AND Prevention System: Erkennt UND blockiert Angriffe (aktiv).\n\nIDS = Alarmanlage\nIPS = Alarmanlage die auch automatisch Türen verriegelt", hint: "IDS = nur warnen, IPS = warnen + blockieren" },
  { id: "fc-sicher-5", topic: "Netzwerksicherheit", front: "Was ist Port-Security?", back: "Port-Security auf Switches:\nBegrenzt die Anzahl MAC-Adressen pro Port.\n\nWenn zu viele MAC-Adressen → Port wird deaktiviert (Shutdown) oder Traffic wird gefiltert.\n\nSchützt gegen: MAC-Flooding, MAC-Spoofing, unautorisierte Geräte.", hint: "Port-Security = MAC-Adressen-Begrenzung am Switch-Port" },

  // ==========================================================================
  // KABEL & MEDIEN
  // ==========================================================================
  { id: "fc-kabel-1", topic: "Kabel & Medien", front: "Was ist der Unterschied zwischen UTP und STP?", back: "UTP (Unshielded Twisted Pair): Ungeschirmte Adernpaare, günstig, für Büros\nSTP (Shielded Twisted Pair): Geschirmt mit Folie/Geflecht, gegen EMI, für Industrie\n\nBeide: 4 Adernpaare, RJ45-Stecker, max. 100m Segmentlänge.", hint: "UTP = Büro, STP = Industrie/EMI-Umgebung" },
  { id: "fc-kabel-2", topic: "Kabel & Medien", front: "Nenne die gängigsten Kabel-Kategorien und ihre Eigenschaften.", back: "Cat 5: 100 Mbit/s, 100m (Fast Ethernet)\nCat 5e: 1 Gbit/s, 100m (Gigabit Ethernet)\nCat 6: 1 Gbit/s (10 Gbit/s auf 55m), 100m\nCat 6a: 10 Gbit/s, 100m\nCat 7: 10 Gbit/s, 100m, geschirmt (S/FTP)\nCat 8: 25/40 Gbit/s, 30m (Rechenzentren)", hint: "Cat 5e = Minimum für Gigabit, Cat 6a = Standard heute" },
  { id: "fc-kabel-3", topic: "Kabel & Medien", front: "Was ist der Unterschied zwischen Singlemode und Multimode Glasfaser?", back: "Multimode: Dicker Kern (50/62,5 µm), LED/Laser, günstig, kurze Strecken (bis ~2km)\nSinglemode: Dünner Kern (9 µm), Laser, teuer, lange Strecken (bis ~100km+)\n\nGlasfaser Vorteile: Keine EMI, hohe Bandbreite, lange Distanzen\nFarbcodierung: OM1 (orange) bis OM5 (limegrün), OS (gelb)", hint: "Multi = kurz+günstig, Single = lang+teuer" },
  { id: "fc-kabel-4", topic: "Kabel & Medien", front: "Was sind die Vor- und Nachteile von Kupfer vs. Glasfaser?", back: "Kupfer (Twisted Pair):\n✅ Günstig, PoE möglich, einfache Installation\n❌ Max. 100m, EMI-anfällig, weniger Bandbreite\n\nGlasfaser:\n✅ Hohe Bandbreite, keine EMI, lange Strecken\n❌ Teuer, spezielle Werkzeuge, fragil\n\nHeute: Kupfer im LAN (Büro), Glasfaser im Backbone/WAN.", hint: "Kupfer = LAN, Glasfaser = Backbone" },

  // ==========================================================================
  // TOOLS & BEFEHLE
  // ==========================================================================
  { id: "fc-tool-1", topic: "Tools & Befehle", front: "Was macht der ping-Befehl?", back: "ping prüft die Erreichbarkeit eines Hosts via ICMP.\n\nBeispiel: ping 192.168.1.1\nZeigt: Round-Trip-Time (RTT) in ms, Paketverlust\n\nNützlich für:\n✅ Ist der Host erreichbar?\n✅ Wie hoch ist die Latenz?\n✅ Gibt es Paketverlust?", hint: "ping = Erreichbarkeitstest" },
  { id: "fc-tool-2", topic: "Tools & Befehle", front: "Was zeigt traceroute/tracert?", back: "traceroute (Linux) / tracert (Windows):\nZeigt den Weg (Hop-by-Hop) zum Ziel mit Latenz pro Router.\n\nNützlich für:\n✅ Wo hakt die Verbindung?\n✅ Welchen Weg nehmen die Pakete?\n✅ Gibt es Routing-Schleifen?", hint: "traceroute = Weg zum Ziel finden" },
  { id: "fc-tool-3", topic: "Tools & Befehle", front: "Was zeigt ipconfig/ifconfig?", back: "ipconfig (Windows) / ifconfig (Linux, alt) / ip addr (Linux, modern):\nZeigt Netzwerkkonfiguration:\n- IP-Adresse, Subnetzmaske, Gateway\n- DNS-Server, MAC-Adresse\n\nipconfig /release + /renew: DHCP-Neuverhandlung\nipconfig /displaydns: DNS-Cache anzeigen", hint: "ipconfig = Netzwerk-Info anzeigen" },
  { id: "fc-tool-4", topic: "Tools & Befehle", front: "Was macht nslookup/dig?", back: "nslookup (Windows/Linux) / dig (Linux):\nDNS-Abfrage — löst Domainnamen auf.\n\nBeispiel: nslookup example.com\nZeigt: IP-Adresse, verwendeter DNS-Server\n\ndig example.com MX → Mailserver anzeigen", hint: "nslookup = DNS nachschlagen" },
  { id: "fc-tool-5", topic: "Tools & Befehle", front: "Was ist Wireshark?", back: "Wireshark: Netzwerk-Sniffer/Paket-Analyse-Tool.\n\nFunktionen:\n✅ Capture: Alle Netzwerkpakete aufzeichnen\n✅ Filter: Nach IP, Protokoll, Port filtern\n✅ Analyse: Protokoll-Details sehen\n✅ Troubleshooting: Netzwerkprobleme finden\n\n⚠️ In der Prüfung: Wireshark als Diagnosewerkzeug nennen!", hint: "Wireshark = Röntgenbrille für Netzwerk-Traffic" },
];

// --- QUIZ FRAGEN ---

export const netzwerkQuizzes: QuizQuestion[] = [
  // OSI-Modell
  { type: "multiple", question: "Wie viele Schichten hat das OSI-Referenzmodell?", options: ["4", "5", "6", "7"], correct: 3, explanation: "Das OSI-Modell hat 7 Schichten: Physik, Sicherung, Netzwerk, Transport, Sitzung, Präsentation, Anwendung." },
  { type: "multiple", question: "Auf welcher OSI-Schicht arbeitet ein Router?", options: ["Schicht 1 — Physikalisch", "Schicht 2 — Sicherung", "Schicht 3 — Netzwerk", "Schicht 4 — Transport"], correct: 2, explanation: "Ein Router arbeitet auf Schicht 3 (Netzwerkschicht) und nutzt IP-Adressen zur Wegfindung." },
  { type: "multiple", question: "Was ist die PDU auf der Sicherungsschicht (Schicht 2)?", options: ["Bits", "Frames", "Pakete", "Segmente"], correct: 1, explanation: "Schicht 2 (Sicherung) arbeitet mit Frames. Bits = Schicht 1, Pakete = Schicht 3, Segmente = Schicht 4." },
  { type: "multiple", question: "Welcher Merksatz hilft sich die OSI-Schichten zu merken?", options: ["Alle Priester Essen Tafelschokolade Am Palmsonntag", "Alle PCs Essen Tomaten Am Platz", "Applications Packets Ethernet Transport Session Presentation Application", "Keiner — es gibt keinen Merksatz"], correct: 0, explanation: "Der bekannteste deutsche Merksatz: Alle (Anwendung) Priester (Präsentation) Essen (Sitzung) Tafelschokolade (Transport) Am (Netzwerk) Palm (Physik) — von oben nach unten." },

  // TCP/IP
  { type: "multiple", question: "Was ist der Unterschied zwischen TCP und UDP?", options: ["TCP ist schneller als UDP", "UDP ist zuverlässiger als TCP", "TCP ist verbindungsorientiert, UDP verbindungslos", "Es gibt keinen Unterschied"], correct: 2, explanation: "TCP ist verbindungsorientiert (3-Wege-Handshake, Bestätigungen). UDP ist verbindungslos und schneller, aber ohne Garantie." },
  { type: "multiple", question: "Welchen Port nutzt HTTPS standardmäßig?", options: ["80", "443", "8080", "22"], correct: 1, explanation: "HTTPS nutzt Port 443. HTTP = 80, SSH = 22." },
  { type: "multiple", question: "Was passiert beim TCP 3-Wege-Handshake in der richtigen Reihenfolge?", options: ["ACK → SYN → SYN-ACK", "SYN → ACK → SYN-ACK", "SYN → SYN-ACK → ACK", "SYN-ACK → SYN → ACK"], correct: 2, explanation: "SYN (Client) → SYN-ACK (Server) → ACK (Client). Danach steht die Verbindung." },

  // IPv4
  { type: "multiple", question: "Welche IP-Klasse hat die Standard-Subnetzmaske 255.255.0.0?", options: ["Klasse A", "Klasse B", "Klasse C", "Klasse D"], correct: 1, explanation: "Klasse B: /16 → 255.255.0.0. Klasse A = /8 (255.0.0.0), Klasse C = /24 (255.255.255.0)." },
  { type: "multiple", question: "Welcher IP-Bereich ist privat nach RFC 1918?", options: ["11.0.0.0 – 11.255.255.255", "172.16.0.0 – 172.31.255.255", "193.168.0.0 – 193.168.255.255", "100.0.0.0 – 100.255.255.255"], correct: 1, explanation: "RFC 1918: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16." },
  { type: "multiple", question: "Wie viele nutzbare Hosts gibt es in einem /24 Subnetz?", options: ["254", "255", "256", "253"], correct: 0, explanation: "/24 = 8 Host-Bits → 2^8 - 2 = 254 nutzbare Hosts. Abzüglich Netzwerk- und Broadcast-Adresse." },
  { type: "multiple", question: "Was ergibt die UND-Verknüpfung von 192.168.1.130 UND 255.255.255.192?", options: ["192.168.1.0", "192.168.1.128", "192.168.1.192", "192.168.1.64"], correct: 1, explanation: "130 = 10000010, 192 = 11000000 → AND = 10000000 = 128. Ergebnis: 192.168.1.128." },

  // Subnetting
  { type: "multiple", question: "Was bedeutet CIDR /26?", options: ["26 Hosts pro Subnetz", "26 Bit für die Netzwerkadresse", "26 verfügbare IPs", "26 Subnetze"], correct: 1, explanation: "/26 bedeutet 26 Bit sind für die Netzwerkadresse reserviert. 6 Host-Bits → 2^6 - 2 = 62 Hosts." },
  { type: "multiple", question: "Ein Netzwerk braucht 1000 Hosts. Welche CIDR-Notation ist richtig?", options: ["/22", "/23", "/24", "/25"], correct: 1, explanation: "1000 Hosts → 2^h - 2 ≥ 1000 → h = 10 (2^10 - 2 = 1022) → /22 (32-10=22)." },
  { type: "multiple", question: "Was ist VLSM?", options: ["Very Large Subnet Mask", "Variable Length Subnet Mask", "Virtual LAN Subnet Management", "Variable Logical Subnet Mapping"], correct: 1, explanation: "VLSM = Variable Length Subnet Mask. Verschiedene Subnetze können verschiedene Präfixlängen haben — keine IP-Verschwendung." },

  // IPv6
  { type: "multiple", question: "Wie viele Bit hat eine IPv6-Adresse?", options: ["32", "64", "128", "256"], correct: 2, explanation: "IPv6 hat 128 Bit (vs. IPv4 mit 32 Bit). Das ergibt ~3,4 × 10^38 Adressen." },
  { type: "multiple", question: "Was ist die IPv6-Loopback-Adresse?", options: ["127.0.0.1", "::1", "fe80::1", "2000::1"], correct: 1, explanation: "::1 ist die IPv6-Loopback-Adresse (entspricht 127.0.0.1 in IPv4)." },
  { type: "multiple", question: "Was ist Dual Stack?", options: ["Zwei Internetanschlüsse", "IPv4 und IPv6 gleichzeitig auf einem Host", "Zwei Router parallel", "IPv6 über IPv4 tunneln"], correct: 1, explanation: "Dual Stack: Host hat gleichzeitig IPv4 UND IPv6 und kann beide Protokolle nutzen." },

  // Netzwerkgeräte
  { type: "multiple", question: "Auf welcher OSI-Schicht arbeitet ein Switch?", options: ["Schicht 1", "Schicht 2", "Schicht 3", "Schicht 4"], correct: 1, explanation: "Ein Switch arbeitet auf Schicht 2 (Sicherung) und nutzt MAC-Adressen für die Weiterleitung." },
  { type: "multiple", question: "Was ist der Hauptvorteil eines Switches gegenüber einem Hub?", options: ["Er ist billiger", "Er ist schneller", "Er sendet nur an den Zielport statt an alle", "Er hat mehr Ports"], correct: 2, explanation: "Ein Switch lernt MAC-Adressen und sendet Frames nur an den richtigen Port. Ein Hub sendet an alle Ports." },
  { type: "multiple", question: "Was trennt ein Router?", options: ["Kollisionsdomänen", "Broadcast-Domänen", "VLANs", "Subnetze"], correct: 1, explanation: "Ein Router trennt Broadcast-Domänen (und damit auch Kollisionsdomänen). Ein Switch trennt nur Kollisionsdomänen." },

  // Topologien
  { type: "multiple", question: "Welche Topologie ist der heutige Standard in LANs?", options: ["Bus", "Ring", "Stern", "Mesh"], correct: 2, explanation: "Die Stern-Topologie ist der Standard: Alle Geräte zentral an einem Switch angeschlossen." },
  { type: "multiple", question: "Was ist ein Single Point of Failure?", options: ["Ein besonders schneller Server", "Ein Knotenpunkt dessen Ausfall alles lahmlegt", "Ein redundantes System", "Ein Backup-Server"], correct: 1, explanation: "SPoF: Ein Punkt dessen Ausfall das gesamte Netzwerk lahmlegt. Gegenmaßnahme: Redundanz." },

  // Protokolle
  { type: "multiple", question: "Was macht DNS?", options: ["Vergibt IP-Adressen", "Übersetzt Domainnamen in IP-Adressen", "Verschlüsselt Daten", "Verwaltet Benutzer"], correct: 1, explanation: "DNS (Domain Name System) übersetzt Domainnamen (z.B. google.com) in IP-Adressen." },
  { type: "multiple", question: "Welcher DHCP-Schritt folgt auf 'Discover'?", options: ["Acknowledge", "Request", "Offer", "Release"], correct: 2, explanation: "DORA: Discover → Offer → Request → Acknowledge." },
  { type: "multiple", question: "Was ist der Vorteil von IMAP gegenüber POP3?", options: ["IMAP ist schneller", "IMAP lässt E-Mails auf dem Server — Zugriff von mehreren Geräten", "IMAP verschlüsselt automatisch", "IMAP ist kostenloser"], correct: 1, explanation: "IMAP belässt E-Mails auf dem Server und synchronisiert. POP3 lädt sie herunter und löscht sie oft." },
  { type: "multiple", question: "Welches Protokoll wird für die Namensauflösung in einem Netzwerk verwendet, wenn kein DNS-Server vorhanden ist?", options: ["ARP", "NetBIOS/LLMNR", "DHCP", "ICMP"], correct: 1, explanation: "NetBIOS (alt) bzw. LLMNR (modern) ermöglichen Namensauflösung im lokalen Netzwerk ohne DNS-Server." },

  // WLAN
  { type: "multiple", question: "Welcher WLAN-Standard bietet die höchste Geschwindigkeit?", options: ["802.11n", "802.11ac", "802.11ax", "802.11g"], correct: 2, explanation: "802.11ax (Wi-Fi 6): Bis zu 9,6 Gbit/s. ac = 6,9 Gbit/s, n = 600 Mbit/s, g = 54 Mbit/s." },
  { type: "multiple", question: "Welches WLAN-Sicherheitsprotokoll ist aktuell am sichersten?", options: ["WEP", "WPA", "WPA2", "WPA3"], correct: 3, explanation: "WPA3 ist das aktuellste und sicherste. WEP ist veraltet und leicht knackbar." },
  { type: "multiple", question: "Was ist der Vorteil von 5 GHz gegenüber 2,4 GHz?", options: ["Längere Reichweite", "Weniger Störung und mehr Kanäle", "Günstigere Hardware", "Besser durch Wände"], correct: 1, explanation: "5 GHz: Mehr Kanäle, weniger Störung, höhere Geschwindigkeit. Aber kürzere Reichweite." },

  // Netzwerksicherheit
  { type: "multiple", question: "Was ist der Zweck eines VLANs?", options: ["Internetzugang beschleunigen", "Logische Trennung von Netzwerksegmenten", "WLAN-Verbindung herstellen", "IP-Adressen vergeben"], correct: 1, explanation: "VLANs trennen ein physisches Netzwerk logisch in separate Broadcast-Domänen." },
  { type: "multiple", question: "Was ist der Unterschied zwischen IDS und IPS?", options: ["IDS erkennt Angriffe, IPS erkennt und blockiert sie", "IDS ist teurer als IPS", "Es gibt keinen Unterschied", "IPS ist nur für WLAN"], correct: 0, explanation: "IDS = nur Erkennung (passiv). IPS = Erkennung + Blockierung (aktiv)." },
  { type: "multiple", question: "Was steht in einer DMZ?", options: ["Alle internen Server", "Öffentlich erreichbare Server (Web, Mail)", "Nur Workstations", "Drucker"], correct: 1, explanation: "DMZ enthält öffentliche Server (Webserver, Mailserver) — zwischen Internet und internem Netz." },

  // Kabel
  { type: "multiple", question: "Was ist die maximale Segmentlänge bei Twisted-Pair-Kabeln?", options: ["50m", "100m", "200m", "500m"], correct: 1, explanation: "Standard: 100m maximale Segmentlänge für Twisted Pair (Cat 5/6/7)." },
  { type: "multiple", question: "Welches Kabel eignet sich für 10 Gbit/s über 100m?", options: ["Cat 5e", "Cat 6", "Cat 6a", "Cat 5"], correct: 2, explanation: "Cat 6a: 10 Gbit/s über 100m. Cat 6 schafft 10 Gbit/s nur auf 55m." },
  { type: "multiple", question: "Was ist der Vorteil von Glasfaser gegenüber Kupferkabeln?", options: ["Günstiger", "Keine elektromagnetische Störung, höhere Bandbreite", "Einfacher zu installieren", "Kürzere Reichweite"], correct: 1, explanation: "Glasfaser: Keine EMI, hohe Bandbreite, lange Strecken. Aber teurer und fragiler." },

  // Tools
  { type: "multiple", question: "Welches Tool zeigt den Netzwerkweg zum Ziel an?", options: ["ping", "traceroute", "ipconfig", "nslookup"], correct: 1, explanation: "traceroute zeigt Hop-by-Hop den Weg zum Ziel mit Latenz pro Router." },
  { type: "multiple", question: "Was macht nslookup?", options: ["Testet die Netzwerkgeschwindigkeit", "Führt DNS-Abfragen durch", "Zeigt IP-Konfiguration", "Analysiert Netzwerkpakete"], correct: 1, explanation: "nslookup führt DNS-Abfragen durch — löst Domainnamen in IP-Adressen auf." },
  { type: "multiple", question: "Was kann Wireshark?", options: ["Nur WLAN-Analyse", "Vollständige Netzwerkpaket-Analyse", "Nur DNS-Analyse", "Nur Ping-Tests"], correct: 1, explanation: "Wireshark kann ALLE Netzwerkpakete aufzeichnen und analysieren — der Netzwerk-Sniffer." },
];

// --- MODUL-DEFINITION ---

export const netzwerkModule: Module = {
  id: "ihk-netzwerk",
  slug: "ihk-netzwerk",
  title: "Netzwerktechnik",
  description: "IHK AP1/AP2: OSI-Modell, TCP/IP, IPv4/IPv6, Subnetting, Netzwerkgeräte, Topologien, Protokolle, WLAN, Sicherheit, Kabel, Tools",
  icon: "🌐",
  color: "#3B82F6",
  category: "programmieren",
  progress: 0,
  merkblatt: `## 📋 Merkblatt: Netzwerktechnik (IHK)

### OSI-Modell (7 Schichten)
Merksatz: **A**lle **P**riester **E**ssen **T**afelschokolade **A**m **P**almsonntag
- Schicht 7: Anwendung (HTTP, FTP, SMTP)
- Schicht 6: Präsentation (SSL/TLS, ASCII)
- Schicht 5: Sitzung (Session-Management)
- Schicht 4: Transport (TCP, UDP)
- Schicht 3: Netzwerk (IP, ICMP, ARP)
- Schicht 2: Sicherung (Ethernet, MAC)
- Schicht 1: Physikalisch (Kabel, Bits)

### TCP/IP (4 Schichten)
Anwendung | Transport | Internet | Netzwerkzugang
- **TCP**: Verbindungsorientiert, zuverlässig (SYN → SYN-ACK → ACK)
- **UDP**: Verbindungslos, schnell, ohne Garantie

### IPv4
- 32 Bit, 4 Oktette (0-255), z.B. 192.168.1.1
- **Klassen**: A (/8), B (/16), C (/24), D (Multicast), E (Reserviert)
- **Privat**: 10.x, 172.16-31.x, 192.168.x

### Subnetting
- **Formel Hosts**: 2^Hostbits - 2
- **Formel Subnetze**: 2^entliehene Bits
- /24 = 254 Hosts | /25 = 126 | /26 = 62 | /27 = 30 | /28 = 14

### IPv6
- 128 Bit, hexadezimal, z.B. 2001:db8::1
- **Dual Stack**: IPv4 + IPv6 parallel
- **Link-Local**: fe80:: | **Global**: 2000::

### Geräte & Schichten
- **Hub**: Schicht 1 (an alle Ports)
- **Switch**: Schicht 2 (MAC-basiert, lernt CAM-Tabelle)
- **Router**: Schicht 3 (IP-basiert, trennt Broadcast-Domänen)

### Topologien
- **Stern** = Standard heute (Switch in der Mitte)
- **SPoF** = Single Point of Failure → Redundanz!

### Protokolle & Ports
| Protokoll | Port | Zweck |
|-----------|------|-------|
| HTTP | 80 | Web (unverschlüsselt) |
| HTTPS | 443 | Web (TLS-verschlüsselt) |
| SSH | 22 | Sichere Fernverbindung |
| FTP | 20/21 | Dateiübertragung |
| DNS | 53 | Namensauflösung |
| DHCP | 67/68 | IP-Vergabe |
| SMTP | 25/587 | E-Mail senden |
| IMAP | 143/993 | E-Mail empfangen |
| POP3 | 110/995 | E-Mail empfangen |

### WLAN
- **802.11b/g**: 2,4 GHz | **a/ac**: 5 GHz | **n/ax**: beide
- **Sicherheit**: WEP ❌ < WPA < WPA2 ✅ < WPA3 🔒

### Sicherheit
- **VLAN**: Logische Netzwerktrennung (Broadcast-Domäne)
- **VPN**: Verschlüsselter Tunnel (Site-to-Site, Remote Access)
- **DMZ**: Pufferzone zwischen Internet und internem Netz
- **IDS**: Erkennt Angriffe | **IPS**: Erkennt + blockiert

### Kabel
- **Cat 5e**: 1 Gbit/s | **Cat 6a**: 10 Gbit/s/100m
- **UTP**: Büro | **STP**: Industrie | **Glasfaser**: Backbone

### Tools
- **ping**: Erreichbarkeit (ICMP)
- **traceroute**: Weg zum Ziel
- **ipconfig**: Netzwerk-Konfiguration
- **nslookup**: DNS-Abfrage
- **Wireshark**: Paket-Analyse`,

  lessons: [
    {
      id: "netz-1",
      title: "OSI-Referenzmodell",
      duration: "15 min",
      type: "interactive",
      interactive: "osiCapsuleViewer",
      content: `# OSI-Referenzmodell — Die 7 Schichten 🧅

## Was ist das OSI-Modell?

Das **OSI-Referenzmodell** (Open Systems Interconnection) wurde von der **ISO** entwickelt und beschreibt die Kommunikation in Netzwerken in **7 Schichten**. Jede Schicht hat eine klar definierte Aufgabe.

> 💡 Das OSI-Modell ist wie eine **Zwiebel** — jede Schicht ist eine neue Schale um die vorherige.

## Die 7 Schichten

Merksatz: **A**lle **P**riester **E**ssen **T**afelschokolade **A**m **P**almsonntag

| # | Schicht | Aufgabe | PDU | Geräte | Protokolle |
|---|---------|---------|-----|--------|------------|
| 7 | Anwendung | Benutzerschnittstelle | Daten | — | HTTP, FTP, SMTP, DNS |
| 6 | Präsentation | Datenformat, Verschlüsselung | Daten | — | SSL/TLS, ASCII, JPEG |
| 5 | Sitzung | Session-Management | Daten | — | NetBIOS, RPC |
| 4 | Transport | End-to-End-Verbindung | Segmente | — | TCP, UDP |
| 3 | Netzwerk | Routing, IP-Adressierung | Pakete | Router | IP, ICMP, ARP |
| 2 | Sicherung | MAC-Adressen, Frames | Frames | Switch, Bridge | Ethernet, WLAN |
| 1 | Physikalisch | Bitübertragung | Bits | Hub, Repeater | Kabel, Stecker |

## Datenkapselung

Jede Schicht fügt ihren eigenen **Header** hinzu:
- Anwendung → Daten
- Transport → **Header** + Daten = Segment
- Netzwerk → **Header** + Segment = Paket
- Sicherung → **Header** + Paket + **Trailer** = Frame
- Physikalisch → Bits

Beim Empfänger wird alles **umgekehrt entkapselt**.

## OSI vs. TCP/IP

| OSI (7 Schichten) | TCP/IP (4 Schichten) |
|-------------------|---------------------|
| Anwendung, Präsentation, Sitzung | Anwendung |
| Transport | Transport |
| Netzwerk | Internet |
| Sicherung, Physikalisch | Netzwerkzugang |

> ❗ **IHK-Tipp:** Das TCP/IP-Modell ist das praktische Modell — das Internet nutzt es. OSI ist nur ein Referenzmodell.

## 🔐 Interaktiv ausprobieren

[INTERACTIVE]

> 💡 Der OSI-Kapselungs-Viewer zeigt dir, wie Daten Schicht für Schicht verpackt werden — klicke durch die Animation!`,
    },
    {
      id: "netz-2",
      title: "TCP/IP-Modell & Protokolle",
      duration: "15 min",
      type: "interactive",
      interactive: "tcpHandshakeSimulator",
      content: `# TCP/IP-Modell & Protokolle 🌐

## Die 4 Schichten des TCP/IP-Modells

1. **Anwendung** (Application): HTTP, FTP, SMTP, DNS, SSH
2. **Transport** (Transport): TCP, UDP
3. **Internet** (Internet): IP, ICMP, ARP
4. **Netzwerkzugang** (Network Access): Ethernet, WLAN

## TCP vs. UDP

| Eigenschaft | TCP | UDP |
|-------------|-----|-----|
| Verbindung | Verbindungsorientiert (3-Wege-Handshake) | Verbindungslos |
| Zuverlässigkeit | ✅ Bestätigungen, Reihenfolge | ❌ Keine Garantie |
| Geschwindigkeit | 🐢 Langsamer (Overhead) | 🐇 Schnell |
| Anwendung | HTTP, FTP, SMTP, E-Mail | DNS, DHCP, Streaming, Gaming |

## TCP 3-Wege-Handshake
1. **SYN**: Client → Server: "Hallo, Verbindung?"
2. **SYN-ACK**: Server → Client: "Ja, bereit!"
3. **ACK**: Client → Server: "Perfekt, los geht's!"

## Wichtige Ports (Well-Known: 0-1023)

| Port | Protokoll | Zweck |
|------|-----------|-------|
| 20/21 | FTP | Dateien |
| 22 | SSH | Sichere Shell |
| 23 | Telnet | Terminal (unsicher!) |
| 25 | SMTP | E-Mail senden |
| 53 | DNS | Namensauflösung |
| 67/68 | DHCP | IP-Vergabe |
| 80 | HTTP | Web |
| 110 | POP3 | E-Mail |
| 143 | IMAP | E-Mail |
| 443 | HTTPS | Sicheres Web |

> ❗ **IHK-Tipp:** Port-Nummern auswendig lernen — besonders 80, 443, 22, 25, 53!

## 🤝 TCP-Handshake ausprobieren

[INTERACTIVE]

> 💡 Der TCP-Handshake-Simulator zeigt dir den 3-Wege-Handshake live — mit Paketverlust-Simulation!

## 🔐 Verschlüsselung

[INTERACTIVE]

> 💡 Verschlüsselung von Caesar bis TLS — wie schützt HTTPS deine Daten?`,
    },
    {
      id: "netz-3",
      title: "IPv4-Adressierung",
      duration: "18 min",
      type: "interactive",
      interactive: "macConverter",
      content: `# IPv4-Adressierung 🔢

## Aufbau einer IPv4-Adresse
- **32 Bit**, in **4 Oktetten** à 8 Bit
- Dezimal mit Punkten: \`192.168.1.1\`
- Binär: \`11000000.10101000.00000001.00000001\`
- Jedes Oktett: **0-255** (2^8 = 256 Werte)

## Die 5 IP-Klassen

| Klasse | Bereich | Standard-Maske | Verwendung |
|--------|---------|----------------|------------|
| A | 1.0.0.0 – 126.255.255.255 | /8 (255.0.0.0) | Sehr große Netzwerke |
| B | 128.0.0.0 – 191.255.255.255 | /16 (255.255.0.0) | Mittlere Netzwerke |
| C | 192.0.0.0 – 223.255.255.255 | /24 (255.255.255.0) | Kleine Netzwerke |
| D | 224.0.0.0 – 239.255.255.255 | — | Multicast |
| E | 240.0.0.0 – 255.255.255.255 | — | Reserviert |

## Private Adressbereiche (RFC 1918)
- **Klasse A**: 10.0.0.0 – 10.255.255.255 (/8)
- **Klasse B**: 172.16.0.0 – 172.31.255.255 (/12)
- **Klasse C**: 192.168.0.0 – 192.168.255.255 (/16)

> 💡 Private Adressen sind **NICHT im Internet routbar** — nur für lokale Netzwerke. NAT übersetzt sie.

## Netzwerk- vs. Broadcast-Adresse
- **Netzwerkadresse**: Erste im Subnetz (Host-Bits = 0)
- **Broadcast-Adresse**: Letzte im Subnetz (Host-Bits = 1)
- **Nutzbare Hosts**: Alles dazwischen

> ❗ **IHK-Tipp:** Subnetting-Berechnungen kommen in AP1 und AP2 regelmäßig dran!

## 🔢 Binär/Dezimal-Konverter

[INTERACTIVE]

> 💡 Der MAC/IP-Konverter zeigt dir Binär und Dezimal im Wechsel — übe die Umrechnung!`,
    },
    {
      id: "netz-4",
      title: "Subnetting",
      duration: "20 min",
      type: "interactive",
      interactive: "subnetCalculator",
      content: `# Subnetting — Netzwerke aufteilen 🧮

## Warum Subnetting?
- Netzwerke in kleinere Segmente aufteilen
- Broadcast-Traffic reduzieren
- Sicherheit erhöhen (VLANs)
- IP-Adressen effizient nutzen

## CIDR-Notation
\`IP-Adresse/Präfixlänge\`
Beispiel: \`192.168.1.0/24\` → 24 Bit Netzwerk, 8 Bit Host

## Die Formeln

| Formel | Zweck |
|--------|-------|
| **2^n** | Anzahl Subnetze (n = entliehene Bits) |
| **2^h - 2** | Nutzbare Hosts (h = Host-Bits) |
| **32 - /Praefix** | Host-Bits |

## Beispielrechnung

Aufgabe: \`192.168.1.0/26\` — wie viele Subnetze und Hosts?

1. /26 → 26 Bit Netzwerk → 32 - 26 = **6 Host-Bits**
2. Hosts: 2^6 - 2 = **62 nutzbare Hosts**
3. Subnetzmaske: 255.255.255.192

## Subnetzmaske berechnen

| /Praefix | Maske | Letztes Oktett |
|----------|-------|----------------|
| /24 | 255.255.255.0 | 00000000 = 0 |
| /25 | 255.255.255.128 | 10000000 = 128 |
| /26 | 255.255.255.192 | 11000000 = 192 |
| /27 | 255.255.255.224 | 11100000 = 224 |
| /28 | 255.255.255.240 | 11110000 = 240 |

## UND-Verknüpfung (AND)
IP UND Maske = Netzwerkadresse

\`\`\`
192.168.1.130  = 11000000.10101000.00000001.10000010
255.255.255.192 = 11111111.11111111.11111111.11000000
Ergebnis (AND) = 11000000.10101000.00000001.10000000 = 192.168.1.128
\`\`\`

> ❗ **IHK-Tipp:** Übe Subnetting auf Papier — in der Prüfung gibt es keinen Taschenrechner für Binär!

## 🧮 Subnetting-Rechner

[INTERACTIVE]

> 💡 Der Subnetting-Rechner zeigt dir Netzwerkadresse, Broadcast und Hosts — probiere verschiedene CIDR-Notationen aus!`,
    },
    {
      id: "netz-5",
      title: "IPv6",
      duration: "12 min",
      type: "text",
      content: `# IPv6 — Die nächste Generation 🔮

## Warum IPv6?
IPv4 hat nur ~4,3 Mrd. Adressen (2^32) — **zu wenig!**
IPv6: 2^128 ≈ 3,4 × 10^38 Adressen — genug für jedes Gerät.

## Aufbau
- **128 Bit**, in 8 Gruppen à 16 Bit
- Hexadezimal mit Doppelpunkten: \`2001:0db8:85a3:0000:0000:8a2e:0370:7334\`

## Vereinfachung
1. **Führende Nullen** weglassen: \`0db8\` → \`db8\`
2. **Aufeinanderfolgende 0-Gruppen** durch \`::\` ersetzen (nur EINMAL!)

Beispiel: \`2001:0db8:0000:0000:0000:0000:0000:0001\` → \`2001:db8::1\`

## Wichtige Adresstypen

| Typ | Präfix | Zweck |
|-----|--------|-------|
| Loopback | ::1 | Eigener Host (= 127.0.0.1) |
| Link-Local | fe80::/10 | Nur lokales Netzwerk |
| Global Unicast | 2000::/3 | Öffentlich, routbar |
| Multicast | ff00::/8 | Gruppenadresse |

## Übergangsmechanismen
- **Dual Stack**: IPv4 + IPv6 parallel auf einem Host
- **Tunneling**: IPv6 in IPv4 verpacken (6to4, Teredo)
- **NAT64**: IPv6 ↔ IPv4 übersetzen

> ❗ **IHK-Tipp:** IPv6-Adressen können lang sein — die Vereinfachungsregeln kennen!`,
    },
    {
      id: "netz-6",
      title: "Netzwerkgeräte",
      duration: "12 min",
      type: "interactive",
      interactive: "networkBuilder",
      content: `# Netzwerkgeräte — Wer macht was? 🔧

## Die wichtigsten Geräte

| Gerät | Schicht | Aufgabe |
|-------|---------|---------|
| **Hub** | 1 (Physik) | Sendet an ALLE Ports — veraltet! |
| **Repeater** | 1 (Physik) | Signal verstärken |
| **Bridge** | 2 (Sicherung) | Trennt Kollisionsdomänen (wenige Ports) |
| **Switch** | 2 (Sicherung) | Lernt MAC-Adressen, sendet zielgerichtet |
| **Router** | 3 (Netzwerk) | Verbindet Netzwerke, IP-basiert |
| **Firewall** | 3-7 | Filtert Traffic nach Regeln |
| **Access Point** | 2 (Sicherung) | WLAN ↔ Kabel |

## Hub vs. Switch

| | Hub | Switch |
|---|-----|--------|
| Verhalten | Sendet an alle Ports | Sendet nur an Zielport |
| Intelligenz | Dumm | Lernt MAC-Adressen (CAM-Tabelle) |
| Kollisionen | Viele | Jeder Port eigene Kollisionsdomäne |
| Heute | Veraltet | Standard |

## Kollisions- vs. Broadcast-Domäne
- **Kollisionsdomäne**: Bereich in dem Pakete kollidieren können (Switch trennt diese)
- **Broadcast-Domäne**: Bereich in dem Broadcasts ankommen (Router trennt diese)

> ❗ **IHK-Tipp:** Merke: Switch = Schicht 2 = MAC, Router = Schicht 3 = IP. Das kommt IMMER dran!

## 🔧 Netzwerk bauen

[INTERACTIVE]

> 💡 Der Netzwerk-Builder zeigt dir, wie Geräte zusammenhängen — baue dein eigenes Netzwerk!`,
    },
    {
      id: "netz-7",
      title: "Netzwerktopologien",
      duration: "10 min",
      type: "text",
      content: `# Netzwerktopologien — Strukturen im Netz 🕸️

## Die 5 Grundtopologien

| Topologie | Beschreibung | Vor- | Nachteile |
|-----------|-------------|------|-----------|
| **Bus** | Alle an einem Kabel | Einfach, billig | Kollisionen, Kabelbruch = alles down |
| **Ring** | Jeder mit 2 Nachbarn | Gleichmäßige Last | Ein Ausfall = alles down |
| **Stern** | Alle an zentralen Switch | Einzelausfall无关, einfach | Switch = SPoF |
| **Mesh** | Jeder mit jedem | Sehr redundant | Teuer, komplex |
| **Baum** | Hierarchische Sterne | Skalierbar | Abhängig von oberem Switch |

## Der heutige Standard: Stern-Topologie
- Alle Geräte an einem **Switch** angeschlossen
- Einzelner Geräteausfall不影响 das Netzwerk
- Einfach zu erweitern (neuen Port nutzen)

## Single Point of Failure (SPoF)
Ein Knoten dessen Ausfall **alles lahmlegt**:
- Zentraler Switch
- Internet-Gateway
- DNS-Server

**Gegenmaßnahme:** Redundanz — Backup-Geräte, mehrere Pfade.

> ❗ **IHK-Tipp:** In der Prüfung nach SPoFs fragen — immer an Redundanz denken!`,
    },
    {
      id: "netz-8",
      title: "Wichtige Netzwerkprotokolle",
      duration: "18 min",
      type: "interactive",
      interactive: "dnsLookup",
      content: `# Wichtige Netzwerkprotokolle 📡

## DNS — Domain Name System
Übersetzt **Domainnamen → IP-Adressen**.
Ablauf: Client → Resolver → Root → TLD → Autoritativer Server

Wichtige Records: **A** (IPv4), **AAAA** (IPv6), **MX** (Mail), **CNAME** (Alias), **NS** (Nameserver)

## DHCP — Dynamic Host Configuration Protocol
Vergibt **IP-Adressen automatisch**.
DORA: **D**iscover → **O**ffer → **R**equest → **A**cknowledge

## ARP — Address Resolution Protocol
Findet **MAC-Adresse zu einer IP**.
Request (Broadcast): "Wer hat 192.168.1.1?" → Reply (Unicast): "Ich! MAC: AA:BB:CC:DD:EE:FF"

## HTTP vs. HTTPS
- **HTTP** (Port 80): Unverschlüsselt
- **HTTPS** (Port 443): Verschlüsselt via **TLS**

## E-Mail-Protokolle
- **SMTP** (25/587): Senden
- **IMAP** (143/993): Empfangen, bleibt auf Server ✅
- **POP3** (110/995): Empfangen, downloadet & löscht

## SSH vs. Telnet
- **SSH** (22): Verschlüsselt ✅
- **Telnet** (23): Unverschlüsselt ❌

> ❗ **IHK-Tipp:** IMMER HTTPS, IMAP und SSH empfehlen — Sicherheit wird in der Prüfung großgeschrieben!

## 🔍 DNS-Lookup

[INTERACTIVE]

## 📡 DHCP — DORA-Prozess

[INTERACTIVE]

> 💡 Der DNS-Lookup zeigt dir die Auflösung Schritt für Schritt. Der DHCP-Explorer zeigt den DORA-Prozess live!

## 🌐 HTTP-Request live

[INTERACTIVE]

## 📧 E-Mail verschicken

[INTERACTIVE]

> 💡 Der HTTP-Request zeigt dir Headers und Status-Codes live. Die Mail-Reise zeigt den Weg einer E-Mail!`,
    },
    {
      id: "netz-9",
      title: "WLAN",
      duration: "12 min",
      type: "interactive",
      interactive: "wlanConfigurator",
      content: `# WLAN — Drahtlose Netzwerke 📶

## IEEE 802.11 Standards

| Standard | Jahr | Max. Speed | Frequenz | Besonderheit |
|----------|------|------------|----------|--------------|
| 802.11b | 1999 | 11 Mbit/s | 2,4 GHz | Erster verbreiteter |
| 802.11a | 1999 | 54 Mbit/s | 5 GHz | Kurz danach |
| 802.11g | 2003 | 54 Mbit/s | 2,4 GHz | Kompatibel mit b |
| 802.11n (Wi-Fi 4) | 2009 | 600 Mbit/s | 2,4+5 GHz | MIMO |
| 802.11ac (Wi-Fi 5) | 2013 | 6,9 Gbit/s | 5 GHz | MU-MIMO |
| 802.11ax (Wi-Fi 6) | 2019 | 9,6 Gbit/s | 2,4+5 GHz | OFDMA |

## 2,4 GHz vs. 5 GHz

| | 2,4 GHz | 5 GHz |
|---|---------|-------|
| Reichweite | ✅ Weiter | ❌ Kürzer |
| Störung | ❌ Mehr (Mikrowelle) | ✅ Weniger |
| Kanäle | 3 nicht überlappend | Bis zu 25 |
| Speed | Langsamer | Schneller |

## WLAN-Sicherheit

| Standard | Sicherheit | Status |
|----------|------------|--------|
| WEP | RC4, leicht knackbar | ❌ VERALTET |
| WPA | TKIP, besser | ⚠️ Schwächen |
| WPA2 | AES-CCMP | ✅ Aktuell |
| WPA3 | SAE | 🔒 Best Practice |

**WPA2-Personal (PSK):** Ein gemeinsames Passwort — für Heimnetzwerke.
**WPA2-Enterprise (802.1X):** Individuelle Anmeldung via RADIUS — für Unternehmen.

> ❗ **IHK-Tipp:** WEP ist UNSICHER — in der Prüfung immer mindestens WPA2 empfehlen!

## 📶 WLAN konfigurieren

[INTERACTIVE]

> 💡 Der WLAN-Konfigurator zeigt dir, welche Einstellungen sicher sind — experimentiere mit Sicherheitsstandards!`,
    },
    {
      id: "netz-10",
      title: "Netzwerksicherheit",
      duration: "15 min",
      type: "interactive",
      interactive: "firewallRuleBuilder",
      content: `# Netzwerksicherheit — Schutzmaßnahmen 🔒

## VLAN — Virtual Local Area Network
Logische Trennung eines physischen Switches in separate **Broadcast-Domänen**.
- Sicherheit: Abteilungen getrennt
- Performance: Weniger Broadcast-Traffic
- Flexibilität: Kein Umverkabeln

## VPN — Virtual Private Network
Verschlüsselter Tunnel durch öffentliche Netzwerke.
- **Site-to-Site**: Standort ↔ Standort
- **Remote Access**: Client ins Firmennetzwerk
- **Protokolle**: IPSec, SSL/TLS, WireGuard

## DMZ — Demilitarisierte Zone
Pufferzone zwischen Internet und internem Netz.
Enthält öffentliche Server (Web, Mail) — durch **2 Firewalls** geschützt.

## Firewall-Typen
- **Stateless**: Prüft jedes Paket einzeln (Regeln)
- **Stateful**: Merkt sich Verbindungsstatus (State Table) — sicherer

## IDS vs. IPS
- **IDS** (Intrusion Detection): Erkennt Angriffe, meldet sie (passiv)
- **IPS** (Intrusion Prevention): Erkennt UND blockiert (aktiv)

## Port-Security
Switch-Begrenzung der MAC-Adressen pro Port.
Schützt gegen: MAC-Flooding, unautorisierte Geräte.

> ❗ **IHK-Tipp:** VLAN, VPN und Firewall sind DIE Sicherheitsthemen — immer mit konkreten Beispielen erklären!

## 🔥 Firewall-Regeln bauen

[INTERACTIVE]

> 💡 Der Firewall-Regel-Builder zeigt dir, wie Regeln Pakete filtern — baue eigene Regeln und teste Pakete!

## 🔒 VPN-Tunnel

[INTERACTIVE]

> 💡 Der VPN-Tunnel-Visualizer zeigt dir, wie ein verschlossener Tunnel aufgebaut wird — mit Site-to-Site und Remote Access!`,
    },
    {
      id: "netz-11",
      title: "Kabel & Übertragungsmedien",
      duration: "10 min",
      type: "interactive",
      interactive: "cableComparer",
      content: `# Kabel & Übertragungsmedien 🔌

## Kupfer: Twisted Pair

| Kategorie | Speed | Reichweite | Einsatz |
|-----------|-------|------------|---------|
| Cat 5 | 100 Mbit/s | 100m | Fast Ethernet |
| Cat 5e | 1 Gbit/s | 100m | Gigabit Ethernet |
| Cat 6 | 1-10 Gbit/s | 55-100m | Modernes LAN |
| Cat 6a | 10 Gbit/s | 100m | Standard heute |
| Cat 7 | 10 Gbit/s | 100m | Geschirmt (S/FTP) |
| Cat 8 | 25/40 Gbit/s | 30m | Rechenzentren |

**UTP** (Unshielded): Ungeschirmt, für Büros
**STP** (Shielded): Geschirmt, gegen EMI, für Industrie

## Glasfaser

| Typ | Kern | Reichweite | Kosten |
|-----|------|------------|--------|
| **Multimode** | 50/62,5 µm | ~2km | Günstiger |
| **Singlemode** | 9 µm | ~100km+ | Teurer |

Vorteile: Keine EMI, hohe Bandbreite, lange Strecken

## Kupfer vs. Glasfaser

| | Kupfer | Glasfaser |
|---|--------|-----------|
| Preis | ✅ Günstig | ❌ Teuer |
| EMI | ❌ Anfällig | ✅ Immun |
| Bandbreite | Begrenzt | Sehr hoch |
| Reichweite | 100m | 100km+ |
| Installation | ✅ Einfach | ❌ Spezialwerkzeug |

> ❗ **IHK-Tipp:** 100m Segmentlänge bei Kupfer IMMER im Kopf haben!

## 🔌 Kabel vergleichen

[INTERACTIVE]

> 💡 Der Kabel-Vergleich zeigt dir alle Eigenschaften auf einen Blick — wähle Kabel zum Vergleich aus!`,
    },
    {
      id: "netz-12",
      title: "Netzwerk-Tools & Befehle",
      duration: "12 min",
      type: "text",
      content: `# Netzwerk-Tools & Befehle 🛠️

## ping (ICMP)
Prüft **Erreichbarkeit** eines Hosts.
\`\`\`
ping 192.168.1.1
→ Antwort: Zeit=1ms TTL=64
\`\`\`
Zeigt: RTT (Round-Trip-Time), Paketverlust

## traceroute / tracert
Zeigt den **Weg zum Ziel** (Hop-by-Hop).
\`\`\`
traceroute google.com
→ 1  192.168.1.1  1ms
→ 2  10.0.0.1  5ms
→ ...
\`\`\`

## ipconfig (Windows) / ip addr (Linux)
Zeigt **Netzwerkkonfiguration**.
\`\`\`
ipconfig /all         → Alles anzeigen
ipconfig /release     → IP freigeben (DHCP)
ipconfig /renew       → Neue IP anfordern
ipconfig /displaydns  → DNS-Cache
\`\`\`

## nslookup / dig
**DNS-Abfrage** durchführen.
\`\`\`
nslookup example.com  → IP-Adresse
nslookup -type=MX example.com → Mailserver
\`\`\`

## netstat
Zeigt **aktive Verbindungen** und offene Ports.
\`\`\`
netstat -an  → Alle Verbindungen mit Portnummern
\`\`\`

## Wireshark
**Netzwerk-Sniffer**: Zeichnet alle Pakete auf.
- Capture: Alle Pakete aufzeichnen
- Filter: Nach IP, Protokoll, Port
- Analyse: Protokoll-Details

> ❗ **IHK-Tipp:** Wireshark als Diagnosewerkzeug nennen können!`,
    },
  ],
};
