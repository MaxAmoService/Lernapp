"use client";

import { useState, useRef, useCallback } from "react";

interface CodeSandboxProps {
  initialCode?: string;
  language?: string;
  title?: string;
  className?: string;
}

/**
 * Interaktive Code-Sandbox — Code schreiben, ausführen, Output sehen
 */
export function CodeSandbox({
  initialCode = '// Schreibe deinen Code hier\nconsole.log("Hallo Welt!");',
  language = "javascript",
  title = "Code Sandbox",
  className = "",
}: CodeSandboxProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const runCode = useCallback(() => {
    setIsRunning(true);
    setOutput([]);
    setError(null);

    const logs: string[] = [];
    const originalConsole = {
      log: console.log,
      warn: console.warn,
      error: console.error,
    };

    // Capture console output
    console.log = (...args: unknown[]) => {
      logs.push(args.map(a => typeof a === "object" ? JSON.stringify(a, null, 2) : String(a)).join(" "));
    };
    console.warn = (...args: unknown[]) => {
      logs.push("⚠️ " + args.map(a => String(a)).join(" "));
    };
    console.error = (...args: unknown[]) => {
      logs.push("❌ " + args.map(a => String(a)).join(" "));
    };

    try {
      // eslint-disable-next-line no-eval
      const result = eval(code);
      if (result !== undefined) {
        logs.push("→ " + (typeof result === "object" ? JSON.stringify(result, null, 2) : String(result)));
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      console.log = originalConsole.log;
      console.warn = originalConsole.warn;
      console.error = originalConsole.error;
      setOutput(logs);
      setIsRunning(false);
    }
  }, [code]);

  const resetCode = useCallback(() => {
    setCode(initialCode);
    setOutput([]);
    setError(null);
  }, [initialCode]);

  // Handle Tab key in textarea
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const ta = textareaRef.current;
      if (!ta) return;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const newCode = code.substring(0, start) + "  " + code.substring(end);
      setCode(newCode);
      // Move cursor after the inserted tab
      requestAnimationFrame(() => {
        ta.selectionStart = ta.selectionEnd = start + 2;
      });
    }
    // Ctrl/Cmd + Enter to run
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      runCode();
    }
  }, [code, runCode]);

  return (
    <div className={`rounded-xl overflow-hidden border border-slate-700/50 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-800/80 border-b border-slate-700/50">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-sm text-slate-400 ml-2">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 bg-slate-700/50 px-2 py-0.5 rounded">{language}</span>
          <button
            onClick={resetCode}
            className="px-2 py-1 text-xs text-slate-400 hover:text-white hover:bg-slate-700/50 rounded transition-colors"
            title="Zurücksetzen"
          >
            ↺ Reset
          </button>
          <button
            onClick={runCode}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/20 text-green-400 hover:bg-green-500/30 rounded text-sm font-medium transition-colors disabled:opacity-50"
          >
            {isRunning ? (
              <>
                <span className="animate-spin">⏳</span>
                Läuft...
              </>
            ) : (
              <>
                ▶ Run
                <span className="text-xs text-green-500/60 ml-1">⌘↵</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full min-h-[200px] max-h-[400px] p-4 bg-slate-900/80 text-sm font-mono text-slate-200 resize-y focus:outline-none leading-relaxed"
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          placeholder="// Code hier eingeben..."
          style={{
            tabSize: 2,
          }}
        />
        {/* Line numbers */}
        <div className="absolute left-0 top-0 w-10 h-full bg-slate-900/50 border-r border-slate-800 pointer-events-none">
          {code.split("\n").map((_, i) => (
            <div key={i} className="text-right pr-2 text-xs text-slate-600 leading-relaxed" style={{ height: "1.625rem", paddingTop: "1rem" }}>
              {i + 1}
            </div>
          ))}
        </div>
        {/* Adjust padding for line numbers */}
        <style>{`textarea { padding-left: 3.5rem !important; }`}</style>
      </div>

      {/* Output */}
      {(output.length > 0 || error) && (
        <div className="border-t border-slate-700/50">
          <div className="px-4 py-1.5 bg-slate-800/50 text-xs text-slate-500 flex items-center gap-2">
            <span>📟</span> Output
          </div>
          <div className="p-4 bg-slate-950/80 font-mono text-sm max-h-[200px] overflow-y-auto">
            {error && (
              <div className="text-red-400 mb-2">❌ {error}</div>
            )}
            {output.map((line, i) => (
              <div key={i} className={`${line.startsWith("→ ") ? "text-blue-400" : line.startsWith("⚠️") ? "text-yellow-400" : line.startsWith("❌") ? "text-red-400" : "text-slate-300"}`}>
                {line}
              </div>
            ))}
            {output.length === 0 && !error && (
              <div className="text-slate-500 italic">Kein Output</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
