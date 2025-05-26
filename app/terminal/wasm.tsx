'use client';

import { useEffect, useRef, useState } from 'react';
import type { WasmModule } from './types';

declare global {
  interface Window {
    Module: WasmModule;
  }
}

interface TerminalProps {
  className?: string;
}

const WELCOME_MESSAGE = `\x1b[32mWelcome to the Terminal Clone!

This is a web-based terminal emulator that simulates basic Unix commands.
Try these commands:
- ls: List directory contents
- pwd: Print working directory
- cd: Change directory
- cat: Read file contents
- touch: Create a new file
- mkdir: Create a new directory
- clear: Clear the terminal
- help: Show this help message\x1b[0m
`;

export function WasmTerminal({ className }: TerminalProps) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentPath, setCurrentPath] = useState('/home');
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string>();
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const moduleRef = useRef<WasmModule | null>(null);

  // List of available commands for tab completion
  const commands = ['ls', 'cd', 'pwd', 'echo', 'cat', 'touch', 'mkdir', 'rm', 'date', 'whoami', 'clear', 'help', 'readme'];

  useEffect(() => {
    const initWasm = async () => {
      try {
        if (typeof window === 'undefined') return;

        window.Module = {
          onRuntimeInitialized: () => {
            moduleRef.current = window.Module;
            if (moduleRef.current) {
              moduleRef.current._main?.();
              setHistory([WELCOME_MESSAGE]);
              setIsLoaded(true);
            }
          },
          print: (text: string) => {
            setHistory(prev => [...prev, text]);
          },
          printErr: (text: string) => {
            console.error('WASM Error:', text);
            setError(text);
          }
        } as WasmModule;

        const script = document.createElement('script');
        script.src = '/wasm/terminal.js';
        script.async = true;
        script.onerror = (e) => {
          console.error('Failed to load WASM script:', e);
          setError('Failed to load terminal script');
        };
        document.body.appendChild(script);
      } catch (err) {
        console.error('Failed to initialize WASM module:', err);
        setError(err instanceof Error ? err.message : 'Failed to load terminal');
      }
    };

    initWasm();
    return () => {
      const script = document.querySelector('script[src="/wasm/terminal.js"]');
      if (script) document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    if (!moduleRef.current) return;

    // Add command to history
    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    // Add command line to history
    const commandLine = `guest@terminal:${currentPath}$ ${cmd}`;
    setHistory(prev => [...prev, commandLine]);

    // Handle clear command directly
    if (cmd.trim() === 'clear') {
      setHistory([]);
      return;
    }

    // Execute command
    const output = moduleRef.current.ccall(
      'process_wasm_command',
      'string',
      ['string'],
      [cmd]
    );

    // Handle output
    if (output.trim()) {
      // Remove ANSI escape codes
      const cleanOutput = output
        .replace(/\x1b\[2J\x1b\[H/g, '') // Clear screen codes
        .replace(/\x1b\[\d*[A-Za-z]/g, ''); // Other ANSI codes

      if (cleanOutput.trim()) {
        setHistory(prev => [...prev, cleanOutput]);
      }
    }

    // Update path for cd commands
    if (cmd.startsWith('cd ')) {
      const newPath = moduleRef.current.ccall(
        'process_wasm_command',
        'string',
        ['string'],
        ['pwd']
      ).trim();
      setCurrentPath(newPath);
    }
  };

  const handleTabCompletion = () => {
    const inputWords = input.split(' ');
    const lastWord = inputWords[inputWords.length - 1];
    
    // Complete commands if we're at the start of the input
    if (inputWords.length === 1) {
      const matches = commands.filter(cmd => cmd.startsWith(lastWord));
      if (matches.length === 1) {
        setInput(matches[0]);
      } else if (matches.length > 1) {
        // Show available completions
        const completionsLine = matches.join('  ');
        setHistory(prev => [...prev, completionsLine]);
      }
    }
    // Complete file paths for commands that accept them
    else if (moduleRef.current && ['cd', 'cat', 'rm', 'touch'].includes(inputWords[0])) {
      // Get current directory contents using ls command
      const output = moduleRef.current.ccall(
        'process_wasm_command',
        'string',
        ['string'],
        ['ls']
      );
      
      // Parse the output into an array of files/directories
      const files: string[] = output.split('\n').filter(Boolean);
      
      // Filter matches based on the partial path
      const matches = files.filter((file: string) => file.startsWith(lastWord));
      
      if (matches.length === 1) {
        // Replace the last word with the complete match
        inputWords[inputWords.length - 1] = matches[0];
        setInput(inputWords.join(' '));
      } else if (matches.length > 1) {
        // Show available completions
        const completionsLine = matches.join('  ');
        setHistory(prev => [...prev, completionsLine]);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      handleCommand(input.trim());
      setInput('');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      handleTabCompletion();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  const handleInputFocus = () => {
    inputRef.current?.focus();
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-black text-green-500 p-4 font-mono flex items-center justify-center">
        <div className="animate-pulse">Loading terminal...</div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-black text-green-500 p-4 font-mono" style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      margin: 0,
      padding: '1rem'
    }}>
      <div className="max-h-[80vh] overflow-y-auto" ref={terminalRef}>
        {/* Welcome Message */}
        <div className="mb-2">
          <div className="whitespace-pre-wrap">
            {WELCOME_MESSAGE.replace(/\x1b\[32m/g, '').replace(/\x1b\[0m/g, '')}
          </div>
        </div>

        {/* Command History */}
        {history.map((line, i) => {
          if (!line.startsWith('\x1b[32m')) {
            if (line.startsWith('guest@terminal')) {
              // Command input
              return (
                <div key={i} className="mb-2">
                  <div className="flex">
                    <span className="text-blue-500">guest@terminal</span>
                    <span className="text-white">:</span>
                    <span className="text-purple-500">{currentPath}</span>
                    <span className="text-white">$</span>
                    <span className="ml-1">{line.split('$ ')[1]}</span>
                  </div>
                </div>
              );
            } else {
              // Command output
              return (
                <div key={i} className="mb-2">
                  <div className="whitespace-pre-wrap">
                    {line.split(/(\s+)/).map((part, j) => 
                      part === 'readme.txt' || part === 'projects/' ? (
                        <span key={j} className="text-purple-500">{part}</span>
                      ) : (
                        part
                      )
                    )}
                  </div>
                </div>
              );
            }
          }
          return null;
        })}

        {/* Current Input Line */}
        <div className="flex">
          <span className="text-blue-500">guest@terminal</span>
          <span className="text-white">:</span>
          <span className="text-purple-500">{currentPath}</span>
          <span className="text-white">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none border-none ml-1"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
} 