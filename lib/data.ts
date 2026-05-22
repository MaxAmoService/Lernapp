import { mathModules, mathCategories } from "./mathData";
import { ihkModule, ihkCategories } from "./ihkData";
import { netzwerkModule } from "./netzwerkData";
import { reactModule } from "./reactData";
import { typescriptModule } from "./typescriptData";
import { nextjsModule } from "./nextjsData";
import { javascriptModule } from "./javascriptData";
import { datenbankModule } from "./datenbankData";
import { complexModule } from "./complexData";
import { Category } from "./types";

// Re-export types for backward compatibility
export type { Lesson, Module, Category, QuizQuestion } from "./types";

export const categories: Category[] = [
  {
    id: "programmieren",
    name: "Programmieren",
    icon: "💻",
    description: "Lerne moderne Programmiersprachen und Frameworks",
  },
  ...mathCategories,
  ...ihkCategories,
];

export const modules = [
  reactModule,
  typescriptModule,
  nextjsModule,
  javascriptModule,
];

// Combine all modules
export const allModules = [...modules, ...mathModules.filter(m => m.id !== "m-komplexe-zahlen"), ihkModule, netzwerkModule, datenbankModule, complexModule];

export function getModule(slug: string) {
  return allModules.find((m) => m.slug === slug);
}
