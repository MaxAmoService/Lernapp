export interface LessonVisual {
  type: "triangle" | "circle" | "rectangle" | "square" | "trapezoid" | "parallelogram" | "cube" | "cuboid" | "sphere" | "cylinder" | "cone" | "pyramid" | "coordinate2d" | "coordinate3d" | "functionGraph" | "unitCircle";
  props?: Record<string, unknown>;
  position?: "top" | "bottom";
}

export type InteractiveType = "functionExplorer" | "tangentExplorer" | "integralExplorer" | "unitCircleInteractive" | "vectorExplorer";

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: "video" | "text" | "interactive" | "quiz" | "exercises";
  content: string;
  codeExample?: string;
  visuals?: LessonVisual[];
  interactive?: InteractiveType;
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
