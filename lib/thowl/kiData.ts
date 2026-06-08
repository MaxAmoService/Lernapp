import { Module } from "../types";

export const thowlKIModule: Module = {
  id: "thowl-ki", slug: "thowl-ki",
  title: "Künstliche Intelligenz",
  description: "TH OWL: Suchalgorithmen, Logik & Inferenz, CSP & Planung, Neuronale Netze, Maschinelles Lernen Grundlagen, Ethik — mit Original-Klausurfragen.",
  icon: "🤖", color: "#8B5CF6", progress: 0, category: "studium",
  lessons: [
    {
      id: "ki-suche", title: "1. Suchalgorithmen", duration: "35 min", type: "interactive", interactive: "searchVisualizer",
      content: "## Suchalgorithmen\n\n### Uninformierte Suche\n\n| Algorithmus | Struktur | Vollständig | Optimal |\n|-------------|----------|-------------|--------|\n| BFS | Queue | Ja | Ja (gleiche Kosten) |\n| DFS | Stack | Nein | Nein |\n| Uniform Cost | Priority Q | Ja | Ja |\n| Iterative Deepening | Kombi | Ja | Ja |\n\n### A* (Informierte Suche)\n\nBewertungsfunktion: $f(n) = g(n) + h(n)$\n- $g(n)$ = Kosten vom Start\n- $h(n)$ = Heuristik (geschätzte Restkosten)\n\n> **A* mit zulässiger Heuristik ($h$ überschätzt nie) ist optimal!**",
    },
    {
      id: "ki-logik", title: "2. Logik & Inferenz", duration: "35 min", type: "text",
      content: "## Logik in der KI\n\n### Aussagenlogik\n\nVariablen: $P, Q, R \\\\in \\\\{\\\\text{wahr}, \\\\text{falsch}\\\\}$\n\n**Wichtige Äquivalenzen:**\n| Name | Formel |\n|------|--------|\n| De Morgan | $\\\\neg(P \\\\land Q) \\\\equiv \\\\neg P \\\\lor \\\\neg Q$ |\n| Kontraposition | $P \\\\implies Q \\\\equiv \\\\neg Q \\\\implies \\\\neg P$ |\n\n### Prädikatenlogik (FOL)\n\n- **Konstanten:** Max, Lisa\n- **Prädikate:** Student(x), Hört(x, y)\n- **Quantoren:** $\\\\forall x$ (alle), $\\\\exists x$ (existiert)\n\n### Resolution\n\n    (A ∨ B) ∧ (¬B ∨ C) ⊢ (A ∨ C)\n\nVorgehen: KNF bilden → Annahme negieren → Resolution → Leere Klausel = bewiesen.",
    },
    {
      id: "ki-csp", title: "3. CSP & Planung", duration: "30 min", type: "text",
      content: "## Constraint Satisfaction & Planung\n\n### CSP\n\n- **Variablen** $X = \\\\{x_1, \\\\dots, x_n\\\\}$\n- **Domänen** $D_i$\n- **Constraints** $C_j$\n\n**Lösung:** Backtracking + Forward Checking + Arc Consistency (AC-3).\n\n**MRV-Heuristik:** Wähle Variable mit kleinster verbleibender Domäne zuerst.\n\n### STRIPS-Planung\n\n- **Initialzustand:** Fakten (wahr)\n- **Zielzustand:** Fakten (gewünscht)\n- **Operatoren:** Vorbedingungen → ADD-Liste, DELETE-Liste\n\nBeispiel (Klötzchenwelt): move(A, Tisch, B) — Vorbed.: clear(A), clear(B) — Effekt: on(A,B), nicht on(A,Tisch).",
    },
    {
      id: "ki-neuronale", title: "4. Neuronale Netze", duration: "40 min", type: "text",
      content: "## Neuronale Netze\n\n### Perzeptron\n\n$y = f(\\\\sum w_i x_i + b)$\n\n**Aktivierungsfunktionen:**\n| Funktion | Formel | Werte |\n|----------|--------|-------|\n| Sigmoid | $1/(1+e^{-x})$ | (0,1) |\n| tanh | $(e^x-e^{-x})/(e^x+e^{-x})$ | (-1,1) |\n| ReLU | $\\\\max(0,x)$ | [0,∞) |\n\n### Backpropagation\n\n1. **Forward:** Eingabe durchs Netz\n2. **Fehler:** $E = \\\\frac{1}{2}\\\\sum (y_k - t_k)^2$\n3. **Backward:** Gradient per Kettenregel\n4. **Update:** $w \\\\leftarrow w - \\\\eta \\\\frac{\\\\partial E}{\\\\partial w}$\n\n### Optimierer\n\n- **SGD:** $w_{t+1} = w_t - \\\\eta \\\\nabla E$\n- **Adam:** Adaptive Lernrate (heutiger Standard)\n\n> **Backpropagation × GPU = Deep Learning Revolution!**",
    },
    {
      id: "ki-ml-grundlagen", title: "5. ML Grundlagen", duration: "35 min", type: "text",
      content: "## Maschinelles Lernen — Überblick\n\n### 1. Supervised Learning\n\n$(x_i, y_i)$ gegeben. Finde $f: X \\\\to Y$.\n\n- **Klassifikation:** diskrete Ausgabe (Spam/KeinSpam)\n- **Regression:** kontinuierlich (Preise)\n\n### 2. Unsupervised Learning\n\nNur $x_i$ (KEINE Labels). Finde Struktur.\n\n- **Clustering:** k-Means, DBSCAN\n- **Dimensionsreduktion:** PCA, t-SNE\n\n### 3. Reinforcement Learning\n\nAgent interagiert mit Umwelt, maximiert Belohnung $\\\\sum \\\\gamma^t r_t$.\n\n**Q-Learning:** $Q(s,a) \\\\leftarrow Q(s,a) + \\\\alpha[r + \\\\gamma \\\\max Q(s',a') - Q(s,a)]$\n\n> **RLHF (Reinforcement Learning from Human Feedback) ist die Basis von ChatGPT!**",
    },
    {
      id: "ki-ethik", title: "6. Ethik & Grenzen der KI", duration: "20 min", type: "text",
      content: "## Ethik & Grenzen\n\n### EU AI Act (ab 2024)\n\n1. **Transparenz:** Nachvollziehbare Entscheidungen\n2. **Fairness:** Keine Diskriminierung\n3. **Rechenschaftspflicht:** Mensch verantwortlich\n4. **Sicherheit:** Robust gegen Angriffe\n\n### Bias\n\nTrainingsdaten spiegeln Vorurteile → KI verstärkt sie.\n\n### Grenzen\n\n- Kein echtes Verständnis (statistische Muster)\n- Kein Common Sense\n- Symbol Grounding Problem",
    },
    {
      id: "ki-klausur", title: "Probeklausur KI — 12 Fragen", duration: "60 min", type: "quiz", examMode: true,
      content: "## KI Probeklausur — 12 Fragen\n\n### Frage 1\nBFS nutzt welche Datenstruktur?\nA) Stack\nB) Queue\nC) Priority Queue\nD) Heap\n\nRichtig: **B.** BFS = Queue (FIFO).\n\n### Frage 2\nA* optimal wenn Heuristik...\nA) möglichst groß\nB) zulässig (überschätzt nie)\nC) zufällig\nD) immer 0\n\nRichtig: **B.**\n\n### Frage 3\nBewertungsfunktion A*?\nA) $f(n)=h(n)$\nB) $f(n)=g(n)$\nC) $f(n)=g(n)+h(n)$\nD) $f(n)=g(n) \\\\cdot h(n)$\n\nRichtig: **C.** Wegkosten + Heuristik.\n\n### Frage 4\nResolutionsregel?\nA) $(A \\\\land B) \\\\to A$\nB) $(A \\\\lor B) \\\\land (\\\\neg B \\\\lor C) \\\\to (A \\\\lor C)$\nC) $(A \\\\to B) \\\\land B \\\\to A$\nD) $(A \\\\lor B) \\\\to B$\n\nRichtig: **B.**\n\n### Frage 5\nVanishing Gradient bei...\nA) ReLU\nB) Sigmoid\nC) Linear\nD) Step\n\nRichtig: **B.** Sigmoid sättigt → Gradient ≈ 0.\n\n### Frage 6\nCSP = ?\nA) Central Signal Processing\nB) Constraint Satisfaction Problem\nC) Continuous State Processing\nD) Cognitive Symbol Programming\n\nRichtig: **B.**\n\n### Frage 7\nk-Means = ...\nA) Supervised\nB) Unsupervised\nC) Reinforcement\nD) Semi-Supervised\n\nRichtig: **B.** Clustering OHNE Labels.\n\n### Frage 8\nPerzeptron-Update?\nA) $w \\\\leftarrow w - \\\\eta \\\\nabla E$\nB) $w \\\\leftarrow w + \\\\eta(y-\\\\hat{y})x$\nC) $w \\\\leftarrow w + \\\\eta \\\\nabla E$\nD) $w \\\\leftarrow w(1-\\\\eta)$\n\nRichtig: **B.** Gewichte proportional zum Fehler.\n\n### Frage 9\nBellman-Gleichung?\nA) $V^*(s)=\\\\max_a[R(s,a)+\\\\gamma\\\\sum T(s,a,s')V^*(s')]$\nB) $V(s)=R(s)$\nC) $Q(s,a)=R(s)$\nD) $\\\\pi(s)=\\\\arg\\\\max_a Q(s,a)$\n\nRichtig: **A.**\n\n### Frage 10\nOverfitting?\nA) Zu gut auf Training, schlecht auf Test\nB) Zu einfach\nC) Zu viele Testdaten\nD) Lernrate zu hoch\n\nRichtig: **A.**\n\n### Frage 11\nXOR mit einem Perzeptron?\nA) Lernbar\nB) NICHT lernbar (nicht linear separierbar)\nC) Nur mit Sigmoid\nD) Nur mit tanh\n\nRichtig: **B.**\n\n### Frage 12\nKlassifikation vs. Regression?\nA) Gleich\nB) Klassifikation = diskret, Regression = kontinuierlich\nC) Klassifikation braucht mehr Daten\nD) Regression ist genauer\n\nRichtig: **B.**",
    },
  ],
};
