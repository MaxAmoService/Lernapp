"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal, RotateCcw, HelpCircle, ChevronRight } from "lucide-react";

// ---------------------------------------------------------------------------
// Types & State
// ---------------------------------------------------------------------------

interface GitFile {
  name: string;
  content: string;
  staged: boolean;
  committed: boolean;
}

interface Commit {
  hash: string;
  message: string;
  files: string[];
}

interface Branch {
  name: string;
  commits: Commit[];
}

interface GitState {
  files: GitFile[];
  branches: Branch[];
  currentBranch: string;
  staged: string[];
  history: { command: string; output: string }[];
}

// ---------------------------------------------------------------------------
// Initial State
// ---------------------------------------------------------------------------

const INITIAL_STATE: GitState = {
  files: [
    { name: "index.html", content: "<h1>Hello World</h1>", staged: false, committed: false },
    { name: "style.css", content: "body { margin: 0; }", staged: false, committed: false },
  ],
  branches: [{ name: "main", commits: [] }],
  currentBranch: "main",
  staged: [],
  history: [],
};

const SHORT_HELP = `Verfügbare Befehle:
  git status     — Zeigt den aktuellen Zustand
  git add <file> — Datei zum Staging hinzufügen
  git add .      — Alle Dateien stagen
  git commit -m "..." — Änderungen committen
  git log        — Commit-Historie anzeigen
  git branch     — Branches anzeigen
  git branch <name> — Neuen Branch erstellen
  git checkout <name> — Branch wechseln
  git checkout -b <name> — Neuen Branch erstellen und wechseln
  git merge <name> — Branch mergen
  touch <file>   — Neue Datei erstellen
  help           — Diese Hilfe anzeigen
  clear          — Verlauf löschen`;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function randomHash(): string {
  return Math.random().toString(16).slice(2, 9);
}

function parseCommand(input: string): { cmd: string; args: string[] } {
  const parts = input.trim().split(/\s+/);
  return { cmd: parts[0] || "", args: parts.slice(1) };
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function GitShellSimulator() {
  const [state, setState] = useState<GitState>(INITIAL_STATE);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [state.history]);

  const addOutput = (command: string, output: string) => {
    setState((prev) => ({
      ...prev,
      history: [...prev.history, { command, output }],
    }));
  };

  const execute = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    setCommandHistory((prev) => [trimmed, ...prev]);
    setHistoryIndex(-1);

    const { cmd, args } = parseCommand(trimmed);

    switch (cmd) {
      case "help": {
        addOutput(trimmed, SHORT_HELP);
        break;
      }

      case "clear": {
        setState((prev) => ({ ...prev, history: [] }));
        break;
      }

      case "git": {
        const subcmd = args[0];
        switch (subcmd) {
          case "status": {
            const current = state.branches.find((b) => b.name === state.currentBranch);
            const staged = state.files.filter((f) => f.staged);
            const unstaged = state.files.filter((f) => !f.staged && !f.committed);
            const modified = state.files.filter((f) => f.committed && !f.staged);

            let output = `On branch ${state.currentBranch}\n`;
            if (staged.length > 0) {
              output += "\nChanges to be committed:\n";
              staged.forEach((f) => (output += `  \x1b[32mnew file:   ${f.name}\x1b[0m\n`));
            }
            if (unstaged.length > 0) {
              output += "\nUntracked files:\n";
              unstaged.forEach((f) => (output += `  \x1b[31m${f.name}\x1b[0m\n`));
            }
            if (modified.length > 0) {
              output += "\nChanges not staged for commit:\n";
              modified.forEach((f) => (output += `  \x1b[31mmodified:   ${f.name}\x1b[0m\n`));
            }
            if (staged.length === 0 && unstaged.length === 0 && modified.length === 0) {
              output += "nothing to commit, working tree clean";
            }
            addOutput(trimmed, output);
            break;
          }

          case "add": {
            if (args[1] === ".") {
              setState((prev) => ({
                ...prev,
                files: prev.files.map((f) => ({ ...f, staged: true })),
              }));
              addOutput(trimmed, `Alle Dateien zum Staging hinzugefügt.`);
            } else if (args[1]) {
              const file = state.files.find((f) => f.name === args[1]);
              if (!file) {
                addOutput(trimmed, `fatal: pathspec '${args[1]}' did not match any files`);
              } else {
                setState((prev) => ({
                  ...prev,
                  files: prev.files.map((f) => (f.name === args[1] ? { ...f, staged: true } : f)),
                }));
                addOutput(trimmed, `'${args[1]}' zum Staging hinzugefügt.`);
              }
            } else {
              addOutput(trimmed, "Nothing specified, nothing added.");
            }
            break;
          }

          case "commit": {
            const msgIdx = args.indexOf("-m");
            const message = msgIdx >= 0 ? args.slice(msgIdx + 1).join(" ").replace(/["']/g, "") : "";
            const stagedFiles = state.files.filter((f) => f.staged);
            if (stagedFiles.length === 0) {
              addOutput(trimmed, "nothing to commit");
            } else if (!message) {
              addOutput(trimmed, "Aborting commit due to empty commit message.");
            } else {
              const hash = randomHash();
              const commit: Commit = { hash, message, files: stagedFiles.map((f) => f.name) };
              setState((prev) => ({
                ...prev,
                files: prev.files.map((f) =>
                  f.staged ? { ...f, staged: false, committed: true } : f
                ),
                branches: prev.branches.map((b) =>
                  b.name === prev.currentBranch
                    ? { ...b, commits: [...b.commits, commit] }
                    : b
                ),
              }));
              addOutput(trimmed, `[${state.currentBranch} ${hash}] ${message}\n ${stagedFiles.length} file(s) changed`);
            }
            break;
          }

          case "log": {
            const branch = state.branches.find((b) => b.name === state.currentBranch);
            if (!branch || branch.commits.length === 0) {
              addOutput(trimmed, "Noch keine Commits auf diesem Branch.");
            } else {
              const log = branch.commits
                .slice()
                .reverse()
                .map((c) => `\x1b[33mcommit ${c.hash}\x1b[0m\n    ${c.message}`)
                .join("\n\n");
              addOutput(trimmed, log);
            }
            break;
          }

          case "branch": {
            if (args.length === 1) {
              const list = state.branches
                .map((b) => (b.name === state.currentBranch ? `* \x1b[32m${b.name}\x1b[0m` : `  ${b.name}`))
                .join("\n");
              addOutput(trimmed, list);
            } else {
              const name = args[1];
              if (state.branches.find((b) => b.name === name)) {
                addOutput(trimmed, `fatal: A branch named '${name}' already exists.`);
              } else {
                setState((prev) => ({
                  ...prev,
                  branches: [...prev.branches, { name, commits: [...(prev.branches.find((b) => b.name === prev.currentBranch)?.commits || [])] }],
                }));
                addOutput(trimmed, `Branch '${name}' erstellt.`);
              }
            }
            break;
          }

          case "checkout": {
            if (args[1] === "-b") {
              const name = args[2];
              if (!name) {
                addOutput(trimmed, "fatal: branch name required");
              } else if (state.branches.find((b) => b.name === name)) {
                addOutput(trimmed, `fatal: A branch named '${name}' already exists.`);
              } else {
                setState((prev) => ({
                  ...prev,
                  branches: [...prev.branches, { name, commits: [...(prev.branches.find((b) => b.name === prev.currentBranch)?.commits || [])] }],
                  currentBranch: name,
                }));
                addOutput(trimmed, `Switched to a new branch '${name}'`);
              }
            } else if (args[1]) {
              const branch = state.branches.find((b) => b.name === args[1]);
              if (!branch) {
                addOutput(trimmed, `error: pathspec '${args[1]}' did not match any file(s) known to git`);
              } else if (args[1] === state.currentBranch) {
                addOutput(trimmed, `Already on '${args[1]}'`);
              } else {
                setState((prev) => ({ ...prev, currentBranch: args[1] }));
                addOutput(trimmed, `Switched to branch '${args[1]}'`);
              }
            }
            break;
          }

          case "merge": {
            if (!args[1]) {
              addOutput(trimmed, "fatal: No branch specified.");
            } else if (args[1] === state.currentBranch) {
              addOutput(trimmed, `Already on '${args[1]}' — cannot merge into itself.`);
            } else {
              const source = state.branches.find((b) => b.name === args[1]);
              if (!source) {
                addOutput(trimmed, `error: branch '${args[1]}' not found.`);
              } else {
                const currentBranch = state.branches.find((b) => b.name === state.currentBranch);
                const newCommits = source.commits.filter(
                  (sc) => !currentBranch?.commits.find((cc) => cc.hash === sc.hash)
                );
                if (newCommits.length === 0) {
                  addOutput(trimmed, `Already up to date.`);
                } else {
                  setState((prev) => ({
                    ...prev,
                    branches: prev.branches.map((b) =>
                      b.name === prev.currentBranch
                        ? { ...b, commits: [...b.commits, ...newCommits] }
                        : b
                    ),
                  }));
                  addOutput(trimmed, `Merge von '${args[1]}' in '${state.currentBranch}' — ${newCommits.length} Commit(s) übernommen.`);
                }
              }
            }
            break;
          }

          default:
            addOutput(trimmed, `git: '${subcmd}' is not a git command.`);
        }
        break;
      }

      case "touch": {
        if (!args[0]) {
          addOutput(trimmed, "touch: missing file operand");
        } else if (state.files.find((f) => f.name === args[0])) {
          addOutput(trimmed, `'${args[0]}' existiert bereits.`);
        } else {
          setState((prev) => ({
            ...prev,
            files: [...prev.files, { name: args[0], content: "", staged: false, committed: false }],
          }));
          addOutput(trimmed, `'${args[0]}' erstellt.`);
        }
        break;
      }

      default:
        addOutput(trimmed, `${cmd}: command not found. Tippe 'help' für verfügbare Befehle.`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    execute(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  const reset = () => {
    setState(INITIAL_STATE);
    setCommandHistory([]);
    setHistoryIndex(-1);
  };

  return (
    <div className="space-y-4">
      {/* Terminal */}
      <div
        className="bg-[#0d1117] rounded-xl border border-slate-700/50 overflow-hidden font-mono text-sm cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Header */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/80 border-b border-slate-700/50">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex items-center gap-1.5 text-slate-400 text-xs">
            <Terminal className="w-3.5 h-3.5" />
            <span>Git Shell Simulator — {state.currentBranch}</span>
          </div>
        </div>

        {/* Output */}
        <div className="p-4 max-h-80 overflow-y-auto space-y-2">
          {/* Welcome */}
          {state.history.length === 0 && (
            <div className="text-slate-500 space-y-1">
              <p>Willkommen im Git Shell Simulator!</p>
              <p>Tippe &apos;help&apos; für verfügbare Befehle.</p>
              <p className="text-slate-600">Nutze ↑/↓ für Befehlshistorie.</p>
            </div>
          )}

          {/* History */}
          {state.history.map((entry, i) => (
            <div key={i} className="space-y-1">
              <div className="flex items-center gap-1">
                <span className="text-green-400">$</span>
                <span className="text-white">{entry.command}</span>
              </div>
              <pre className="text-slate-300 whitespace-pre-wrap text-xs leading-relaxed">{entry.output}</pre>
            </div>
          ))}

          {/* Input */}
          <form onSubmit={handleSubmit} className="flex items-center gap-1">
            <span className="text-green-400">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-white outline-none caret-green-400"
              placeholder="git status"
              autoFocus
              spellCheck={false}
            />
          </form>
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Quick commands */}
      <div className="flex flex-wrap gap-2">
        {["git status", "git add .", 'git commit -m "init"', "git log", "git branch", "help"].map((cmd) => (
          <button
            key={cmd}
            onClick={() => {
              execute(cmd);
            }}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs text-slate-300 font-mono transition-colors"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* State visualization */}
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="glass rounded-lg p-3">
          <div className="text-slate-500 mb-1">Branches</div>
          {state.branches.map((b) => (
            <div key={b.name} className={b.name === state.currentBranch ? "text-green-400 font-bold" : "text-slate-400"}>
              {b.name === state.currentBranch ? "* " : "  "}{b.name} ({b.commits.length})
            </div>
          ))}
        </div>
        <div className="glass rounded-lg p-3">
          <div className="text-slate-500 mb-1">Dateien</div>
          {state.files.map((f) => (
            <div key={f.name} className={f.staged ? "text-green-400" : f.committed ? "text-slate-400" : "text-yellow-400"}>
              {f.staged ? "● " : f.committed ? "✓ " : "○ "}{f.name}
            </div>
          ))}
        </div>
        <div className="glass rounded-lg p-3">
          <div className="text-slate-500 mb-1">Commits</div>
          {(() => {
            const branch = state.branches.find((b) => b.name === state.currentBranch);
            if (!branch || branch.commits.length === 0) return <div className="text-slate-600">Keine</div>;
            return branch.commits.slice(-3).reverse().map((c) => (
              <div key={c.hash} className="text-slate-400">
                <span className="text-yellow-500">{c.hash}</span> {c.message}
              </div>
            ));
          })()}
        </div>
      </div>

      {/* Reset */}
      <div className="flex justify-center">
        <button
          onClick={reset}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm text-slate-300 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Zurücksetzen
        </button>
      </div>
    </div>
  );
}
