'use client';

import type { WasmModule } from '@/app/terminal/types';

/* ----------------------------------------------------------------------------
   Shared shell layer.

   Two surfaces use this: the live prompt in the homepage hero and the full
   /terminal page. Site commands are handled here in JS; anything else is
   passed through to the real MiniShell WASM binary (written in C), which is
   lazy-loaded on first use (~45 KB wasm + ~70 KB loader).
---------------------------------------------------------------------------- */

export const SITE = {
  email: 'bdadams083104@gmail.com',
  github: 'https://github.com/Badams1',
  linkedin: 'https://www.linkedin.com/in/benjamin-adams-444651292/',
  resume: '/BenjaminAdamsResume.pdf',
};

export interface ShellContext {
  /** Print lines to the terminal output. */
  print: (...lines: string[]) => void;
  /** Clear the terminal output. */
  clear: () => void;
  /** Open an external URL / PDF in a new tab. */
  open: (href: string) => void;
  /** Go to a section or page ("#work", "/terminal/", "/"). */
  goto: (target: string) => void;
  /** Close the prompt (hero) or return home (/terminal). */
  exit: () => void;
}

const HELP: string[] = [
  'site commands:',
  '  whoami       who is this guy',
  '  work         jump to experience',
  '  projects     jump to projects',
  '  contact      jump to contact',
  '  resume       open the resume (pdf)',
  '  github       open GitHub',
  '  linkedin     open LinkedIn',
  '  minishell    open the full terminal',
  '  clear        clear output · exit — close',
  'everything else runs on the real MiniShell (C → WASM):',
  '  ls · cd · pwd · cat · echo · touch · mkdir · rm · date · help',
];

/**
 * Try to handle a command at the site level.
 * Returns true if handled; false means "pass it to the WASM shell".
 */
export function runSiteCommand(raw: string, ctx: ShellContext): boolean {
  const cmd = raw.trim().toLowerCase();

  switch (cmd) {
    case '?':
    case 'help':
      ctx.print(...HELP);
      return true;
    case 'whoami':
      ctx.print(
        'Benjamin Adams — software engineer at PlusWellbeing.ai.',
        'Northeastern CS ’26. I build LLM pipelines, FHIR data flows,',
        'and PostgreSQL queries that come back before you notice.',
      );
      return true;
    case 'work':
    case 'experience':
      ctx.print('jumping to experience…');
      ctx.goto('#work');
      return true;
    case 'projects':
      ctx.print('jumping to projects…');
      ctx.goto('#projects');
      return true;
    case 'about':
      ctx.print('jumping to about…');
      ctx.goto('#about');
      return true;
    case 'contact':
    case 'email':
      ctx.print(`reach me: ${SITE.email}`);
      ctx.goto('#contact');
      return true;
    case 'resume':
    case 'cv':
      ctx.print('opening resume.pdf…');
      ctx.open(SITE.resume);
      return true;
    case 'github':
    case 'gh':
      ctx.print('opening GitHub…');
      ctx.open(SITE.github);
      return true;
    case 'linkedin':
      ctx.print('opening LinkedIn…');
      ctx.open(SITE.linkedin);
      return true;
    case 'minishell':
    case 'terminal':
      ctx.print('launching the full terminal…');
      ctx.goto('/terminal/');
      return true;
    case 'clear':
      ctx.clear();
      return true;
    case 'exit':
    case 'quit':
    case ':q':
    case ':q!':
      ctx.exit();
      return true;
    case 'sudo hire-ben':
    case 'sudo hire ben':
      ctx.print('[sudo] permission granted.', `next step: ${SITE.email}`);
      return true;
    case 'vim':
    case 'nano':
    case 'emacs':
      ctx.print('this is a portfolio, not a trap. (:q works here though.)');
      return true;
    case 'curl bdadams.dev':
      ctx.print('yes, that actually works — try it from a real terminal.');
      return true;
    default:
      return false;
  }
}

/* ----------------------------------------------------------------------------
   WASM shell loader — singleton across the whole app.
---------------------------------------------------------------------------- */

export type ShellExec = (cmd: string) => string;

let wasmShellPromise: Promise<ShellExec> | null = null;

export function loadWasmShell(): Promise<ShellExec> {
  if (wasmShellPromise) return wasmShellPromise;

  wasmShellPromise = new Promise<ShellExec>((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('no window'));
      return;
    }

    window.Module = {
      onRuntimeInitialized: () => {
        const mod = window.Module;
        mod._main?.();
        resolve((cmd: string) =>
          mod.ccall('process_wasm_command', 'string', ['string'], [cmd]),
        );
      },
      print: () => {},
      printErr: (text: string) => console.error('minishell:', text),
    } as unknown as WasmModule;

    const script = document.createElement('script');
    script.src = '/wasm/terminal.js';
    script.async = true;
    script.onerror = () => reject(new Error('failed to load minishell'));
    document.body.appendChild(script);
  });

  return wasmShellPromise;
}

/** Strip ANSI escape codes from shell output. */
export function stripAnsi(text: string): string {
  return text.replace(/\x1b\[2J\x1b\[H/g, '').replace(/\x1b\[\d*[A-Za-z]/g, '');
}
