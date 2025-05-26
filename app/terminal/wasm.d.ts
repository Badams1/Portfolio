declare module '*/terminal.js' {
  interface WasmModule {
    _process_wasm_command: (input: string) => string;
    ccall: (name: string, returnType: string, argTypes: string[], args: any[]) => any;
    default: () => Promise<void>;
  }
  
  const module: WasmModule;
  export default module;
} 