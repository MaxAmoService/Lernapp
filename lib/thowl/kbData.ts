import { Module } from "../types";

export const thowlKBModule: Module = {
  id: "thowl-kb", slug: "thowl-kb",
  title: "Kommunikationssysteme & Bussysteme",
  description: "TH OWL: Bussysteme (CAN, LIN, FlexRay, MOST), OSI im Fahrzeug, Echtzeitkommunikation, AUTOSAR, Signalübertragung — mit Original-Klausurfragen.",
  icon: "🔌", color: "#10B981", progress: 0, category: "studium",
  lessons: [
    {
      id: "kb-grundlagen", title: "1. Bussysteme im Fahrzeug", duration: "30 min", type: "text",
      content: "## Bussysteme — Die Nervenbahnen des Fahrzeugs\n\nModerne Fahrzeuge: bis zu **100 Steuergeräte (ECUs)** über Bussysteme vernetzt.\n\n### Vergleich\n\n| Bus | Datenrate | Topologie | Einsatz |\n|-----|----------|-----------|--------|\n| LIN | 20 kbit/s | Master-Slave | Komfort |\n| CAN | 1 Mbit/s | Bus (Multimaster) | Antrieb |\n| CAN FD | 8 Mbit/s | Bus | Wie CAN |\n| FlexRay | 10 Mbit/s | Stern/Bus | X-by-Wire |\n| MOST | 150 Mbit/s | Ring | Infotainment |\n| Automotive Ethernet | 100M-10G | Stern | ADAS, Backbone |\n\n### Bus-Hierarchie\n\n    Ethernet (Backbone)     ← ADAS, Kameras\n        │\n    FlexRay / CAN FD       ← Fahrwerk (zeitkritisch!)\n        │\n    CAN                    ← Motor, Bremse\n        │\n    LIN                    ← Fensterheber, Sitze\n\n> Je sicherheitskritischer, desto deterministischer der Bus!",
    },
    {
      id: "kb-can", title: "2. CAN-Bus (Controller Area Network)", duration: "40 min", type: "text",
      content: "## CAN-Bus\n\n1986 von Bosch entwickelt. In JEDEM Fahrzeug.\n\n### Physikalische Schicht\n\n- Differentielle Übertragung: CAN_H und CAN_L (Twisted Pair)\n- Pegel: Dominant (0) = CAN_H > CAN_L, Rezessiv (1) = beide ~2,5V\n- **Dominant gewinnt!** → Kollisionsauflösung im Protokoll (CSMA/CA)\n\n### Frame (Standard, 11-Bit ID)\n\n    SOF(1) | ID(11) | RTR(1) | IDE(1) | r0(1) | DLC(4) | DATA(0-8B) | CRC(15) | ACK(2) | EOF(7)\n\n### Arbitrierung\n\n1. Teilnehmer beginnt mit ID\n2. Bit für Bit: 0 (dominant) überschreibt 1 (rezessiv)\n3. **Niedrigere ID = höhere Priorität!**\n4. Verlierer wird Empfänger\n\n> Keine Kollisionen, keine Datenverluste!\n\n### Fehlererkennung (5 Mechanismen!)\n\n1. Bit Monitoring\n2. CRC-Check (15 Bit)\n3. Form Check\n4. Stuff Error (6 gleiche Bits)\n5. Ack Check\n\n### Fehlerzustände\n\n- Error Active (TEC < 128)\n- Error Passive (TEC ≥ 128)\n- Bus Off (TEC ≥ 256) → trennt sich",
    },
    {
      id: "kb-flexray", title: "3. FlexRay & zeitgesteuerte Protokolle", duration: "35 min", type: "text",
      content: "## FlexRay — Determinismus für X-by-Wire\n\nCAN = ereignisgesteuert. FlexRay = **zeitgesteuert** → garantierte Antwortzeiten.\n\n### Kommunikationszyklus\n\n    ┌────────────────┬──────────────────┬──────────┐\n    │ Statisch (TDMA)│ Dynamisch (FTDMA) │ NIT      │\n    │ deterministisch │ ereignisgesteuert │ Sync     │\n    └────────────────┴──────────────────┴──────────┘\n\n### Redundanz\n\nZwei Kanäle (A und B): Redundant (gleiche Daten) oder Parallel (doppelte Bandbreite).\n\n### Parameter\n\n| Parameter | Typisch |\n|-----------|--------|\n| Cycle Length | 5 ms |\n| Macrotick | 1 µs |\n| Static Slots | 62 |",
    },
    {
      id: "kb-autosar", title: "4. AUTOSAR", duration: "35 min", type: "text",
      content: "## AUTOSAR (AUTomotive Open System ARchitecture)\n\n### Classic vs. Adaptive\n\n| | Classic | Adaptive |\n|---|---------|----------|\n| Ziel | Echtzeit-ECUs | Hochleistungsrechner |\n| OS | OSEK | POSIX (Linux) |\n| Sprache | C | C++ |\n| Einsatz | Motor, Bremse | ADAS, Gateway |\n\n### Schichten (Classic)\n\n    SWC (Applikation)          ← Anwendung\n    RTE (Runtime Environment)  ← Middleware / VFB\n    BSW (Basis-Software)       ← Dienste, COM, OS\n    MCAL                       ← Treiber\n    Hardware (ECU)             ← Steuergerät\n\n### VFB (Virtual Functional Bus)\n\nSWCs kommunizieren ohne zu wissen, auf welchem Steuergerät sie laufen.\n\n- **Sender-Receiver:** 1 sendet, viele empfangen (Sensordaten)\n- **Client-Server:** 1 stellt Dienst, andere rufen auf",
    },
    {
      id: "kb-signale", title: "5. Signalübertragung", duration: "30 min", type: "text",
      content: "## Signalübertragung\n\n### Leitungstheorie\n\nCharakteristische Impedanz: $Z_0 = \\\\sqrt{(R + j\\\\omega L)/(G + j\\\\omega C)}$\n\n### Reflexion\n\n$\\\\Gamma = (Z_L - Z_0)/(Z_L + Z_0)$ (Reflexionskoeffizient)\n\n- $\\\\Gamma = 0$: Perfekte Anpassung\n- $\\\\Gamma = 1$: Offenes Ende\n- $\\\\Gamma = -1$: Kurzschluss\n\n### Terminierung\n\nCAN: **120Ω** Abschlusswiderstände an beiden Bus-Enden.\n\n### Augendiagramm\n\nÜberlagerung vieler Bits → Signalqualität:\n- Große Öffnung = gut\n- Geschlossen = Rauschen, Jitter\n\n### EMV\n\n- Störaussendung: Bus stört andere\n- Störfestigkeit: Andere stören Bus\n- **Twisted Pair** reduziert Abstrahlung",
    },
    {
      id: "kb-klausur", title: "Probeklausur KB — 10 Fragen", duration: "45 min", type: "quiz", examMode: true,
      content: "## KB Probeklausur — 10 Fragen\n\n### Frage 1\nNiedrigste Datenrate?\nA) CAN\nB) LIN\nC) FlexRay\nD) MOST\n\nRichtig: **B.** LIN = 20 kbit/s.\n\n### Frage 2\nCSMA/CA?\nA) Kollisionsvermeidung\nB) Central System Mgmt\nC) Continuous Signal Modulation\nD) Carrier Sync\n\nRichtig: **A.** CAN: Dominant gewinnt.\n\n### Frage 3\nCAN Bus Off ab...\nA) TEC ≥ 96\nB) TEC ≥ 128\nC) TEC ≥ 256\nD) REC ≥ 256\n\nRichtig: **C.**\n\n### Frage 4\nFlexRay statisches Segment?\nA) CSMA/CA\nB) TDMA\nC) Token Passing\nD) Polling\n\nRichtig: **B.** Feste Zeitschlitze.\n\n### Frage 5\nCAN Abschlusswiderstand?\nA) 50 Ω\nB) 100 Ω\nC) 120 Ω\nD) 250 Ω\n\nRichtig: **C.**\n\n### Frage 6\nAUTOSAR: SWCs verbindet...\nA) BSW\nB) RTE\nC) MCAL\nD) COM Stack\n\nRichtig: **B.** Runtime Environment.\n\n### Frage 7\nCAN Daten max.?\nA) 4 Bytes\nB) 8 Bytes\nC) 16 Bytes\nD) 64 Bytes\n\nRichtig: **B.** CAN FD: bis 64 Bytes.\n\n### Frage 8\nImpedanz-Fehlanpassung → ?\nA) Höhere Rate\nB) Signalreflexion\nC) Weniger Strom\nD) Auto-Terminierung\n\nRichtig: **B.**\n\n### Frage 9\nAUTOSAR = ?\nA) Automated Safety Architecture\nB) AUTomotive Open System ARchitecture\nC) Automatic OS for Auto\nD) Authorized Open Source Arch\n\nRichtig: **B.**\n\n### Frage 10\nInfotainment-Bus?\nA) LIN\nB) CAN\nC) MOST / Automotive Ethernet\nD) SENT\n\nRichtig: **C.** Hohe Bandbreite für Multimedia.",
    },
  ],
};
