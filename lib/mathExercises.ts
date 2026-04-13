// Interaktive Mathe-Aufgaben für alle Module
export interface Exercise {
  id: string;
  lessonId: string;
  difficulty: 1 | 2 | 3;
  type: 'input' | 'multiple';
  question: string;
  hint?: string;
  expectedAnswer?: string;
  tolerance?: number;
  format?: string;
  options?: { label: string; value: string }[];
  correctOption?: string;
  solution: string;
}

// ==================== MATHE GRUNDLAGEN ====================

export const grundlagenExercises: Exercise[] = [
  // mg1: Mengen & Mengenoperationen
  {
    id: "gr-mengen-1",
    lessonId: "mg1",
    difficulty: 1,
    type: "multiple",
    question: "Welche Menge ist eine Teilmenge von $A = \\{1, 2, 3\\}$?",
    options: [
      { label: "$\\{1, 4\\}$", value: "a" },
      { label: "$\\{1, 2\\}$", value: "b" },
      { label: "$\\{4, 5, 6\\}$", value: "c" },
      { label: "$\\mathbb{N}$", value: "d" },
    ],
    correctOption: "b",
    solution: "$\\{1, 2\\} \\subset A$, da alle Elemente auch in $A$ enthalten sind.",
  },
  {
    id: "gr-mengen-2",
    lessonId: "mg1",
    difficulty: 2,
    type: "input",
    question: "Gegeben $A = \\{1, 2, 3, 4\\}$ und $B = \\{3, 4, 5, 6\\}$. Berechne $|A \\cup B|$.",
    expectedAnswer: "6",
    format: "Ganze Zahl",
    solution: "$A \\cup B = \\{1, 2, 3, 4, 5, 6\\}$, also $|A \\cup B| = 6$.",
  },
  {
    id: "gr-mengen-3",
    lessonId: "mg1",
    difficulty: 3,
    type: "input",
    question: "Gegeben $A = \\{1, 2, 3\\}$, $B = \\{2, 3, 4\\}$, $C = \\{3, 4, 5\\}$. Berechne $|(A \\cup B) \\cap C|$.",
    expectedAnswer: "2",
    format: "Ganze Zahl",
    solution: "$A \\cup B = \\{1, 2, 3, 4\\}$. Dann $(A \\cup B) \\cap C = \\{3, 4\\}$, also $|(A \\cup B) \\cap C| = 2$.",
  },

  // mg2: Schnittmengen & Vereinigungen
  {
    id: "gr-op-1",
    lessonId: "mg2",
    difficulty: 1,
    type: "multiple",
    question: "Was ist $A \\cap B$ wenn $A = \\{1, 2, 3\\}$ und $B = \\{2, 3, 4\\}$?",
    options: [
      { label: "$\\{1, 2, 3, 4\\}$", value: "a" },
      { label: "$\\{2, 3\\}$", value: "b" },
      { label: "$\\{1, 4\\}$", value: "c" },
      { label: "$\\emptyset$", value: "d" },
    ],
    correctOption: "b",
    solution: "Die Schnittmenge enthält Elemente in BEIDEN Mengen: $\\{2, 3\\}$.",
  },
  {
    id: "gr-op-2",
    lessonId: "mg2",
    difficulty: 2,
    type: "input",
    question: "Gegeben $U = \\{1, 2, 3, 4, 5\\}$ und $A = \\{1, 3\\}$. Berechne $|A^C|$.",
    expectedAnswer: "3",
    format: "Ganze Zahl",
    solution: "$A^C = U \\setminus A = \\{2, 4, 5\\}$, also $|A^C| = 3$.",
  },
  {
    id: "gr-op-3",
    lessonId: "mg2",
    difficulty: 3,
    type: "input",
    question: "Gegeben $A = \\{1, 2, 3\\}$, $B = \\{2, 3, 4\\}$, $C = \\{3, 4, 5\\}$. Berechne $|(A \\setminus B) \\cup (B \\setminus C)|$.",
    expectedAnswer: "2",
    format: "Ganze Zahl",
    solution: "$A \\setminus B = \\{1\\}$, $B \\setminus C = \\{2\\}$. Union: $\\{1, 2\\}$, also 2.",
  },

  // mf1: Funktionen & Zuordnungen
  {
    id: "gr-func-1",
    lessonId: "mf1",
    difficulty: 1,
    type: "input",
    question: "Gegeben $f(x) = 2x + 3$. Berechne $f(4)$.",
    expectedAnswer: "11",
    format: "Ganze Zahl",
    solution: "$f(4) = 2 \\cdot 4 + 3 = 11$.",
  },
  {
    id: "gr-func-2",
    lessonId: "mf1",
    difficulty: 2,
    type: "multiple",
    question: "Was ist der Definitionsbereich von $f(x) = \\frac{1}{x-2}$?",
    options: [
      { label: "$\\mathbb{R}$", value: "a" },
      { label: "$\\mathbb{R} \\setminus \\{2\\}$", value: "b" },
      { label: "$\\mathbb{R} \\setminus \\{-2\\}$", value: "c" },
      { label: "$[2, \\infty)$", value: "d" },
    ],
    correctOption: "b",
    solution: "Nenner $\\neq 0$: $x - 2 \\neq 0 \\Rightarrow x \\neq 2$.",
  },
  {
    id: "gr-func-3",
    lessonId: "mf1",
    difficulty: 3,
    type: "input",
    question: "Gegeben $f(x) = x^2 - 4x + 3$. Berechne $f(a+1)$ als Term in $a$ (ohne Leerzeichen).",
    expectedAnswer: "a^2-2a",
    format: "Term wie a^2-2a",
    solution: "$f(a+1) = (a+1)^2 - 4(a+1) + 3 = a^2 + 2a + 1 - 4a - 4 + 3 = a^2 - 2a$.",
  },

  // m1-grenzwerte: Grenzwerte
  {
    id: "gr-gw-1",
    lessonId: "m1-grenzwerte",
    difficulty: 1,
    type: "input",
    question: "Berechne $\\lim_{x \\to 3} (2x + 1)$.",
    expectedAnswer: "7",
    format: "Ganze Zahl",
    solution: "Einsetzen: $2 \\cdot 3 + 1 = 7$.",
  },
  {
    id: "gr-gw-2",
    lessonId: "m1-grenzwerte",
    difficulty: 2,
    type: "input",
    question: "Berechne $\\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2}$.",
    expectedAnswer: "4",
    format: "Ganze Zahl",
    solution: "$\\frac{(x-2)(x+2)}{x-2} = x+2$ für $x \\neq 2$. Also $2+2 = 4$.",
  },
  {
    id: "gr-gw-3",
    lessonId: "m1-grenzwerte",
    difficulty: 3,
    type: "input",
    question: "Berechne $\\lim_{x \\to \\infty} \\frac{3x^2 + x}{2x^2 - 1}$. Gib eine Dezimalzahl auf 2 Stellen.",
    expectedAnswer: "1.50",
    tolerance: 0.01,
    format: "Dezimalzahl, z.B. 1.50",
    solution: "Koeffizienten der höchsten Potenz: $\\frac{3}{2} = 1.5$.",
  },
];

// ==================== MATHE 1 ====================

export const mathe1Exercises: Exercise[] = [
  // m1-ableitungen: Ableitungen
  {
    id: "m1-diff-1",
    lessonId: "m1-ableitungen",
    difficulty: 1,
    type: "input",
    question: "Berechne die 1. Ableitung von $f(x) = x^3$. Gib den Term an.",
    expectedAnswer: "3x^2",
    format: "Term wie 3x^2",
    solution: "$f'(x) = 3x^2$ (Potenzregel).",
  },
  {
    id: "m1-diff-2",
    lessonId: "m1-ableitungen",
    difficulty: 2,
    type: "input",
    question: "Berechne $f'(x)$ für $f(x) = (2x + 1)^3$. Gib den vereinfachten Term an.",
    expectedAnswer: "6(2x+1)^2",
    format: "Term wie 6(2x+1)^2",
    solution: "Kettenregel: $f'(x) = 3(2x+1)^2 \\cdot 2 = 6(2x+1)^2$.",
  },
  {
    id: "m1-diff-3",
    lessonId: "m1-ableitungen",
    difficulty: 3,
    type: "input",
    question: "Berechne $f'(x)$ für $f(x) = x^2 \\cdot e^x$. Gib den Term an.",
    expectedAnswer: "xe^x(x+2)",
    format: "Faktorisierte Form",
    solution: "Produktregel: $f'(x) = 2x \\cdot e^x + x^2 \\cdot e^x = xe^x(x+2)$.",
  },

  // m1-integration: Integration
  {
    id: "m1-int-1",
    lessonId: "m1-integration",
    difficulty: 1,
    type: "input",
    question: "Berechne $\\int 2x \\, dx$. Gib den Term an (+C nicht nötig).",
    expectedAnswer: "x^2",
    format: "Term wie x^2",
    solution: "$\\int 2x \\, dx = x^2 + C$ (Potenzregel umgekehrt).",
  },
  {
    id: "m1-int-2",
    lessonId: "m1-integration",
    difficulty: 2,
    type: "input",
    question: "Berechne $\\int_0^2 x^2 \\, dx$. Gib eine Dezimalzahl auf 2 Stellen.",
    expectedAnswer: "2.67",
    tolerance: 0.01,
    format: "Dezimalzahl, z.B. 2.67",
    solution: "$\\left[\\frac{x^3}{3}\\right]_0^2 = \\frac{8}{3} \\approx 2.67$.",
  },
  {
    id: "m1-int-3",
    lessonId: "m1-integration",
    difficulty: 3,
    type: "input",
    question: "Berechne $\\int_0^1 (3x^2 + 2x) \\, dx$.",
    expectedAnswer: "2",
    format: "Ganze Zahl oder Dezimal",
    solution: "$\\left[x^3 + x^2\\right]_0^1 = (1 + 1) - 0 = 2$.",
  },

  // m1-reihen: Reihen & Folgen
  {
    id: "m1-reihe-1",
    lessonId: "m1-reihen",
    difficulty: 1,
    type: "input",
    question: "Summe der ersten 5 Glieder: $a_n = 2n$ für $n = 1$ bis $5$.",
    expectedAnswer: "30",
    format: "Ganze Zahl",
    solution: "$2 + 4 + 6 + 8 + 10 = 30$.",
  },
  {
    id: "m1-reihe-2",
    lessonId: "m1-reihen",
    difficulty: 2,
    type: "multiple",
    question: "Welche Reihe konvergiert?",
    options: [
      { label: "$\\sum_{n=1}^{\\infty} n$", value: "a" },
      { label: "$\\sum_{n=1}^{\\infty} \\frac{1}{n}$", value: "b" },
      { label: "$\\sum_{n=1}^{\\infty} \\frac{1}{n^2}$", value: "c" },
      { label: "$\\sum_{n=1}^{\\infty} 2^n$", value: "d" },
    ],
    correctOption: "c",
    solution: "$\\sum \\frac{1}{n^2}$ konvergiert (p-Reihe mit $p = 2 > 1$).",
  },
  {
    id: "m1-reihe-3",
    lessonId: "m1-reihen",
    difficulty: 3,
    type: "input",
    question: "Grenzwert der geometrischen Reihe $\\sum_{n=0}^{\\infty} (\\frac{1}{3})^n$. Dezimal auf 2 Stellen.",
    expectedAnswer: "1.50",
    tolerance: 0.01,
    format: "Dezimalzahl, z.B. 1.50",
    solution: "$S = \\frac{a}{1-q} = \\frac{1}{1 - 1/3} = \\frac{3}{2} = 1.5$.",
  },
];

// ==================== MATHE 2 ====================

export const mathe2Exercises: Exercise[] = [
  // m2-vektoren: Vektoren
  {
    id: "m2-vec-1",
    lessonId: "m2-vektoren",
    difficulty: 1,
    type: "input",
    question: "$\\vec{a} = \\binom{2}{3}$, $\\vec{b} = \\binom{1}{4}$. Berechne $|\\vec{a} + \\vec{b}|$ auf 2 Stellen.",
    expectedAnswer: "7.62",
    tolerance: 0.01,
    format: "Dezimalzahl, z.B. 7.62",
    solution: "$\\vec{a} + \\vec{b} = \\binom{3}{7}$. Betrag: $\\sqrt{9 + 49} = \\sqrt{58} \\approx 7.62$.",
  },
  {
    id: "m2-vec-2",
    lessonId: "m2-vektoren",
    difficulty: 2,
    type: "input",
    question: "$\\vec{a} = \\binom{3}{1}$, $\\vec{b} = \\binom{2}{-5}$. Berechne $\\vec{a} \\cdot \\vec{b}$.",
    expectedAnswer: "1",
    format: "Ganze Zahl",
    solution: "$\\vec{a} \\cdot \\vec{b} = 3 \\cdot 2 + 1 \\cdot (-5) = 6 - 5 = 1$.",
  },
  {
    id: "m2-vec-3",
    lessonId: "m2-vektoren",
    difficulty: 3,
    type: "input",
    question: "$\\vec{a} = \\binom{1}{2}{3}$, $\\vec{b} = \\binom{4}{5}{6}$. Winkel in Grad (ganze Zahl).",
    expectedAnswer: "13",
    format: "Ganze Zahl",
    solution: "$\\cos \\alpha = \\frac{32}{\\sqrt{14} \\cdot \\sqrt{77}} \\approx 0.974$. $\\alpha \\approx 13°$.",
  },

  // m2-dgl: Differentialgleichungen
  {
    id: "m2-dgl-1",
    lessonId: "m2-dgl",
    difficulty: 1,
    type: "multiple",
    question: "Welche Funktion ist Lösung von $y' = 2y$?",
    options: [
      { label: "$y = 2x$", value: "a" },
      { label: "$y = e^{2x}$", value: "b" },
      { label: "$y = x^2$", value: "c" },
      { label: "$y = 2^x$", value: "d" },
    ],
    correctOption: "b",
    solution: "$y = e^{2x}$ → $y' = 2e^{2x} = 2y$. ✅",
  },
  {
    id: "m2-dgl-2",
    lessonId: "m2-dgl",
    difficulty: 2,
    type: "input",
    question: "Löse $y' = 3y$, $y(0) = 2$. Berechne $y(1)$ auf 2 Stellen.",
    expectedAnswer: "40.17",
    tolerance: 0.1,
    format: "Dezimalzahl, z.B. 40.17",
    solution: "$y = 2e^{3x}$. $y(1) = 2e^3 \\approx 40.17$.",
  },
  {
    id: "m2-dgl-3",
    lessonId: "m2-dgl",
    difficulty: 3,
    type: "input",
    question: "Löse $y' = xy$, $y(0) = 1$. Gib $y(2)$ auf 2 Stellen an.",
    expectedAnswer: "7.39",
    tolerance: 0.01,
    format: "Dezimalzahl, z.B. 7.39",
    solution: "$y = e^{x^2/2}$. $y(2) = e^2 \\approx 7.39$.",
  },
];

// Alle zusammen
export const allExercises: Exercise[] = [
  ...grundlagenExercises,
  ...mathe1Exercises,
  ...mathe2Exercises,
];

export function getExercisesForLesson(lessonId: string): Exercise[] {
  return allExercises.filter((e) => e.lessonId === lessonId);
}
