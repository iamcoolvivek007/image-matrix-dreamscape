
import { useState, useEffect } from 'react';
import { Terminal, Globe, Folder, Settings } from 'lucide-react';
import { Terminal as TerminalComponent } from './Terminal';
import { Browser } from './Browser';
import { SystemPanel } from './SystemPanel';
import { FileSystemPanel } from './FileSystemPanel';
import { NetworkPanel } from './NetworkPanel';
import { ProcessPanel } from './ProcessPanel';

interface Window {
  id: string;
  type: 'terminal' | 'browser' | 'fileManager' | 'settings';
  title: string;
  isMinimized: boolean;
  isMaximized: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
}

export const Dashboard = () => {
  const [windows, setWindows] = useState<Window[]>([]);

  const openWindow = (type: Window['type'], title: string) => {
    const newWindow: Window = {
      id: `${type}-${Date.now()}`,
      type,
      title,
      isMinimized: false,
      isMaximized: false,
      x: Math.random() * 200 + 300,
      y: Math.random() * 100 + 100,
      width: type === 'terminal' ? 700 : 900,
      height: type === 'terminal' ? 500 : 600,
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
      <div
        key={window.id}
        className="absolute glass-strong rounded border border-white/20"
        style={{
          left: window.x,
          top: window.y,
          width: window.width,
          height: window.height,
          zIndex: 50
        }}
      >
        {window.type === 'terminal' && (
          <TerminalComponent 
            onClose={() => closeWindow(window.id)}
            onMinimize={() => minimizeWindow(window.id)}
          />
        )}
        {window.type === 'browser' && (
          <Browser 
            onClose={() => closeWindow(window.id)}
            onMinimize={() => minimizeWindow(window.id)}
          />
        )}
      </div>
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Very Small Desktop Icons */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-6 z-10">
        <div 
          className="glass-ultra p-2 rounded cursor-pointer hover:bg-white/10 transition-all group border border-white/10"
          onClick={() => openWindow('terminal', 'MAIN SHELL')}
        >
          <Terminal size={16} className="text-cyan-400 group-hover:scale-110 transition-transform" />
        </div>
        
        <div 
          className="glass-ultra p-2 rounded cursor-pointer hover:bg-white/10 transition-all group border border-white/10"
          onClick={() => openWindow('browser', 'Browser')}
        >
          <Globe size={16} className="text-blue-400 group-hover:scale-110 transition-transform" />
        </div>
        
        <div className="glass-ultra p-2 rounded cursor-pointer hover:bg-white/10 transition-all group border border-white/10">
          <Folder size={16} className="text-yellow-400 group-hover:scale-110 transition-transform" />
        </div>
        
        <div className="glass-ultra p-2 rounded cursor-pointer hover:bg-white/10 transition-all group border border-white/10">
          <Settings size={16} className="text-gray-400 group-hover:scale-110 transition-transform" />
        </div>
      </div>

      {/* System Panels */}
      <SystemPanel />
      <NetworkPanel />
      <FileSystemPanel />
      <ProcessPanel />

      {/* Render Windows */}
      {windows.map(renderWindow)}

      {/* Taskbar with minimized windows */}
      {windows.some(w => w.isMinimized) && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-20">
          <div className="glass-ultra px-4 py-2 rounded border border-white/20 flex gap-2">
            {windows.filter(w => w.isMinimized).map(window => (
              <button
                key={window.id}
                onClick={() => restoreWindow(window.id)}
                className="flex items-center gap-2 px-3 py-1 hover:bg-white/10 rounded transition-colors"
              >
                {window.type === 'terminal' && <Terminal size={12} className="text-cyan-400" />}
                {window.type === 'browser' && <Globe size={12} className="text-blue-400" />}
                <span className="text-white text-xs font-mono">{window.title}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
