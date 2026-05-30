import { Module } from "./types";

// ============================================================================
// IHK "IT-Sicherheit" — Modul-Daten
// Quelle: IHK AP1/AP2, OWASP, BSI IT-Grundschutz
// ============================================================================

export const itSicherheitModule: Module = {
  id: "ihk-it-sicherheit",
  slug: "ihk-it-sicherheit",
  title: "IT-Sicherheit",
  description:
    "IHK AP1/AP2: Netzwerksicherheit, Web-Security, Verschlüsselung, Social Engineering, OWASP Top 10",
  icon: "🔒",
  color: "#EF4444",
  category: "ihk",
  progress: 0,

  merkblatt: `## 📋 Merkblatt: IT-Sicherheit (IHK)

### CIA-Triade (Grundpfeiler)
- **C**onfidentiality (Vertraulichkeit) — nur Befugte haben Zugriff
- **I**ntegrity (Integrität) — Daten sind unverändert/korrekt
- **A**vailability (Verfügbarkeit) — Systeme sind stets nutzbar

### Authentifizierung vs. Autorisierung
- **Authentifizierung:** Identitätsnachweis (Passwort, Biometrie, Token)
- **Autorisierung:** Berechtigungsprüfung (Was darf die Person?)
- **Multi-Faktor (MFA):** Kombination aus Wissen, Besitz, Biometrie

### Verschlüsselung
| Typ | Beispiel | Key | Einsatz |
|-----|----------|-----|---------|
| Symmetrisch | AES-256 | 1 gemeinsamer Key | Datenverschlüsselung |
| Asymmetrisch | RSA | Public + Private Key | Key-Austausch, Signaturen |
| Hashing | SHA-256 | kein Key (einweg) | Passwörter, Integrität |
- **Salting:** Zufälliger Wert vor dem Hash → schützt gegen Rainbow Tables
- **Digitale Signatur:** Hash wird mit Private Key verschlüsselt → Authentizität + Integrität

### OWASP Top 10 (Web-Sicherheitsrisiken)
1. **Broken Access Control** — fehlende Zugriffskontrolle
2. **Cryptographic Failures** — schwache Verschlüsselung
3. **Injection** — SQL, NoSQL, OS Command Injection
4. **Insecure Design** — unsichere Architektur
5. **Security Misconfiguration** — Default-Passwörter, offene Ports
6. **Vulnerable Components** — veraltete Bibliotheken
7. **Authentication Failures** — schwache Auth-Mechanismen
8. **Data Integrity Failures** — ungesicherte Updates/CI/CD
9. **Logging Failures** — fehlendes Monitoring
10. **SSRF** — Server-Side Request Forgery

### Angriffsarten
- **SQL-Injection:** SQL-Code über Eingabefelder einschleusen → Prepared Statements!
- **XSS (Cross-Site Scripting):** JavaScript in Webseiten einschleusen → Output Encoding!
- **CSRF:** Aktionen im Namen des Opfers ausführen → CSRF Tokens!
- **MITM:** Kommunikation abhören/manipulieren → TLS/SSL!
- **DDoS:** Server mit Anfragen überlasten → Rate Limiting, CDN!
- **Phishing/Tailgating:** Social Engineering → Schulung!

### Netzwerksicherheit
- **Firewall:** Filtert Verkehr nach Regeln (Ports, IPs, Protokolle)
- **IDS:** Intrusion Detection System — erkennt Angriffe (warnt)
- **IPS:** Intrusion Prevention System — erkennt + blockiert automatisch
- **VPN:** Verschlüsselter Tunnel durchs Internet (IPSec, OpenVPN, WireGuard)
- **DMZ:** Demilitarisierte Zone — Puffer zwischen Internet und internem Netz

### Schutzkonzepte
- **Defense in Depth:** Mehrere Sicherheitsschichten
- **Least Privilege:** Minimale Berechtigungen vergeben
- **Separation of Duties:** Aufgaben trennen (kein Einzelner hat alle Rechte)
- **3-2-1 Backup:** 3 Kopien, 2 Medien, 1 extern
- **BSI IT-Grundschutz:** Standardisierte Schutzmaßnahmen

### Social Engineering
| Methode | Beschreibung |
|---------|-------------|
| Phishing | Gefälschte E-Mails/Webseiten |
| Spear-Phishing | Zielgerichtet auf bestimmte Person |
| Pretexting | Fake-Identität/Vorwand am Telefon |
| Baiting | Lockmittel (USB-Stick, Datei) |
| Tailgating | Hinter jemandem durch Tür gehen`,

  lessons: [
    {
      id: "sec-1",
      title: "Sicherheitsgrundlagen",
      duration: "15 min",
      type: "interactive",
      interactive: "securityThreatExplorer" as const,
      content: `## Sicherheitsgrundlagen

> In diesem Modul lernst du die Grundlagen der IT-Sicherheit kennen — von der CIA-Triade über Verschlüsselung bis zu Netzwerksicherheit und Rechteverwaltung. Sicherheit ist in der IHK-Prüfung ein Dauerthema und durchzieht alle anderen Fachgebiete!

> Netzwerk-Protokolle und Ports, die hier immer wieder auftauchen, behandeln wir auch im Modul "Netzwerktechnik" — dort mit Fokus auf das OSI-Modell und die Schichten 1–7.

### Die CIA-Triade

Alle IT-Sicherheitsmaßnahmen zielen auf drei Grundziele ab:

- **Confidentiality (Vertraulichkeit):** Nur autorisierte Personen haben Zugriff auf Daten und Systeme
- **Integrity (Integrität):** Daten sind korrekt und unverändert — niemand hat sie manipuliert
- **Availability (Verfügbarkeit):** Systeme und Daten sind zugänglich, wenn sie gebraucht werden

> **Merke:** Jede Sicherheitsmaßnahme lässt sich einem oder mehreren dieser drei Ziele zuordnen!

### Bedrohungen & Angriffsvektoren

Ein **Angriffsvektor** ist der Weg, den ein Angreifer nutzt, um in ein System einzudringen:

- **Technisch:** Malware, Exploits, SQL-Injection, DDoS
- **Menschlich:** Social Engineering, Phishing, Pretexting
- **Physisch:** Einbruch, Diebstahl, Tailgating

### Schadsoftware (Malware) im Überblick

| Art | Beschreibung | Schutz |
|-----|-------------|--------|
| **Virus** | Braucht einen Wirt, verbreitet sich durch Nutzeraktion | Virenscanner |
| **Wurm** | Selbstreplizierend, nutzt Netzwerk | Firewall, Updates |
| **Trojaner** | Tarnung als nützliches Programm | Quellen prüfen |
| **Ransomware** | Verschlüsselt Daten, fordert Lösegeld | Backups, Schulung |
| **Spyware** | Späht Daten heimlich aus | Virenscanner |
| **Keylogger** | Protokolliert Tastatureingaben | Virtuelle Tastatur |

[INTERACTIVE:securityThreatExplorer]

### Schutzmaßnahmen — Defense in Depth

Das Prinzip der **mehreren Sicherheitsschichten**:

1. **Physisch:** Zugangskontrollen, Serverräume
2. **Netzwerk:** Firewalls, IDS/IPS, VPN
3. **System:** Updates, Hardening, Antivirus
4. **Anwendung:** Input Validation, Secure Coding
5. **Daten:** Verschlüsselung, Backup
6. **Mensch:** Schulung, Awareness

> **IHK-Tipp:** Fragen zu Sicherheitszielen und Angriffsarten kommen häufig in AP1/AP2 vor!
`,
    },
    {
      id: "sec-2",
      title: "Authentifizierung & Passwörter",
      duration: "15 min",
      type: "interactive",
      interactive: "passwordStrengthChecker" as const,
      content: `## Authentifizierung & Passwörter

### Authentifizierung vs. Autorisierung

- **Authentifizierung:** "Wer bist du?" — Identitätsnachweis
- **Autorisierung:** "Was darfst du?" — Berechtigungsprüfung

> **Beispiel:** Du zeigst deinen Ausweis am Eingang (Authentifizierung). Dann entscheidet der Zutrittsausweis, welche Räume du betreten darfst (Autorisierung).

### Drei Faktoren der Authentifizierung

| Faktor | Beispiel | Schwäche |
|--------|---------|----------|
| **Wissen** (etwas das du weißt) | Passwort, PIN | Erraten, Phishing |
| **Besitz** (etwas das du hast) | Smartphone, Token, Smartcard | Diebstahl, Verlust |
| **Biometrie** (etwas das du bist) | Fingerabdruck, Iris, Gesicht | Kopierbar, änderbar |

**Multi-Faktor-Authentifizierung (MFA)** kombiniert mindestens 2 Faktoren — deutlich sicherer als nur Passwort!

### Passwortsicherheit

**Gute Passwörter:**
- Mindestens **12 Zeichen** (besser 16+)
- Mix aus Groß-/Kleinbuchstaben, Zahlen, Sonderzeichen
- Keine Wörter aus dem Wörterbuch
- Für jeden Dienst ein anderes Passwort

**Passwort-Hashing:**

Das Passwort wird NIEMALS im Klartext gespeichert, sondern als **Hash**:

\`\`\`
Passwort: "Hallo123"
SHA-256: 5b722b307fce6c944905d132691d8e022b23bea0...
\`\`\`

**Salting** — Schutz gegen Rainbow-Table-Angriffe:
\`\`\`
Passwort: "Hallo123" + Salt: "x7Kp9"
→ SHA-256("Hallo123x7Kp9"): a3f8c2... (anderer Hash!)
\`\`\`

[INTERACTIVE:passwordStrengthChecker]

### Passwort-Manager

**Warum Passwort-Manager?**
- Du musst dir nur EIN Master-Passwort merken
- Generiert sichere, einzigartige Passwörter
- Speichert sie verschlüsselt

> **IHK-Tipp:** Erkläre den Unterschied zwischen Hashing und Verschlüsselung — das kommt oft in Prüfungen!
`,
    },
    {
      id: "sec-3",
      title: "Netzwerksicherheit",
      duration: "15 min",
      type: "interactive",
      interactive: "firewallRuleBuilder" as const,
      content: `## Netzwerksicherheit

### Firewall

Eine **Firewall** filtert den Netzwerkverkehr anhand definierter Regeln:

- **Packet Filtering:** Prüft Header (IP, Port, Protokoll)
- **Stateful Inspection:** Verfolgt Verbindungsstatus
- **Application Layer:** Prüft Anwendungsdaten (z.B. HTTP)

**Regel-Beispiel:**
| Regel | Quelle | Ziel | Port | Aktion |
|-------|--------|------|------|--------|
| 1 | Intern | Webserver | 80/443 | Erlauben |
| 2 | Extern | Webserver | 22 | Blockieren |
| 3 | Alle | Alle | Sonst | Blockieren |

[INTERACTIVE:firewallRuleBuilder]

### IDS vs. IPS

| | IDS | IPS |
|-|-----|-----|
| **Volllform** | Intrusion Detection System | Intrusion Prevention System |
| **Aktion** | Erkennt + warnt | Erkennt + blockiert |
| **Position** | Parallel zum Verkehr | Inline im Verkehr |
| **Reaktion** | Alert/Log | Automatisch aktiv |

### VPN (Virtual Private Network)

Ein **VPN** erstellt einen verschlüsselten Tunnel durch das Internet:

- **Nutzung:** Remote-Zugriff auf Firmennetz
- **Protokolle:** IPSec, OpenVPN, WireGuard
- **Vorteil:** Daten sind auch in unsicheren Netzen (z.B. WLAN) geschützt

### DMZ (Demilitarisierte Zone)

\`\`\`
Internet → [Firewall 1] → DMZ (Webserver, Mailserver)
                              → [Firewall 2] → Internes Netz
\`\`\`

Die DMZ ist ein Pufferbereich — öffentliche Server stehen hier, das interne Netz bleibt geschützt.

### Wichtige Ports (IHK!)

| Port | Dienst | Verschlüsselt? |
|------|--------|---------------|
| 20/21 | FTP | ❌ (unsicher) |
| 22 | SSH | ✅ |
| 25 | SMTP | ❌ / ✅ (STARTTLS) |
| 80 | HTTP | ❌ |
| 443 | HTTPS | ✅ |
| 3306 | MySQL | ❌ |

> **Merke:** Port 443 = HTTPS, Port 80 = HTTP, Port 22 = SSH — die drei wichtigsten!
`,
    },
    {
      id: "sec-4",
      title: "Web-Security (OWASP Top 10)",
      duration: "20 min",
      type: "interactive",
      interactive: "sqlInjectionSimulator" as const,
      content: `## Web-Security — OWASP Top 10

Die **OWASP Top 10** sind die kritischsten Web-Sicherheitsrisiken. In der IHK-Prüfung werden oft Szenarien zu SQL-Injection und XSS abgefragt.

### 1. SQL-Injection

Der Angreifer schleust SQL-Code über Eingabefelder ein:

**Angriff auf ein Login-Formular:**
\`\`\`sql
-- Normale Eingabe:
SELECT * FROM users WHERE name='max' AND pw='123'

-- Injection (Benutzername: ' OR 1=1 --):
SELECT * FROM users WHERE name='' OR 1=1 --' AND pw='123'
-- Ergebnis: ALLE Benutzer werden zurückgegeben → Login umgangen!
\`\`\`

**Schutz: Prepared Statements**
\`\`\`java
// UNSICHER:
query = "SELECT * FROM users WHERE name='" + input + "'";

// SICHER (PreparedStatement):
stmt = conn.prepareStatement("SELECT * FROM users WHERE name=?");
stmt.setString(1, input);
\`\`\`

[INTERACTIVE:sqlInjectionSimulator]

### 2. Cross-Site Scripting (XSS)

Der Angreifer schleust JavaScript-Code in Webseiten ein:

**Stored XSS:** Schadcode wird in der Datenbank gespeichert (z.B. in Kommentaren)
**Reflected XSS:** Schadcode kommt über URL-Parameter

**Schutz:**
- **Output Encoding:** < wird zu &lt;, > wird zu &gt;
- **Content Security Policy (CSP):** Erlaubt nur Skripte von vertrauenswürdigen Quellen
- **HTTPOnly Cookies:** Cookies sind per JavaScript nicht lesbar

### 3. Cross-Site Request Forgery (CSRF)

Der Angreifer lässt den Browser des Opfers eine Aktion auf einer anderen Webseite ausführen:

\`\`\`html
<!-- Opfer besucht bösartige Seite -->
<img src="https://bank.de/ueberweisung?ziel=angreifer&betrag=1000">
\`\`\`

**Schutz:** CSRF Tokens — der Server prüft, ob die Anfrage von der eigenen Seite kommt.

### 4. Broken Authentication

- Schwache Passwörter, fehlende MFA
- Session Hijacking (Session-Cookie stehlen)

### 5. Security Misconfiguration

- Default-Passwörter (admin/admin)
- Debug-Modus im Produktionssystem
- Offene Ports, unnötige Dienste

### 🧃 OWASP Juice Shop — Selber ausprobieren!

Der **OWASP Juice Shop** ist die weltweit modernste absichtlich unsichere Web-App. Du kannst dort ALLE Angriffe aus dieser Lektion in einer echten Web-App üben!

**Öffentliche Demo:** https://juice-shop.herokuapp.com
**GitHub:** https://github.com/juice-shop/juice-shop

**Lokale Installation (Docker):**
\`\`\`bash
docker pull bkimminich/juice-shop
docker run -d -p 3000:3000 bkimminich/juice-shop
# Öffne http://localhost:3000
\`\`\`\n
**Challenges die du lösen solltest:**
1. ⭐ Scoreboard finden (versteckte Seite)
2. ⭐ Login Bypass (SQL Injection)
3. ⭐⭐ Admin Login
4. ⭐⭐⭐ UNION Injection (Daten auslesen)
5. ⭐⭐⭐ XSS in Kommentaren
6. ⭐⭐⭐⭐ JWT Manipulation

> Die Challenges sind Schwierigkeitsgrad 1-6 ⭐. Starte mit Level 1 und steigere dich!

> **IHK-Tipp:** SQL-Injection und XSS sind DIE Klassiker in der Prüfung. Erkläre den Angriff + Schutzmaßnahme!
`,
    },
    {
      id: "sec-5",
      title: "Verschlüsselung & PKI",
      duration: "15 min",
      type: "interactive",
      interactive: "encryptionDemo" as const,
      content: `## Verschlüsselung & PKI

### Symmetrische Verschlüsselung

Ein **gemeinsamer Key** für Ver- und Entschlüsselung:

- **Algorithmen:** AES (128/192/256 Bit), DES (veraltet!), 3DES
- **Vorteil:** Schnell, gut für große Datenmengen
- **Nachteil:** Key-Verteilung ist problematisch (wie übermittelt man den Key sicher?)

\`\`\`
Sender: Plaintext + Key → AES → Ciphertext
Empfänger: Ciphertext + Key → AES → Plaintext
\`\`\`

### Asymmetrische Verschlüsselung

**Zwei Keys:** Public Key (öffentlich) + Private Key (geheim)

- **Algorithmen:** RSA, ECC (Elliptic Curve)
- **Vorteil:** Kein gemeinsames Geheimnis nötig
- **Nachteil:** Langsamer als symmetrisch

\`\`\`
Sender: Plaintext + Public Key → RSA → Ciphertext
Empfänger: Ciphertext + Private Key → RSA → Plaintext
\`\`\`

### Digitale Signatur

Beweist **Authentizität** und **Integrität**:

1. Sender erstellt Hash des Dokuments (SHA-256)
2. Hash wird mit dem **Private Key** verschlüsselt = Signatur
3. Empfänger entschlüsselt mit **Public Key** und vergleicht Hashes

[INTERACTIVE:encryptionDemo]

### PKI (Public Key Infrastructure)

- **CA (Certificate Authority):** Vertrauenswürdige Instanz, die Zertifikate ausstellt
- **Zertifikat:** Bindet einen Public Key an eine Identität (z.B. google.com)
- **TLS-Handshake:** Browser prüft Zertifikat der CA → verschlüsselte Verbindung

**Zertifikatskette:**
\`\`\`
Root CA → Intermediate CA → Server-Zertifikat
\`\`\`

### Hashing vs. Verschlüsselung

| | Hashing | Verschlüsselung |
|-|---------|----------------|
| **Richtung** | Einweg (nicht umkehrbar) | Zweiweg (entschlüsselbar) |
| **Key** | Keiner | Key benötigt |
| **Zweck** | Integrität, Passwörter | Vertraulichkeit |
| **Beispiel** | SHA-256, bcrypt | AES, RSA |

> **IHK-Tipp:** "Erkläre den Unterschied zwischen Hashing und Verschlüsselung" — fast jede Prüfung!
`,
    },
    {
      id: "sec-6",
      title: "Social Engineering & Phishing",
      duration: "15 min",
      type: "interactive",
      interactive: "phishingDetector" as const,
      content: `## Social Engineering & Phishing

### Was ist Social Engineering?

Social Engineering nutzt die **menschliche Psyche** als Angriffsvektor — keine Technik, sondern Manipulation:

- **Vertrauen** aufbauen ("Ich bin von der IT-Abteilung")
- **Druck** erzeugen ("Ihr Konto wird gesperrt!")
- **Neugier** wecken ("Gehaltsliste 2024.xlsx")
- **Hilfsbereitschaft** ausnutzen ("Können Sie mir kurz Zugang geben?")

### Angriffsmethoden

| Methode | Beschreibung | Beispiel |
|---------|-------------|---------|
| **Phishing** | Gefälschte E-Mails/Webseiten | Fake-Bank-Login |
| **Spear-Phishing** | Zielgerichtet auf Person | E-Mail an CEO mit persönlichem Bezug |
| **Whaling** | Angriff auf Führungskräfte | "Dringende Überweisung" an CFO |
| **Pretexting** | Fake-Identität/Vorwand | Anruf als IT-Support |
| **Baiting** | Lockmittel auslegen | USB-Stick im Parkplatz |
| **Tailgating** | Hinter jemandem durch Tür | "Haben Sie Ihre Karte vergessen?" |

### Phishing erkennen — Merkmale

**Verdächtige E-Mails erkennen:**
1. **Absender prüfen:** bank@secure-login.xyz statt @deine-bank.de
2. **Druck/Angst:** "Ihr Konto wird in 24h gesperrt!"
3. **Links prüfen:** Maus drüber — zeigt echte URL?
4. **Rechtschreibfehler:** Professionelle Firmen machen selten Fehler
5. **Anhänge:** .exe, .scr, .zip — nie ungeprüft öffnen!
6. **Persönliche Daten:** Banken fragen NIE per E-Mail nach Passwörtern

[INTERACTIVE:phishingDetector]

### Schutzmaßnahmen

**Technisch:**
- Spam-Filter und Anti-Phishing-Tools
- MFA aktivieren (auch bei gestohlenem Passwort kein Zugriff)
- E-Mail-Authentifizierung (SPF, DKIM, DMARC)

**Organisatorisch:**
- Regelmäßige Schulungen für Mitarbeiter
- Klare Prozesse (z.B. "Keine Überweisungen per E-Mail")
- Meldeprozess für verdächtige E-Mails

**Persönlich:**
- Immer skeptisch sein bei unerwarteten Nachrichten
- Niemals Passwörter per E-Mail/Telefon weitergeben
- Im Zweifel: direkt bei der Firma anrufen (nicht über Links in der Mail!)

> **IHK-Tipp:** Social Engineering-Fragen zielen oft auf die menschliche Schwachstelle ab — "Warum ist der Mensch das schwächste Glied?"
`,
    },
  ],
};
