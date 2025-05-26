interface FileSystem {
  [key: string]: {
    type: 'file' | 'directory';
    content?: string;
    children?: FileSystem;
  };
}

const fileSystem: FileSystem = {
  'home': {
    type: 'directory',
    children: {
      'readme.txt': {
        type: 'file',
        content: 'Welcome to the Terminal Clone!\n\nThis is a web-based terminal emulator that simulates basic Unix commands.\nTry these commands:\n- ls: List directory contents\n- pwd: Print working directory\n- cd: Change directory\n- cat: Read file contents\n- touch: Create a new file\n- mkdir: Create a new directory\n- clear: Clear the terminal\n- help: Show this help message'
      },
      'projects': {
        type: 'directory',
        children: {
          'hello.c': {
            type: 'file',
            content: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}'
          }
        }
      }
    }
  }
};

export interface CommandResult {
  success: boolean;
  output: string;
}

export class TerminalState {
  private currentPath: string[] = ['home'];
  private fileSystem: FileSystem = fileSystem;

  getCurrentDirectory(): FileSystem | undefined {
    let current = this.fileSystem;
    for (const dir of this.currentPath) {
      if (!current[dir] || current[dir].type !== 'directory') {
        return undefined;
      }
      current = current[dir].children || {};
    }
    return current;
  }

  pwd(): CommandResult {
    return {
      success: true,
      output: '/' + this.currentPath.join('/')
    };
  }

  ls(): CommandResult {
    const currentDir = this.getCurrentDirectory();
    if (!currentDir) {
      return {
        success: false,
        output: 'Directory not found'
      };
    }

    const items = Object.entries(currentDir).map(([name, item]) => {
      if (item.type === 'directory') {
        return name + '/';
      }
      return name;
    });

    return {
      success: true,
      output: items.join('  ')
    };
  }

  cd(path: string): CommandResult {
    if (path === '..') {
      if (this.currentPath.length > 1) {
        this.currentPath.pop();
        return {
          success: true,
          output: ''
        };
      }
      return {
        success: false,
        output: 'Cannot go up from root'
      };
    }

    if (path === '~' || path === '/') {
      this.currentPath = ['home'];
      return {
        success: true,
        output: ''
      };
    }

    const currentDir = this.getCurrentDirectory();
    if (!currentDir || !currentDir[path] || currentDir[path].type !== 'directory') {
      return {
        success: false,
        output: `cd: ${path}: No such directory`
      };
    }

    this.currentPath.push(path);
    return {
      success: true,
      output: ''
    };
  }

  cat(filename: string): CommandResult {
    const currentDir = this.getCurrentDirectory();
    if (!currentDir || !currentDir[filename] || currentDir[filename].type !== 'file') {
      return {
        success: false,
        output: `cat: ${filename}: No such file`
      };
    }

    return {
      success: true,
      output: currentDir[filename].content || ''
    };
  }

  touch(filename: string): CommandResult {
    if (!filename) {
      return {
        success: false,
        output: 'touch: missing file operand'
      };
    }

    const currentDir = this.getCurrentDirectory();
    if (!currentDir) {
      return {
        success: false,
        output: 'touch: cannot create file: Directory not found'
      };
    }

    if (currentDir[filename]) {
      return {
        success: false,
        output: `touch: cannot create file '${filename}': File exists`
      };
    }

    currentDir[filename] = {
      type: 'file',
      content: ''
    };

    return {
      success: true,
      output: ''
    };
  }

  mkdir(dirname: string): CommandResult {
    if (!dirname) {
      return {
        success: false,
        output: 'mkdir: missing directory operand'
      };
    }

    const currentDir = this.getCurrentDirectory();
    if (!currentDir) {
      return {
        success: false,
        output: 'mkdir: cannot create directory: Path not found'
      };
    }

    if (currentDir[dirname]) {
      return {
        success: false,
        output: `mkdir: cannot create directory '${dirname}': File exists`
      };
    }

    currentDir[dirname] = {
      type: 'directory',
      children: {}
    };

    return {
      success: true,
      output: ''
    };
  }

  clear(): CommandResult {
    return {
      success: true,
      output: '<CLEAR>'
    };
  }

  help(): CommandResult {
    return {
      success: true,
      output: 'Available commands:\n' +
        '  ls              List directory contents\n' +
        '  pwd             Print working directory\n' +
        '  cd <dir>       Change directory\n' +
        '  cat <file>     Display file contents\n' +
        '  touch <file>   Create a new empty file\n' +
        '  mkdir <dir>    Create a new directory\n' +
        '  clear          Clear the terminal\n' +
        '  help           Show this help message'
    };
  }

  executeCommand(commandLine: string): CommandResult {
    const parts = commandLine.trim().split(/\s+/);
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (command) {
      case 'ls':
        return this.ls();
      case 'pwd':
        return this.pwd();
      case 'cd':
        return this.cd(args[0] || '~');
      case 'cat':
        if (!args[0]) {
          return {
            success: false,
            output: 'Usage: cat <filename>'
          };
        }
        return this.cat(args[0]);
      case 'touch':
        return this.touch(args[0]);
      case 'mkdir':
        return this.mkdir(args[0]);
      case 'clear':
        return this.clear();
      case 'help':
        return this.help();
      default:
        return {
          success: false,
          output: `Command not found: ${command}`
        };
    }
  }
} 