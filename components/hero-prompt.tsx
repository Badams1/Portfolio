'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { loadWasmShell, runSiteCommand, stripAnsi } from '@/lib/shell';

const CHIPS = ['help', 'work', 'resume', 'minishell'];

/** Hints the idle prompt ghost-types while nobody is using it. */
const GHOST_HINTS = ['whoami', 'help'];

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
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [ghost, setGhost] = useState('whoami');
  const [booted, setBooted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  // The cursor only starts blinking after the hero entrance settles (the
  // 1.4s delay lives in CSS — `.cursor-boot`); drop the boot class once
  // it's past so later re-renders show a normal cursor immediately.
  useEffect(() => {
    const t = window.setTimeout(() => setBooted(true), 1600);
    return () => window.clearTimeout(t);
  }, []);

  // Idle theater: ghost-type hints, hold, erase — a slow heartbeat, not a
  // marquee. Stops the moment the prompt is activated; skipped entirely
  // under prefers-reduced-motion.
  useEffect(() => {
    if (active) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let cancelled = false;
    const timers: number[] = [];
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(window.setTimeout(resolve, ms));
      });

    (async () => {
      await wait(2800); // let the entrance land, then a long idle beat
      for (let i = 0; !cancelled; i++) {
        const current = GHOST_HINTS[i % GHOST_HINTS.length];
        for (let n = current.length - 1; n >= 0 && !cancelled; n--) {
          setGhost(current.slice(0, n));
          await wait(40);
        }
        await wait(450);
        const next = GHOST_HINTS[(i + 1) % GHOST_HINTS.length];
        for (let n = 1; n <= next.length && !cancelled; n++) {
          setGhost(next.slice(0, n));
          await wait(75);
        }
        await wait(6000); // rest — restraint is the whole trick
      }
    })();

    return () => {
      cancelled = true;
      timers.forEach((t) => window.clearTimeout(t));
      setGhost('whoami');
    };
  }, [active]);

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
          className="flex w-full max-w-md cursor-text items-center rounded-md border border-border bg-card/70 px-3 py-2 font-mono text-sm transition-colors hover:border-primary/60"
          aria-label="Activate the site terminal — click to type"
        >
          <span className="text-primary">$&nbsp;</span>
          <span className="text-muted-foreground">{ghost}</span>
          <span
            className={booted ? 'cursor-blink' : 'cursor-blink cursor-boot'}
            aria-hidden="true"
          />
          <span className="ml-auto pl-4 text-[10px] uppercase tracking-[0.14em] text-muted-foreground/70">
            click to type
          </span>
        </button>
      ) : (
        <div
          className="flex w-full max-w-md cursor-text items-center rounded-md border border-primary/60 bg-card/70 px-3 py-2 font-mono text-sm"
          onClick={() => inputRef.current?.focus()}
        >
          <span className="select-none text-primary">$&nbsp;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
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
      <p className="mt-2 font-mono text-[11px] text-muted-foreground/80">
        a real shell, running in your browser — or pick a command:
      </p>

      {/* Command chips — always visible so nobody mistakes this for decoration */}
      {(
        <div className="mt-3 flex flex-wrap gap-2">
          {CHIPS.map((chip, i) => (
            <button
              key={chip}
              type="button"
              onClick={() => void run(chip)}
              style={{ '--i': i } as React.CSSProperties}
              className="chip-in rounded-full border border-border px-3 py-1 font-mono text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
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
          className="panel-pop mt-4 max-h-64 overflow-y-auto rounded-lg border border-border bg-card p-4 font-mono text-[13px] leading-relaxed text-card-foreground"
        >
          {lines.map((line, i) => (
            <div
              key={i}
              className={
                line.startsWith('$ ')
                  ? 'term-line text-primary'
                  : 'term-line whitespace-pre-wrap'
              }
            >
              {line}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
