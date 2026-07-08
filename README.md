# bdadams.dev

Personal site of Benjamin Adams — software engineer at PlusWellbeing.ai,
Northeastern CS '26.

Live at **[bdadams.dev](https://bdadams.dev)**. Also works from a terminal:

```bash
curl bdadams.dev
```

## What's in here

- **Editorial one-pager** (`app/page.tsx`) — experience, projects, contact.
  Warm paper/ink palette, Fraunces + Geist type, one pine-green accent.
- **A real Unix shell** (`app/terminal/`, `terminal-c/`) — MiniShell, written
  in C (tokenizer, parser, process execution), compiled to WebAssembly with
  Emscripten and running client-side on a sandboxed virtual filesystem. The
  homepage hero prompt and `/terminal` both drive the same ~45 KB binary
  through a shared JS command layer (`lib/shell.ts`) that adds site commands
  (`resume`, `work`, `sudo hire-ben`, …).
- **Case studies** (`app/writing/`) — how a 9s endpoint became 0.25s, and the
  architecture of an LLM → FHIR nutrition pipeline.

## Stack

Next.js 15 (App Router, static export) · Tailwind CSS · next-themes ·
TypeScript · C → WASM via Emscripten. Deployed on Vercel.

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export to out/
```

The WASM binary is prebuilt into `public/wasm/`; rebuild it from C with
`terminal-c/build-wasm.sh` (requires Emscripten).
