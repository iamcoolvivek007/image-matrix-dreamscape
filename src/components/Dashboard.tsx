
import { useState, useEffect } from 'react';
import { Terminal, Globe, Folder, Settings } from 'lucide-react';
import { Terminal as TerminalComponent } from './Terminal';
import { Browser } from './Browser';
import { SystemPanel } from './SystemPanel';
import { FileSystemPanel } from './FileSystemPanel';
import { NetworkPanel } from './NetworkPanel';
import { ProcessPanel } from './ProcessPanel';
import { ResizableWindow } from './ResizableWindow';
import anime from 'animejs/lib/anime.es.js';

interface Window {
  id: string;
  type: 'terminal' | 'browser' | 'fileManager' | 'settings';
  title: string;
  isMinimized: boolean;
}

export const Dashboard = () => {
  const [windows, setWindows] = useState<Window[]>([]);

  useEffect(() => {
    // Animate desktop icons entrance
    anime({
      targets: '.desktop-icon',
      scale: [0, 1],
      opacity: [0, 1],
      delay: anime.stagger(100),
      duration: 800,
      easing: 'easeOutBack'
    });
  }, []);

  const openWindow = (type: Window['type'], title: string) => {
    const newWindow: Window = {
      id: `${type}-${Date.now()}`,
      type,
      title,
      isMinimized: false,
    };
    setWindows(prev => [...prev, newWindow]);
  };

  const closeWindow = (id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  };

  const minimizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMinimized: true } : w
    ));
  };

  const restoreWindow = (id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMinimized: false } : w
    ));
  };

  const renderWindow = (window: Window) => {
    if (window.isMinimized) return null;

    return (
      <ResizableWindow
        key={window.id}
        title={window.title}
        onClose={() => closeWindow(window.id)}
        onMinimize={() => minimizeWindow(window.id)}
        initialX={Math.random() * 200 + 300}
        initialY={Math.random() * 100 + 100}
        initialWidth={window.type === 'terminal' ? 700 : 900}
        initialHeight={window.type === 'terminal' ? 500 : 600}
      >
        {window.type === 'terminal' && <TerminalComponent />}
        {window.type === 'browser' && <Browser />}
        {window.type === 'fileManager' && <div className="p-4 text-white">File Manager</div>}
        {window.type === 'settings' && <div className="p-4 text-white">Settings</div>}
      </ResizableWindow>
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Ultra Small Desktop Icons */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-6 z-10">
        <div 
          className="desktop-icon glass-ultra p-2 rounded cursor-pointer interactive floating border border-white/5"
          onClick={() => openWindow('terminal', 'MAIN SHELL')}
        >
          <Terminal size={12} className="text-white/80" />
        </div>
        
        <div 
          className="desktop-icon glass-ultra p-2 rounded cursor-pointer interactive floating border border-white/5"
          onClick={() => openWindow('browser', 'Portfolio Browser')}
        >
          <Globe size={12} className="text-white/80" />
        </div>
        
        <div 
          className="desktop-icon glass-ultra p-2 rounded cursor-pointer interactive floating border border-white/5"
          onClick={() => openWindow('fileManager', 'File Manager')}
        >
          <Folder size={12} className="text-white/80" />
        </div>
        
        <div 
          className="desktop-icon glass-ultra p-2 rounded cursor-pointer interactive floating border border-white/5"
          onClick={() => openWindow('settings', 'System Settings')}
        >
          <Settings size={12} className="text-white/80" />
        </div>
      </div>

      {/* System Panels with enhanced transparency */}
      <SystemPanel />
      <NetworkPanel />
      <FileSystemPanel />
      <ProcessPanel />

      {/* Render Windows */}
      {windows.map(renderWindow)}

      {/* Minimized Windows Taskbar */}
      {windows.some(w => w.isMinimized) && (
        <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2 z-20">
          <div className="glass-ultra px-4 py-2 rounded border border-white/5 flex gap-2">
            {windows.filter(w => w.isMinimized).map(window => (
              <button
                key={window.id}
                onClick={() => restoreWindow(window.id)}
                className="flex items-center gap-2 px-3 py-1 glass-ultra rounded interactive transition-all hover:glass-strong"
              >
                {window.type === 'terminal' && <Terminal size={10} className="text-white/80" />}
                {window.type === 'browser' && <Globe size={10} className="text-white/80" />}
                {window.type === 'fileManager' && <Folder size={10} className="text-white/80" />}
                {window.type === 'settings' && <Settings size={10} className="text-white/80" />}
                <span className="text-white/80 text-xs font-mono">{window.title}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
