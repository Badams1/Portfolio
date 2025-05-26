'use client';

import React, { useState, useRef, useEffect } from "react";
import { TerminalState } from "./commands";

interface Command {
  input: string;
  output: string;
}

const TerminalPage = () => {
  const [commands, setCommands] = useState<Command[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalState = useRef(new TerminalState());
  const [currentPath, setCurrentPath] = useState('/home');

  useEffect(() => {
    // Focus input when component mounts
    inputRef.current?.focus();
    // Show welcome message
    const result = terminalState.current.cat('readme.txt');
    if (result.success) {
      setCommands([{ input: '', output: result.output }]);
    }
  }, []);

  useEffect(() => {
    // Scroll to bottom when new command is added
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commands]);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentInput.trim()) {
      const result = terminalState.current.executeCommand(currentInput);
      
      if (result.output === '<CLEAR>') {
        setCommands([]);
      } else {
        const newCommand: Command = {
          input: currentInput,
          output: result.output
        };
        setCommands([...commands, newCommand]);
      }

      // Update path after cd command
      if (currentInput.startsWith('cd ') || currentInput === 'cd') {
        const pwdResult = terminalState.current.pwd();
        if (pwdResult.success) {
          setCurrentPath(pwdResult.output);
        }
      }

      setCurrentInput('');
    }
  };

  const handleInputFocus = () => {
    inputRef.current?.focus();
  };

  return (
    <div 
      className="min-h-screen bg-black text-green-500 p-4 font-mono"
      onClick={handleInputFocus}
    >
      <div 
        ref={terminalRef}
        className="max-h-[80vh] overflow-y-auto"
      >
        {commands.map((cmd, i) => (
          <div key={i} className="mb-2">
            {cmd.input && (
              <div className="flex">
                <span className="text-blue-500">guest@terminal</span>
                <span className="text-white">:</span>
                <span className="text-purple-500">{currentPath}</span>
                <span className="text-white">$ </span>
                <span>{cmd.input}</span>
              </div>
            )}
            <div className="whitespace-pre-wrap">{cmd.output}</div>
          </div>
        ))}
        <div className="flex">
          <span className="text-blue-500">guest@terminal</span>
          <span className="text-white">:</span>
          <span className="text-purple-500">{currentPath}</span>
          <span className="text-white">$ </span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleCommand}
            className="flex-1 bg-transparent outline-none border-none"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};

export default TerminalPage; 