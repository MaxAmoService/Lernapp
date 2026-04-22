"use client";

import { MathBlock } from "./MathBlock";

interface InlineTextProps {
  text: string;
}

/**
 * Rendert Text mit Inline-Mathe ($...$), **fett** und `code`
 */
export function InlineText({ text }: InlineTextProps) {
  const parts: (string | JSX.Element)[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    const mathMatch = remaining.match(/\$([^$]+)\$/);
    const boldMatch = remaining.match(/\*\*(.*?)\*\*/);
    const codeMatch = remaining.match(/`([^`]+)`/);

    const mathIndex = mathMatch ? remaining.indexOf(mathMatch[0]) : Infinity;
    const boldIndex = boldMatch ? remaining.indexOf(boldMatch[0]) : Infinity;
    const codeIndex = codeMatch ? remaining.indexOf(codeMatch[0]) : Infinity;

    if (mathIndex < boldIndex && mathIndex < codeIndex) {
      if (mathIndex > 0) parts.push(remaining.slice(0, mathIndex));
      parts.push(<MathBlock key={key++} math={mathMatch![1]} display={false} />);
      remaining = remaining.slice(mathIndex + mathMatch![0].length);
    } else if (boldIndex < codeIndex) {
      if (boldIndex > 0) parts.push(remaining.slice(0, boldIndex));
      parts.push(<strong key={key++} className="text-white font-semibold">{boldMatch![1]}</strong>);
      remaining = remaining.slice(boldIndex + boldMatch![0].length);
    } else if (codeIndex < Infinity) {
      if (codeIndex > 0) parts.push(remaining.slice(0, codeIndex));
      parts.push(
        <code key={key++} className="bg-slate-700 px-1.5 py-0.5 rounded text-blue-300 text-sm">
          {codeMatch![1]}
        </code>
      );
      remaining = remaining.slice(codeIndex + codeMatch![0].length);
    } else {
      parts.push(remaining);
      break;
    }
  }

  return <>{parts}</>;
}
