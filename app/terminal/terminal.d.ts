declare module '*/terminal.js' {
  import type { WasmModule } from './types';
  const module: WasmModule;
  export default module;
} 