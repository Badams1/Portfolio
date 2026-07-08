'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { loadWasmShell, runSiteCommand, stripAnsi, type ShellExec } from '@/lib/shell';

const WELCOME: string[] = [
  'MiniShell — a Unix shell written in C, compiled to WebAssembly.',
  'This is the real binary running in your browser, on a sandboxed',
  'virtual filesystem. Nothing here is faked in JavaScript.',
  '',
  'shell:  ls · cd · pwd · cat · echo · touch · mkdir · rm · date',
  'site:   whoami · resume · github · sudo hire-ben · help',
  '',
];

const COMPLETIONS = [
  'ls', 'cd', 'pwd', 'echo', 'cat', 'touch', 'mkdir', 'rm', 'date',
  'whoami', 'clear', 'help', 'resume', 'github', 'linkedin', 'contact', 'exit',
];

type Line = { kind: 'cmd' | 'out'; text: string; path?: string };

export function WasmTerminal() {
  const [input, setInput] = useState('');
  const [lines, setLines] = useState<Line[]>([]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentPath, setCurrentPath] = useState('/home');
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const execRef = useRef<ShellExec | null>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let cancelled = false;
    loadWasmShell()
      .then((exec) => {
        if (cancelled) return;
        execRef.current = exec;
        setStatus('ready');
      })
      .catch(() => !cancelled && setStatus('error'));
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    outputRef.current?.scrollTo({ top: outputRef.current.scrollHeight });
  }, [lines]);

  const print = useCallback((...texts: string[]) => {
    setLines((prev) => [...prev, ...texts.map((text) => ({ kind: 'out' as const, text }))]);
  }, []);

  const run = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;
    setCmdHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);
    setLines((prev) => [...prev, { kind: 'cmd', text: cmd, path: currentPath }]);

    const handled = runSiteCommand(cmd, {
      print,
      clear: () => setLines([]),
      open: (href) => window.open(href, '_blank', 'noopener'),
      goto: (target) => {
        window.location.href = target.startsWith('#') ? `/${target}` : target;
      },
      exit: () => {
        window.location.href = '/';
      },
    });
    if (handled) return;

    const exec = execRef.current;
    if (!exec) {
      print('shell is still loading — one sec.');
      return;
    }
    const output = stripAnsi(exec(cmd)).trimEnd();
    if (output) print(...output.split('\n'));
    if (cmd.startsWith('cd')) {
      setCurrentPath(stripAnsi(exec('pwd')).trim());
    }
  };

  const handleTabCompletion = () => {
    const words = input.split(' ');
    const last = words[words.length - 1];
    if (words.length === 1) {
      const matches = COMPLETIONS.filter((c) => c.startsWith(last));
      if (matches.length === 1) setInput(matches[0]);
      else if (matches.length > 1) print(matches.join('  '));
    } else if (execRef.current && ['cd', 'cat', 'rm', 'touch'].includes(words[0])) {
      const files = stripAnsi(execRef.current('ls')).split('\n').filter(Boolean);
      const matches = files.filter((f) => f.startsWith(last));
      if (matches.length === 1) {
        words[words.length - 1] = matches[0];
        setInput(words.join(' '));
      } else if (matches.length > 1) {
        print(matches.join('  '));
      }
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      run(input);
      setInput('');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      handleTabCompletion();
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
    }
  };

  const focusInput = () => inputRef.current?.focus();

  const Prompt = ({ path }: { path: string }) => (
    <span className="whitespace-nowrap">
      <span className="text-primary">guest@bdadams.dev</span>
      <span className="text-muted-foreground">:</span>
      <span className="text-foreground">{path}</span>
      <span className="text-muted-foreground">$</span>
    </span>
  );

  return (
    <main className="flex h-dvh flex-col bg-background text-foreground">
      {/* Chrome bar */}
      <header className="flex items-center gap-3 border-b border-border px-5 py-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full border border-muted-foreground/50" />
          <span className="h-2 w-2 rounded-full border border-muted-foreground/50" />
          <span className="h-2 w-2 rounded-full border border-muted-foreground/50" />
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          minishell — C, compiled to WebAssembly
        </span>
        <a
          href="/"
          className="ml-auto font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary"
        >
          ← bdadams.dev
        </a>
      </header>

      {/* Output + input */}
      <div
        className="flex-1 cursor-text overflow-y-auto px-5 py-4 font-mono text-[13px] leading-relaxed"
        ref={outputRef}
        onClick={focusInput}
      >
        <div className="mb-3 whitespace-pre-wrap text-muted-foreground">
          {WELCOME.join('\n')}
        </div>

        <div role="log" aria-live="polite">
          {lines.map((line, i) =>
            line.kind === 'cmd' ? (
              <div key={i} className="mt-1">
                <Prompt path={line.path ?? currentPath} />
                <span className="ml-2">{line.text}</span>
              </div>
            ) : (
              <div key={i} className="whitespace-pre-wrap">
                {line.text}
              </div>
            ),
          )}
        </div>

        {status === 'error' && (
          <div className="text-destructive">
            minishell failed to load. the rest of the site still works: <a className="underline" href="/">bdadams.dev</a>
          </div>
        )}

        <div className="mt-1 flex items-center">
          <Prompt path={currentPath} />
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            aria-label="Shell input"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            autoFocus
            disabled={status === 'error'}
            className="ml-2 flex-1 bg-transparent caret-[var(--primary)] outline-none"
          />
        </div>
        {status === 'loading' && (
          <div className="mt-2 text-muted-foreground">loading the shell binary (~45 KB)…</div>
        )}
      </div>
    </main>
  );
}
