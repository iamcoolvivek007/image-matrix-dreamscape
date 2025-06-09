
import { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, Minimize2, Square, X } from 'lucide-react';

interface TerminalProps {
  onClose?: () => void;
  onMinimize?: () => void;
}

export const Terminal = ({ onClose, onMinimize }: TerminalProps) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    'Welcome to Vivekanand Portfolio Terminal v2.0',
    'Type "help" for available commands',
    '',
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = {
    help: () => [
      'Available commands:',
      '  help        - Show this help message',
      '  clear       - Clear terminal',
      '  about       - About Vivekanand',
      '  skills      - List technical skills',
      '  projects    - Show projects',
      '  contact     - Contact information',
      '  neofetch    - System information',
      '  whoami      - Current user',
      '  date        - Current date and time',
      '  echo <text> - Echo text',
      '',
    ],
    clear: () => {
      setHistory([]);
      return [];
    },
    about: () => [
      '================================',
      '         VIVEKANAND PROFILE     ',
      '================================',
      '',
      'Full Stack Developer & Tech Enthusiast',
      'Passionate about creating innovative solutions',
      'Always learning and exploring new technologies',
      '',
    ],
    skills: () => [
      'Technical Skills:',
      '├── Frontend: React, TypeScript, Tailwind CSS',
      '├── Backend: Node.js, Python, Express',
      '├── Database: MongoDB, PostgreSQL, MySQL',
      '├── Cloud: AWS, Docker, Kubernetes',
      '├── Tools: Git, VS Code, Linux',
      '└── AI/ML: TensorFlow, PyTorch',
      '',
    ],
    projects: () => [
      'Featured Projects:',
      '┌─ Portfolio Website',
      '│  └─ Modern portfolio with interactive features',
      '├─ E-commerce Platform',
      '│  └─ Full-stack web application',
      '├─ Mobile App',
      '│  └─ React Native cross-platform app',
      '└─ AI Chatbot',
      '   └─ NLP-powered customer service bot',
      '',
    ],
    contact: () => [
      'Contact Information:',
      '📧 Email: contact@vivekanand.dev',
      '🌐 Website: portfoliovivekanand.netlify.app',
      '💼 LinkedIn: /in/vivekanand',
      '🐙 GitHub: /vivekanand',
      '',
    ],
    neofetch: () => [
      '                   -`                    vivekanand@portfolio',
      '                  .o+`                   ───────────────────',
      '                 `ooo/                   OS: Portfolio Linux 2024',
      '                `+oooo:                  Host: Futuristic Dashboard',
      '               `+oooooo:                 Kernel: ReactOS 18.3.1',
      '               -+oooooo+:                Uptime: Always Online',
      '             `/:-:++oooo+:               Packages: npm, yarn, bun',
      '            `/++++/+++++++:              Shell: portfolio-shell',
      '           `/++++++++++++++:             Resolution: Responsive',
      '          `/+++ooooooooooooo/`           Terminal: Interactive Terminal',
      '         ./ooosssso++osssssso+`          CPU: Developer Brain (8 cores)',
      '        .oossssso-````/ossssss+`         Memory: Unlimited Creativity',
      '       -osssssso.      :ssssssso.        ',
      '      :osssssss/        osssso+++.       ',
      '     /ossssssss/        +ssssooo/-       ',
      '   `/ossssso+/:-        -:/+osssso+-     ',
      '  `+sso+:-`                 `.-/+oso:    ',
      ' `++:.                           `-/+/   ',
      ' .`                                 `/   ',
      '',
    ],
    whoami: () => ['vivekanand', ''],
    date: () => [new Date().toString(), ''],
  };

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    const [command, ...args] = trimmedCmd.split(' ');
    
    setHistory(prev => [...prev, `vivekanand@portfolio:~$ ${trimmedCmd}`]);
    
    if (command === '') return;
    
    if (command === 'echo') {
      setHistory(prev => [...prev, args.join(' '), '']);
    } else if (commands[command as keyof typeof commands]) {
      const output = commands[command as keyof typeof commands]();
      setHistory(prev => [...prev, ...output]);
    } else {
      setHistory(prev => [...prev, `Command not found: ${command}`, 'Type "help" for available commands', '']);
    }
    
    setCommandHistory(prev => [...prev, trimmedCmd]);
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="glass rounded-lg overflow-hidden shadow-2xl w-full h-full flex flex-col">
      {/* Terminal Header */}
      <div className="bg-black/50 px-4 py-2 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2">
          <TerminalIcon size={16} className="text-green-400" />
          <span className="text-sm font-mono text-green-400">Terminal</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={onMinimize}
            className="w-6 h-6 rounded bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center transition-colors"
          >
            <Minimize2 size={12} className="text-black" />
          </button>
          <button className="w-6 h-6 rounded bg-green-500 hover:bg-green-600 flex items-center justify-center transition-colors">
            <Square size={8} className="text-black" />
          </button>
          <button
            onClick={onClose}
            className="w-6 h-6 rounded bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors"
          >
            <X size={12} className="text-black" />
          </button>
        </div>
      </div>

      {/* Terminal Content */}
      <div 
        ref={terminalRef}
        className="flex-1 p-4 bg-black/80 text-green-400 font-mono text-sm overflow-y-auto custom-scrollbar"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((line, index) => (
          <div key={index} className="terminal-line whitespace-pre-wrap">
            {line}
          </div>
        ))}
        
        {/* Input Line */}
        <div className="flex items-center">
          <span className="text-green-500">vivekanand@portfolio:~$ </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-green-400 ml-1"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};
