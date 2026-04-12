"use client";

import { useEffect, useRef } from "react";

interface MathBlockProps {
  math: string;
  display?: boolean;
}

export function MathBlock({ math, display = false }: MathBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Dynamically import KaTeX
      import("katex").then((katex) => {
        if (containerRef.current) {
          try {
            katex.default.render(math, containerRef.current, {
              displayMode: display,
              throwOnError: false,
              trust: true,
            });
          } catch (e) {
            containerRef.current.textContent = math;
          }
        }
      });
    }
  }, [math, display]);

  return (
    <div
      ref={containerRef}
      className={`my-4 ${display ? "text-center overflow-x-auto" : "inline"}`}
    />
  );
}
