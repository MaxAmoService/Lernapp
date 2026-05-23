"use client";

import { MathBlock } from "./MathBlock";
import { PAPInlineIcon, PAP_ICON_MAP } from "./PAPInlineIcon";

interface InlineTextProps {
  text: string;
}

// PAP icon emoji pattern
const PAP_ICONS_RE = /🟢|🔵|🔶|▱|📥|➡️/;

/**
 * Rendert Text mit Inline-Mathe ($...$), Block-Mathe ($$...$$), **fett**, `code` und PAP-Symbol-Icons
 */
export function InlineText({ text }: InlineTextProps) {
  const parts: (string | JSX.Element)[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // Match display math $$...$$ BEFORE inline math $...$
    const displayMathMatch = remaining.match(/\$\$([^$]+?)\$\$/);
    const mathMatch = remaining.match(/\$([^$]+)\$/);
    const boldMatch = remaining.match(/\*\*(.*?)\*\*/);
    const codeMatch = remaining.match(/`([^`]+)`/);
    const iconMatch = remaining.match(PAP_ICONS_RE);

    const displayMathIndex = displayMathMatch ? remaining.indexOf(displayMathMatch[0]) : Infinity;
    const mathIndex = mathMatch ? remaining.indexOf(mathMatch[0]) : Infinity;
    const boldIndex = boldMatch ? remaining.indexOf(boldMatch[0]) : Infinity;
    const codeIndex = codeMatch ? remaining.indexOf(codeMatch[0]) : Infinity;
    const iconIndex = iconMatch ? remaining.indexOf(iconMatch[0]) : Infinity;

    // Find the earliest match
    const minIndex = Math.min(displayMathIndex, mathIndex, boldIndex, codeIndex, iconIndex);

    if (minIndex === Infinity) {
      parts.push(remaining);
      break;
    }

    if (minIndex > 0) parts.push(remaining.slice(0, minIndex));

    if (minIndex === displayMathIndex) {
      parts.push(<MathBlock key={key++} math={displayMathMatch![1].trim()} display={true} />);
      remaining = remaining.slice(displayMathIndex + displayMathMatch![0].length);
    } else if (minIndex === mathIndex) {
      parts.push(<MathBlock key={key++} math={mathMatch![1]} display={false} />);
      remaining = remaining.slice(mathIndex + mathMatch![0].length);
    } else if (minIndex === boldIndex) {
      parts.push(<strong key={key++} className="text-white font-semibold">{boldMatch![1]}</strong>);
      remaining = remaining.slice(boldIndex + boldMatch![0].length);
    } else if (minIndex === codeIndex) {
      parts.push(
        <code key={key++} className="bg-slate-700 px-1.5 py-0.5 rounded text-blue-300 text-sm">
          {codeMatch![1]}
        </code>
      );
      remaining = remaining.slice(codeIndex + codeMatch![0].length);
    } else if (minIndex === iconIndex) {
      const iconType = PAP_ICON_MAP[iconMatch![0]];
      if (iconType) {
        parts.push(<PAPInlineIcon key={key++} type={iconType} size={18} />);
      } else {
        parts.push(iconMatch![0]);
      }
      remaining = remaining.slice(iconIndex + iconMatch![0].length);
    }
  }

  return <>{parts}</>;
}
