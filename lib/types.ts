export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: "video" | "text" | "interactive" | "quiz" | "exercises";
  content: string;
  codeExample?: string;
}

export interface Module {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  progress: number;
  category: string;
  lessons: Lesson[];
  merkblatt?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface QuizQuestion {
  question: string;
  type: "multiple" | "input";
  options?: string[];
  correct: number | string;
  explanation: string;
  hint?: string;
  mathNotation?: string;
}
