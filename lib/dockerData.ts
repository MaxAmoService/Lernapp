import { Module } from "./types";

// ============================================================================
// IHK "Docker & Containerisierung" — Modul-Daten
// Quelle: IHK IT-Handbuch + Moritz' Mitschriften
// ============================================================================

export const dockerModule: Module = {
  id: "ihk-docker",
  slug: "ihk-docker",
  title: "Docker & Containerisierung",
  description: "IHK IT-Handbuch: Docker, Container, Images, Dockerfile, Compose, Deployment, Kubernetes-Basics",
  icon: "🐳",
  color: "#2496ED",
  category: "ihk",
  progress: 0,
  merkblatt: `## 📋 Merkblatt: Docker & Containerisierung (IHK)

### Was ist Docker?
- Plattform zur Erstellung und Verwaltung von Containern
- Container = leichtgewichtige, isolierte Laufzeitumgebungen
- "Build, Ship, Run"

### Container vs. VM
| Container | VM |
|-----------|-----|
| Teilt OS-Kernel | Eigene OS-Installation |
| Startet in Sekunden | Startet in Minuten |
| Wenige MB | Mehrere GB |
| Weniger isoliert | Voll isoliert |

### Dockerfile
- Beschreibt, wie ein Image gebaut wird
- FROM, RUN, COPY, CMD, EXPOSE

### Docker Compose
- Multi-Container-Anwendungen orchestrieren
- YAML-Datei definiert Services, Netzwerke, Volumes
- \`docker compose up\` startet alles

### Kubernetes
- Container auf vielen Nodes verwalten
- Skalierung, Self-Healing, Load-Balancing
- YAML-basierte Konfiguration`,

  lessons: [
    // --- Lektion 1: Was ist Docker? ---
    {
      id: "dk-1",
      title: "Was ist Docker?",
      duration: "12 min",
      type: "text",
      content: `## Docker — Container für die moderne Welt

> Docker ist der Industriestandard für Container-Virtualisierung. In diesem Modul lernst du die Grundlagen, Befehle, Docker Compose und Deployment-Strategien kennen — alles prüfungsrelevant für die IHK!

> Virtualisierung behandeln wir auch im Modul "Computersysteme & Hardware" — dort mit Fokus auf VMs vs. Container.

**Docker** ist eine Plattform zur Erstellung, Verteilung und Ausführung von Anwendungen in **Containern**.

---

## 📦 Was ist ein Container?

Ein Container ist eine **leichtgewichtige, isolierte Laufzeitumgebung**, die eine Anwendung mit allen Abhängigkeiten enthält.

> 💡 **Analogie:** Ein Container ist wie ein **Paket mit allem drin** — Code, Bibliotheken, Konfiguration. Du kannst es überall hin schicken und es läuft.

---

## 🆚 Container vs. Virtual Machine

| | 📦 Container | 🖥️ Virtual Machine |
|---|---|---|
| **OS** | Teilt OS-Kernel | Eigene OS-Installation |
| **Größe** | Wenige MB | Mehrere GB |
| **Startzeit** | Sekunden | Minuten |
| **Isolation** | Weniger isoliert | Vollständig isoliert |
| **Overhead** | Gering | Hoch |
| **Use Case** | Microservices, DevOps | Legacy, stark isoliert |

---

## 🎯 Warum Docker?

| Problem | Lösung mit Docker |
|---------|-------------------|
| "Auf meinem Rechner funktioniert es!" | Container läuft überall gleich |
| Verschiedene Versionen auf verschiedenen Rechneln | Ein Image = eine Version |
| Schwieriges Deployment | \`docker run\` — fertig |
| Umgebung aufbauen dauert lange | Image herunterladen — fertig |

---

## 📚 Die wichtigsten Begriffe

| Begriff | Beschreibung |
|---------|-------------|
| **Image** | Schablone für Container (read-only) |
| **Container** | Laufende Instanz eines Images |
| **Dockerfile** | Bauanleitung für ein Image |
| **Registry** | Speicher für Images (z.B. Docker Hub) |
| **Volume** | Persistenter Speicher außerhalb des Containers |
| **Network** | Kommunikation zwischen Containern |

---

## 🔄 Der Docker-Workflow

\`\`\`
1. Dockerfile schreiben (Bauanleitung)
2. Image bauen (docker build)
3. Container starten (docker run)
4. Image teilen (docker push)
\`\`\`

---

## 🎯 IHK-Tipp

> ❗ **Prüfungsfrage:** "Was ist der Unterschied zwischen Container und VM?" — Container teilt das OS, ist leichter und startet schneller. VM hat eigenes OS, ist stärker isoliert aber langsamer.`
    },

    // --- Lektion 2: Docker-Befehle ---
    {
      id: "dk-2",
      title: "Die wichtigsten Docker-Befehle",
      duration: "15 min",
      type: "interactive",
      interactive: "dockerfileBuilder",
      content: `## Docker-Befehle — Das musst du kennen

> In der letzten Lektion haben wir gelernt, WAS Docker ist. Jetzt wird es praktisch: Die wichtigsten Befehle für den Alltag. Du wirst sie ständig brauchen!

Die wichtigsten Befehle für den Alltag mit Docker.

---

## 🖼️ Images verwalten

\`\`\`bash
# Image herunterladen
docker pull nginx:latest

# Lokale Images anzeigen
docker images

# Image löschen
docker rmi nginx:latest
\`\`\`

---

## 📦 Container verwalten

\`\`\`bash
# Container starten
docker run -d -p 8080:80 --name mein-nginx nginx

# Erklärung:
# -d = Hintergrund (detached)
# -p 8080:80 = Port-Weiterleitung (Host:Container)
# --name = Name für den Container

# Laufende Container anzeigen
docker ps

# Alle Container (auch gestoppte)
docker ps -a

# Container stoppen
docker stop mein-nginx

# Container starten
docker start mein-nginx

# Container löschen
docker rm mein-nginx

# Logs anzeigen
docker logs mein-nginx

# In Container eintreten
docker exec -it mein-nginx bash
\`\`\`

---

## 🏗️ Images bauen

\`\`\`bash
# Image aus Dockerfile bauen
docker build -t mein-app:1.0 .

# -t = Tag (Name:Version)
# . = Build-Kontext (aktuelles Verzeichnis)
\`\`\`

---

## 📋 Dockerfile — Die Bauanleitung

\`\`\`dockerfile
# Basis-Image
FROM python:3.11-slim

# Arbeitsverzeichnis setzen
WORKDIR /app

# Abhängigkeiten installieren
COPY requirements.txt .
RUN pip install -r requirements.txt

# Code kopieren
COPY . .

# Port freigeben
EXPOSE 5000

# Startbefehl
CMD ["python", "app.py"]
\`\`\`

### Die wichtigsten Dockerfile-Instruktionen

| Instruktion | Zweck |
|-------------|-------|
| \`FROM\` | Basis-Image (z.B. python:3.11) |
| \`WORKDIR\` | Arbeitsverzeichnis setzen |
| \`COPY\` | Dateien in den Container kopieren |
| \`RUN\` | Befehl beim Bauen ausführen |
| \`EXPOSE\` | Port dokumentieren |
| \`CMD\` | Startbefehl beim Starten |

---

## 🐳 Docker Compose — Multi-Container

\`\`\`yaml
# docker-compose.yml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "5000:5000"
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: secret
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:
\`\`\`

### Compose-Befehle

\`\`\`bash
# Alle Services starten
docker compose up -d

# Alle Services stoppen
docker compose down

# Neu bauen und starten
docker compose up --build

# Logs anzeigen
docker compose logs -f
\`\`\`

---

## 🎯 IHK-Tipp

> ❗ **Prüfungsfrage:** "Was macht die Dockerfile-Instruktion COPY?" — Kopiert Dateien vom Host in den Container. Wird nach WORKDIR verwendet, um den Zielort zu definieren.`
    },

    // --- Lektion 3: Docker Compose ---
    {
      id: "dk-3",
      title: "Docker Compose — Multi-Container orchestrieren",
      duration: "15 min",
      type: "interactive",
      interactive: "dockerComposeBuilder",
      content: `## Docker Compose — Mehrere Container verwalten

> Jetzt kennst du die einzelnen Docker-Befehle. Aber was, wenn du mehrere Container gleichzeitig starten willst — z.B. eine App UND eine Datenbank? Docker Compose löst genau dieses Problem!

**Docker Compose** ist ein Tool zur Definition und Ausführung von **Multi-Container-Docker-Anwendungen** mit einer einzigen YAML-Datei.

---

## 📝 Warum Docker Compose?

Ohne Compose:
\`\`\`bash
docker network create mein-netz
docker run -d --name db --network mein-netz postgres
docker run -d --name web --network mein-netz -p 80:80 nginx
\`\`\`

Mit Compose:
\`\`\`bash
docker compose up -d
\`\`\`

---

## 📄 Die docker-compose.yml

\`\`\`yaml
version: '3.8'

services:
  # Frontend
  web:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - api
    networks:
      - app-network

  # Backend API
  api:
    build: ./backend
    ports:
      - "5000:5000"
    depends_on:
      - db
    environment:
      - DB_HOST=db
    networks:
      - app-network

  # Datenbank
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: myapp
      POSTGRES_PASSWORD: secret
    volumes:
      - db-data:/var/lib/postgresql/data
    networks:
      - app-network

# Netzwerke
networks:
  app-network:

# Volumes
volumes:
  db-data:
\`\`\`

---

## 🔑 Wichtige Schlüssel

| Schlüssel | Zweck |
|-----------|-------|
| \`image\` | Vorhandenes Image verwenden |
| \`build\` | Image aus Dockerfile bauen |
| \`ports\` | Port-Weiterleitung (Host:Container) |
| \`environment\` | Umgebungsvariablen setzen |
| \`volumes\` | Persistente Datenspeicherung |
| \`depends_on\` | Startreihenfolge |
| \`networks\` | Netzwerk-Zugehörigkeit |

---

## 🔄 Compose-Befehle

\`\`\`bash
# Starten (Hintergrund)
docker compose up -d

# Stoppen und löschen
docker compose down

# Neu bauen
docker compose up --build

# Logs anzeigen
docker compose logs -f

# Status anzeigen
docker compose ps

# In Service eintreten
docker compose exec web bash
\`\`\`

---

## 💾 Volumes — Persistente Daten

\`\`\`yaml
services:
  db:
    image: postgres:15
    volumes:
      - db-data:/var/lib/postgresql/data  # Named Volume
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql  # Bind Mount

volumes:
  db-data:  # Wird außerhalb des Containers gespeichert
\`\`\`

> ⚠️ **Wichtig:** Ohne Volume gehen Daten beim Neustart des Containers **verloren**!

---

## 🔨 Docker Compose ausprobieren

[INTERACTIVE]

---

## 🎯 IHK-Tipp

> ❗ **Prüfungsfrage:** "Was ist der Zweck von Docker Compose?" — Multi-Container-Anwendungen mit einer YAML-Datei definieren und starten. Vereinfacht die Orchestrierung von Services.`
    },

    // --- Lektion 4: Deployment ---
    {
      id: "dk-4",
      title: "Deployment — Anwendungen bereitstellen",
      duration: "12 min",
      type: "text",
      content: `## Deployment — Von der Entwicklung zur Produktion

> Wir können jetzt Container bauen und mit Compose verwalten. Der letzte Schritt: Wie bringen wir unsere Anwendung in die Produktion? Verschiedene Strategien haben verschiedene Vor- und Nachteile.

**Deployment** bezeichnet den Prozess, eine Anwendung auf einer Infrastruktur bereitzustellen.

---

## 🚀 Was ist Deployment?

> Deployment = Prozess der Bereitstellung einer Anwendung auf einer bestimmten Infrastruktur.

---

## 📋 Deployment-Strategien

### 1️⃣ All-at-Once (Big Bang)
\`\`\`
Alte Version → [Downtime] → Neue Version
\`\`\`
- ✅ Einfach
- ❌ Ausfallzeit

### 2️⃣ Rolling Update
\`\`\`
Server 1: Alt → Neu
Server 2: Alt → Neu
Server 3: Alt → Neu
\`\`\`
- ✅ Keine Downtime
- ❌ Komplexer

### 3️⃣ Blue-Green
\`\`\`
Blue (Alt) ← Traffic
Green (Neu) ← Traffic nach Test
\`\`\`
- ✅ Schneller Rollback
- ❌ Doppelte Ressourcen

---

## 🐳 Deployment mit Docker

### Image bauen und pushen
\`\`\`bash
# Image bauen
docker build -t myapp:1.0 .

# Tag für Registry
docker tag myapp:1.0 registry.example.com/myapp:1.0

# Push zur Registry
docker push registry.example.com/myapp:1.0
\`\`\`

### Auf dem Server
\`\`\`bash
# Image pullen
docker pull registry.example.com/myapp:1.0

# Container starten
docker run -d -p 80:80 registry.example.com/myapp:1.0
\`\`\`

---

## ☸️ Kubernetes — Container auf vielen Nodes

**Kubernetes** (K8s) ist ein System zur Verwaltung von Containern auf **vielen Servern** (Nodes).

### Was kann Kubernetes?
- 📈 **Skalierung:** Automatisch mehr Container bei hoher Last
- 🔄 **Self-Healing:** Defekte Container werden neu gestartet
- ⚖️ **Load-Balancing:** Traffic auf Container verteilen
- 🚀 **Rolling Updates:** Null-Downtime Deployments

### Konzept
\`\`\`
┌─────────────────────────────────────┐
│ Kubernetes Cluster                  │
│  ┌─────────┐  ┌─────────┐          │
│  │ Node 1  │  │ Node 2  │          │
│  │ ┌─────┐ │  │ ┌─────┐ │          │
│  │ │ Pod │ │  │ │ Pod │ │          │
│  │ └─────┘ │  │ └─────┘ │          │
│  └─────────┘  └─────────┘          │
└─────────────────────────────────────┘
\`\`\`

### Kubernetes vs. Docker Compose

| | Docker Compose | Kubernetes |
|---|---|---|
| **Umfang** | Ein Host | Viele Nodes |
| **Skalierung** | Manuel | Automatisch |
| **Self-Healing** | ❌ | ✅ |
| **Komplexität** | Niedrig | Hoch |
| **Use Case** | Entwicklung, kleine Projekte | Produktion, große Projekte |

---

## 🎯 IHK-Tipp

> ❗ **Prüfungsfrage:** "Was ist der Unterschied zwischen Docker Compose und Kubernetes?" — Compose für einen Host, K8s für viele Nodes. K8s bietet automatische Skalierung und Self-Healing.`
    },

    // --- Lektion 5: Quiz ---
    {
      id: "dk-5",
      title: "Wissenstest: Docker & Containerisierung",
      duration: "15 min",
      type: "quiz",
      content: `## 🎯 Quiz: Docker & Containerisierung

Teste dein Wissen über Docker und Container-Technologien!`,
    },
  ],
};
