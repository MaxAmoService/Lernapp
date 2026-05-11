// IHK-spezifische Typen für Diagramme & Darstellungen

export interface Flashcard {
  id: string;
  topic: string; // z.B. "pap", "epk", "uml-klasse"
  front: string; // Frage
  back: string;  // Antwort
  hint?: string;
}

export interface FlashcardProgress {
  cardId: string;
  interval: number;      // Tage bis zur nächsten Wiederholung
  easeFactor: number;    // SM-2 Ease Factor (起步 2.5)
  repetitions: number;   // Wie oft richtig beantwortet
  nextReview: number;    // Timestamp (ms) der nächsten Wiederholung
  lastReview: number;    // Timestamp (ms) der letzten Wiederholung
}

export interface DiagramLabel {
  id: string;
  text: string;
  correctZone: string;
}

export interface DiagramZone {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface DiagramLabelingExercise {
  id: string;
  title: string;
  description: string;
  labels: DiagramLabel[];
  zones: DiagramZone[];
  svgContent: string; // SVG als String
}

export interface AlgorithmStep {
  step: number;
  array: number[];
  comparing?: [number, number];
  swapped?: [number, number];
  sorted?: number[];
  description: string;
}

export interface AlgorithmExercise {
  id: string;
  title: string;
  algorithm: "bubblesort" | "selectionsort" | "insertionsort";
  inputArray: number[];
  steps: AlgorithmStep[];
}

export interface IHKModule {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  category: string;
  lessons: IHKLesson[];
  merkblatt?: string;
  flashcards: Flashcard[];
}

export interface IHKLesson {
  id: string;
  title: string;
  duration: string;
  type: "text" | "interactive" | "quiz" | "flashcards";
  content: string;
  codeExample?: string;
}
