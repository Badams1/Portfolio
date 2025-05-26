export interface WasmModule {
  _process_wasm_command: (input: string) => string;
  _main?: () => number;
  ccall: (name: string, returnType: string, argTypes: string[], args: any[]) => any;
  default: () => Promise<void>;
  onRuntimeInitialized?: () => void;
  print?: (text: string) => void;
  printErr?: (text: string) => void;
}

declare global {
  interface Window {
    Module: WasmModule;
  }
} 