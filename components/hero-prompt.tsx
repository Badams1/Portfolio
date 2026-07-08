'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { loadWasmShell, runSiteCommand, stripAnsi } from '@/lib/shell';

const CHIPS = ['help', 'work', 'resume', 'minishell'];

/**
 * The hero's `$` line — a real prompt. Site commands (help, work, resume…)
 * are handled in JS; anything else runs on the MiniShell WASM binary,
 * lazy-loaded on first use. Scroll navigation stays primary: this is a
 * delight layer, never a gate.
 */
export function HeroPrompt() {
  const [input, setInput] = useState('');
  const [lines, setLines] = useState<string[]>([]);
  const [active, setActive] = useState(false);
  const [showChips, setShowChips] = useState(false);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  // Touch devices can't be expected to type: offer tappable commands upfront.
  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) setShowChips(true);
  }, []);

  useEffect(() => {
    outputRef.current?.scrollTo({ top: outputRef.current.scrollHeight });
  }, [lines]);

  const print = useCallback((...newLines: string[]) => {
    setLines((prev) => [...prev, ...newLines]);
  }, []);

  const run = useCallback(
    async (raw: string) => {
      const cmd = raw.trim();
      if (!cmd) return;
      setActive(true);
      setCmdHistory((prev) => [...prev, cmd]);
      setHistoryIndex(-1);
      print(`$ ${cmd}`);

      const handled = runSiteCommand(cmd, {
        print,
        clear: () => setLines([]),
        open: (href) => window.open(href, '_blank', 'noopener'),
        goto: (target) => {
          if (target.startsWith('#')) {
            document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.location.href = target;
          }
        },
        exit: () => {
          setLines([]);
          setActive(false);
          inputRef.current?.blur();
        },
      });

      if (!handled) {
        try {
          const exec = await loadWasmShell();
          const output = stripAnsi(exec(cmd)).trimEnd();
          if (output) print(...output.split('\n'));
        } catch {
          print(`minishell failed to load — try the full page instead: /terminal`);
        }
      }
    },
    [print],
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      void run(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0 && historyIndex < cmdHistory.length - 1) {
        const next = historyIndex + 1;
        setHistoryIndex(next);
        setInput(cmdHistory[cmdHistory.length - 1 - next]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const next = historyIndex - 1;
        setHistoryIndex(next);
        setInput(cmdHistory[cmdHistory.length - 1 - next]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Escape') {
      setLines([]);
      setActive(false);
      inputRef.current?.blur();
    }
  };

  const open = active || lines.length > 0;

  return (
    <div>
      {/* Prompt line: fake static line until activated, then a real input */}
      {!active ? (
        <button
          type="button"
          onClick={() => setActive(true)}
          className="flex items-center font-mono text-sm"
          aria-label="Activate the site terminal"
        >
          <span className="text-primary">$&nbsp;</span>
          <span className="text-muted-foreground">whoami</span>
          <span className="cursor-blink" aria-hidden="true" />
        </button>
      ) : (
        <div
          className="flex cursor-text items-center font-mono text-sm"
          onClick={() => inputRef.current?.focus()}
        >
          <span className="select-none text-primary">$&nbsp;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            onFocus={() => setShowChips(true)}
            placeholder="help"
            aria-label="Site terminal — type help for commands"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            autoFocus
            className="w-64 max-w-full bg-transparent font-mono text-sm text-foreground caret-[var(--primary)] outline-none placeholder:text-muted-foreground/50"
          />
        </div>
      )}
      <p className="mt-1.5 font-mono text-[11px] text-muted-foreground/80">
        a real prompt — type{' '}
        <button
          type="button"
          className="text-primary hover:underline hover:underline-offset-4"
          onClick={() => void run('help')}
        >
          help
        </button>
        , or just scroll
      </p>

      {/* Command chips (touch devices, or once focused) */}
      {showChips && (
        <div className="mt-3 flex flex-wrap gap-2">
          {CHIPS.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => void run(chip)}
              className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {chip}
            </button>
          ))}
        </div>
      )}

      {/* Output */}
      {open && lines.length > 0 && (
        <div
          ref={outputRef}
          role="log"
          aria-live="polite"
          className="mt-4 max-h-64 overflow-y-auto rounded-lg border border-border bg-card p-4 font-mono text-[13px] leading-relaxed text-card-foreground"
        >
          {lines.map((line, i) => (
            <div
              key={i}
              className={line.startsWith('$ ') ? 'text-primary' : 'whitespace-pre-wrap'}
            >
              {line}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
