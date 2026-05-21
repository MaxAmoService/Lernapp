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

  // ER-Diagramme (erweitert)
  { id: "ihk-erd-1", moduleId: "ihk-diagramme", front: "Welche Symbole gibt es im ER-Modell?", back: "Rechteck = Entität, Ellipse = Attribut, Raute = Beziehung, Unterstrichen = PK", category: "ER" },
  { id: "ihk-erd-2", moduleId: "ihk-diagramme", front: "Was darf an einer Raute stehen?", back: "Attribute — aber nur bei n:m Beziehungen sinnvoll (z.B. Note bei Schüler↔Kurse)", category: "ER" },
  { id: "ihk-erd-3", moduleId: "ihk-diagramme", front: "Häufigste Fehler bei ER-Diagrammen?", back: "Kreise (Ringabhängigkeiten), redundante Beziehungen, n:m statt 1:n, Plural statt Singular", category: "ER" },

  // UML
  { id: "ihk-uml-1", moduleId: "ihk-diagramme", front: "Was ist ein UML-Klassendiagramm?", back: "Zeigt die Struktur eines Programms: Klassen mit Attributen und Methoden", category: "UML" },
  { id: "ihk-uml-2", moduleId: "ihk-diagramme", front: "Was bedeuten +, -, # in UML?", back: "+ = public, - = private, # = protected", category: "UML" },
  { id: "ihk-uml-3", moduleId: "ihk-diagramme", front: "Komposition vs Aggregation in UML?", back: "Komposition (volles Diamond): Teil wird mit gelöscht. Aggregation (leeres Diamond): Teil existiert unabhängig", category: "UML" },
  { id: "ihk-uml-4", moduleId: "ihk-diagramme", front: "Wie zeigt man Vererbung in UML?", back: "Durchgezogene Linie mit leerer Pfeilspitze (Dreieck) — Kind → Eltern", category: "UML" },
  { id: "ihk-uml-5", moduleId: "ihk-diagramme", front: "Was ist eine Abhängigkeit in UML?", back: "Gestrichelte Linie mit Pfeil — Klasse nutzt eine andere temporär", category: "UML" },

  // EPK (erweitert)
  { id: "ihk-epk-1", moduleId: "ihk-diagramme", front: "UND vs ODER vs XOR in EPK?", back: "UND: alle Pfade gleichzeitig. ODER: mind. ein Pfad. XOR: genau ein Pfad", category: "EPK" },
  { id: "ihk-epk-2", moduleId: "ihk-diagramme", front: "Welche Elemente hat eine EPK?", back: "Ereignis (abgerundet), Funktion (Rechteck), Verknüpfungen (UND/ODER/XOR)", category: "EPK" },

  // Struktogramm (erweitert)
  { id: "ihk-struk-1", moduleId: "ihk-diagramme", front: "3 Grundstrukturen im Struktogramm?", back: "Sequenz (nacheinander), Verzweigung (IF/ELSE), Schleife (WHILE/DO)", category: "Struktogramm" },
  { id: "ihk-struk-2", moduleId: "ihk-diagramme", front: "WHILE vs DO-WHILE?", back: "WHILE: Prüfung VOR dem Durchlauf (kann 0-mal laufen). DO-WHILE: Prüfung NACH dem Durchlauf (mind. 1-mal)", category: "Struktogramm" },

  // Sequenzdiagramm
  { id: "ihk-seq-1", moduleId: "ihk-diagramme", front: "Was zeigt ein Sequenzdiagramm?", back: "Kommunikation zwischen Objekten über die Zeit — Lebenslinien + Nachrichten", category: "Sequenz" },
  { id: "ihk-seq-2", moduleId: "ihk-diagramme", front: "Durchgezogener vs gestrichelter Pfeil im Sequenzdiagramm?", back: "Durchgezogen = synchrone Nachricht (wartet). Gestrichelt = Antwort/Return", category: "Sequenz" },

  // Netzplan
  { id: "ihk-net-1", moduleId: "ihk-diagramme", front: "Was ist der kritische Weg im Netzplan?", back: "Längster Pfad — bestimmt die Mindestdauer des Projekts", category: "Netzplan" },
  { id: "ihk-net-2", moduleId: "ihk-diagramme", front: "Wie berechnet man früheste Zeitpunkte?", back: "Vorwärtsrechnung (links→rechts): Frühester Start = max aller Vorgänger-Endzeiten", category: "Netzplan" },
  { id: "ihk-net-3", moduleId: "ihk-diagramme", front: "Gesamtpuffer vs Freier Puffer?", back: "GP: Verzögerung ohne Projektende zu verschieben. FP: Verzögerung ohne Nachfolger zu beeinflussen", category: "Netzplan" },

  // Allgemein
  { id: "ihk-allg-1", moduleId: "ihk-diagramme", front: "Wann nimmt man welches Diagramm?", back: "ER=DB planen, UML=Software-Struktur, EPK=Geschäftsprozesse, Struktogramm=Programmlogik, Netzplan=Projektplanung", category: "Allgemein" },
];

// ─── IHK Datenbanken ───────────────────────────────────────────────────────

export const datenbankFlashcards: Flashcard[] = [
  // Grundbegriffe
  { id: "db-gr-1", moduleId: "ihk-datenbanken", front: "Was ist ein Primärschlüssel (PK)?", back: "Eindeutiger Identifikator einer Zeile — eindeutig, NOT NULL, ändert sich nie. z.B. KundenID", category: "Grundbegriffe" },
  { id: "db-gr-2", moduleId: "ihk-datenbanken", front: "Was ist ein Fremdschlüssel (FK)?", back: "Verweis auf den PK einer anderen Tabelle — stellt die Beziehung her", category: "Grundbegriffe" },
  { id: "db-gr-3", moduleId: "ihk-datenbanken", front: "Was bedeutet Atomarität?", back: "Jede Zelle enthält genau einen Wert — nicht weiter teilbar", category: "Grundbegriffe" },
  { id: "db-gr-4", moduleId: "ihk-datenbanken", front: "Was ist referenzielle Integrität?", back: "FK muss auf existierenden PK verweisen — kein Löschen bei bestehenden Verweisen", category: "Grundbegriffe" },
  { id: "db-gr-5", moduleId: "ihk-datenbanken", front: "Entität vs Attribut?", back: "Entität = Zeile (z.B. ein Kunde). Attribut = Spalte (z.B. Name, Email)", category: "Grundbegriffe" },
  { id: "db-gr-6", moduleId: "ihk-datenbanken", front: "Was ist Redundanz?", back: "Daten werden mehrfach gespeichert — bei Änderung müssen ALLE Kopien angepasst werden", category: "Grundbegriffe" },
  { id: "db-gr-7", moduleId: "ihk-datenbanken", front: "3 Arten von Anomalien?", back: "Einfügen (geht nicht), Ändern (alle Kopien), Löschen (verliert andere Daten)", category: "Grundbegriffe" },

  // Kardinalitäten
  { id: "db-ka-1", moduleId: "ihk-datenbanken", front: "Was ist eine 1:1 Beziehung?", back: "Ein Datensatz A ist genau einem B zugeordnet. z.B. Mitarbeiter ↔ Arbeitsplatz", category: "Kardinalitäten" },
  { id: "db-ka-2", moduleId: "ihk-datenbanken", front: "Was ist eine 1:n Beziehung?", back: "Ein Datensatz A kann mehrere B haben. z.B. Kunde → Bestellungen. FK auf n-Seite!", category: "Kardinalitäten" },
  { id: "db-ka-3", moduleId: "ihk-datenbanken", front: "Was ist eine n:m Beziehung?", back: "Beide Seiten können mehrere Partner haben. z.B. Schüler ↔ Kurse. Erzeugt IMMER Verweistabelle!", category: "Kardinalitäten" },
  { id: "db-ka-4", moduleId: "ihk-datenbanken", front: "Wo kommt der FK bei 1:n hin?", back: "Auf die n-Seite (die 'viele' Seite). z.B. KundenID in Bestellung", category: "Kardinalitäten" },
  { id: "db-ka-5", moduleId: "ihk-datenbanken", front: "Was enthält eine Verweistabelle?", back: "FKs beider Tabellen als zusammengesetztes PK + optionale Beziehungsattribute", category: "Kardinalitäten" },

  // Normalisierung
  { id: "db-nf-1", moduleId: "ihk-datenbanken", front: "Was verlangt die 1NF?", back: "Alle Werte atomar — keine mehrwertigen Attribute, keine wiederholenden Gruppen", category: "Normalisierung" },
  { id: "db-nf-2", moduleId: "ihk-datenbanken", front: "Was verlangt die 2NF?", back: "1NF + alle Nicht-Schlüssel-Attribute vollständig abhängig vom gesamten PK", category: "Normalisierung" },
  { id: "db-nf-3", moduleId: "ihk-datenbanken", front: "Was verlangt die 3NF?", back: "2NF + keine transitiven Abhängigkeiten", category: "Normalisierung" },
  { id: "db-nf-4", moduleId: "ihk-datenbanken", front: "Was ist eine transitive Abhängigkeit?", back: "PK → A → B. B hängt nicht direkt vom PK ab. z.B. KundenID → PLZ → Stadt", category: "Normalisierung" },
  { id: "db-nf-5", moduleId: "ihk-datenbanken", front: "Ziel der Normalisierung?", back: "Redundanzen & Anomalien vermeiden. Balance: 3NF (nicht 5NF) = Standard", category: "Normalisierung" },

  // SQL
  { id: "db-sql-1", moduleId: "ihk-datenbanken", front: "Was ist SQL?", back: "Structured Query Language — deklarative Sprache für relationale DB. Keine Schleifen!", category: "SQL" },
  { id: "db-sql-2", moduleId: "ihk-datenbanken", front: "5 SQL-Kategorien?", back: "DDL (Struktur), DML (Inhalt), DQL (Abfrage), DCL (Rechte), TCL (Transaktionen)", category: "SQL" },
  { id: "db-sql-3", moduleId: "ihk-datenbanken", front: "Was macht DDL?", back: "CREATE, ALTER, DROP, TRUNCATE — Struktur der Tabelle ändern", category: "SQL" },
  { id: "db-sql-4", moduleId: "ihk-datenbanken", front: "Was macht DML?", back: "INSERT, UPDATE, DELETE — Daten in der Tabelle ändern", category: "SQL" },
  { id: "db-sql-5", moduleId: "ihk-datenbanken", front: "Was macht DQL?", back: "SELECT — Daten abfragen", category: "SQL" },
  { id: "db-sql-6", moduleId: "ihk-datenbanken", front: "DROP vs TRUNCATE vs DELETE?", back: "DROP: Tabelle komplett weg. TRUNCATE: leeren, Struktur bleibt. DELETE: Zeilen löschen (mit WHERE)", category: "SQL" },
  { id: "db-sql-7", moduleId: "ihk-datenbanken", front: "Was macht DCL?", back: "GRANT (Rechte erteilen) und REVOKE (Rechte entziehen)", category: "SQL" },
  { id: "db-sql-8", moduleId: "ihk-datenbanken", front: "Was macht TCL?", back: "BEGIN, COMMIT, ROLLBACK — Transaktionen steuern", category: "SQL" },

  // JOINs
  { id: "db-jo-1", moduleId: "ihk-datenbanken", front: "Was macht INNER JOIN?", back: "Nur Zeilen mit Match in BEIDEN Tabellen", category: "JOINs" },
  { id: "db-jo-2", moduleId: "ihk-datenbanken", front: "Was macht LEFT JOIN?", back: "Alle Zeilen links + passende rechts. NULL wenn kein Match", category: "JOINs" },
  { id: "db-jo-3", moduleId: "ihk-datenbanken", front: "Was macht CROSS JOIN?", back: "Kartesisches Produkt — jede Kombination. 3×4=12 Zeilen", category: "JOINs" },
  { id: "db-jo-4", moduleId: "ihk-datenbanken", front: "JOIN vs SELECT mit WHERE?", back: "Gleiche Ergebnisse, aber JOIN ist schneller und lesbarer", category: "JOINs" },

  // ACID
  { id: "db-ac-1", moduleId: "ihk-datenbanken", front: "Was steht ACID für?", back: "Atomicity, Consistency, Isolation, Durability", category: "ACID" },
  { id: "db-ac-2", moduleId: "ihk-datenbanken", front: "Was bedeutet Atomicity?", back: "Alles oder nichts — Transaktion ganz oder gar nicht", category: "ACID" },
  { id: "db-ac-3", moduleId: "ihk-datenbanken", front: "Was bedeutet Durability?", back: "Nach COMMIT dauerhaft gespeichert — auch bei Stromausfall (Transaktionslog)", category: "ACID" },

  // Phasen
  { id: "db-ph-1", moduleId: "ihk-datenbanken", front: "4 Phasen der Datenbankplanung?", back: "Extern (Anforderungen) → Konzeptionell (ERM) → Logisch (Tabellen/3NF) → Physisch (SQL)", category: "Phasen" },
  { id: "db-ph-2", moduleId: "ihk-datenbanken", front: "Was passiert in der konzeptionellen Phase?", back: "ER-Modell erstellen: Entitäten, Attribute, Beziehungen, Kardinalitäten", category: "Phasen" },

  // Backups
  { id: "db-bu-1", moduleId: "ihk-datenbanken", front: "Full Backup vs Transaktions-Backup?", back: "Full: gesamte DB. Transaktion: nur Änderungen seit letztem Backup", category: "Backups" },
  { id: "db-bu-2", moduleId: "ihk-datenbanken", front: "Wie stellt man eine DB wieder her?", back: "1. Letztes Full Backup, 2. Alle Transaktions-Backups der Reihe nach einspielen", category: "Backups" },
  { id: "db-bu-3", moduleId: "ihk-datenbanken", front: "Was ist die 3-2-1-Regel?", back: "3 Kopien, 2 verschiedene Medien, 1 Kopie an anderem Ort", category: "Backups" },
];

// ─── Alle Flashcards zusammen ───────────────────────────────────────────────

export const allFlashcards: Flashcard[] = [
  ...netzwerkFlashcards,
  ...reactFlashcards,
  ...typescriptFlashcards,
  ...ihkFlashcards,
  ...datenbankFlashcards,
];

export function getFlashcardsForModule(moduleId: string): Flashcard[] {
  return allFlashcards.filter((c) => c.moduleId === moduleId);
}
