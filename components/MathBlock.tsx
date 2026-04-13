"use client";

import { useEffect, useRef, useState } from "react";

interface MathBlockProps {
  math: string;
  display?: boolean;
}

export function MathBlock({ math, display = false }: MathBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [html, setHtml] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    
    import("katex").then((katexModule) => {
      if (cancelled || !containerRef.current) return;
      
      try {
        const result = katexModule.default.renderToString(math, {
          displayMode: display,
          throwOnError: false,
          trust: true,
          strict: false,
          macros: {
            "\\R": "\\mathbb{R}",
            "\\N": "\\mathbb{N}",
            "\\Z": "\\mathbb{Z}",
            "\\Q": "\\mathbb{Q}",
          },
        });
        
        if (!cancelled) {
          setHtml(result);
          setError(null);
        }
      } catch (e: any) {
        if (!cancelled) {
          setError(e.message);
          setHtml("");
        }
      }
    });

    return () => { cancelled = true; };
  }, [math, display]);

  if (error) {
    return <span className="text-red-400 font-mono">{math}</span>;
  }

  if (!html) {
    return <span className="text-slate-400 animate-pulse">...</span>;
  }

  return (
    <span
      ref={containerRef}
      className={display ? "block my-4 overflow-x-auto text-center" : "inline"}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
