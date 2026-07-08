import type { Metadata } from 'next';
import { WasmTerminal } from './wasm';

export const metadata: Metadata = {
  title: 'MiniShell — Benjamin Adams',
  description:
    'A Unix shell written in C, compiled to WebAssembly, running entirely in your browser with a sandboxed virtual filesystem.',
};

export default function Terminal() {
  return <WasmTerminal />;
}
