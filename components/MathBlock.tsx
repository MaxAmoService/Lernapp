"use client";

import { useEffect, useRef } from "react";

interface MathBlockProps {
  math: string;
  display?: boolean;
}

export function MathBlock({ math, display = false }: MathBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const render = async () => {
      if (!containerRef.current) return;
      
      try {
        const katex = await import("katex");
        katex.default.render(math, containerRef.current, {
          displayMode: display,
          throwOnError: false,
          trust: true,
          strict: false,
        });
      } catch (e) {
        if (containerRef.current) {
          containerRef.current.textContent = math;
        }
      }
    };

    render();
  }, [math, display]);

  return (
    <div
      ref={containerRef}
      className={display ? "block my-4 overflow-x-auto text-center" : "inline"}
    />
  );
}
