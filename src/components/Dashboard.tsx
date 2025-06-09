
import { useState, useEffect } from 'react';
import { Terminal, Globe, Folder, Settings, Cpu, Activity, Cloud, Thermometer } from 'lucide-react';
import { Terminal as TerminalComponent } from './Terminal';
import { Browser } from './Browser';

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
  const [time, setTime] = useState(new Date());
  const [systemStats, setSystemStats] = useState({
    cpu: Math.floor(Math.random() * 100),
    memory: Math.floor(Math.random() * 100),
    temp: Math.floor(Math.random() * 30) + 40
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      setSystemStats({
        cpu: Math.floor(Math.random() * 100),
        memory: Math.floor(Math.random() * 100),
        temp: Math.floor(Math.random() * 30) + 40
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const openWindow = (type: Window['type'], title: string) => {
    const newWindow: Window = {
      id: `${type}-${Date.now()}`,
      type,
      title,
      isMinimized: false,
      isMaximized: false,
      x: Math.random() * 200 + 100,
      y: Math.random() * 100 + 100,
      width: type === 'terminal' ? 600 : 800,
      height: type === 'terminal' ? 400 : 600,
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
        className="absolute glass rounded-lg shadow-2xl"
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
      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 z-10 space-y-4">
        <div 
          className="glass p-3 rounded-lg cursor-pointer hover:bg-white/10 transition-all group"
          onClick={() => openWindow('terminal', 'Terminal')}
        >
          <Terminal size={32} className="text-green-400 group-hover:scale-110 transition-transform" />
          <p className="text-xs text-white mt-1 text-center">Terminal</p>
        </div>
        
        <div 
          className="glass p-3 rounded-lg cursor-pointer hover:bg-white/10 transition-all group"
          onClick={() => openWindow('browser', 'Portfolio Browser')}
        >
          <Globe size={32} className="text-blue-400 group-hover:scale-110 transition-transform" />
          <p className="text-xs text-white mt-1 text-center">Browser</p>
        </div>
        
        <div className="glass p-3 rounded-lg cursor-pointer hover:bg-white/10 transition-all group">
          <Folder size={32} className="text-yellow-400 group-hover:scale-110 transition-transform" />
          <p className="text-xs text-white mt-1 text-center">Files</p>
        </div>
        
        <div className="glass p-3 rounded-lg cursor-pointer hover:bg-white/10 transition-all group">
          <Settings size={32} className="text-gray-400 group-hover:scale-110 transition-transform" />
          <p className="text-xs text-white mt-1 text-center">Settings</p>
        </div>
      </div>

      {/* System Stats Widget */}
      <div className="absolute top-4 right-4 z-10 glass p-4 rounded-lg w-64">
        <h3 className="text-cyan-400 font-mono text-sm mb-3 neon-text">SYSTEM STATUS</h3>
        
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu size={14} className="text-blue-400" />
              <span className="text-white">CPU</span>
            </div>
            <span className="text-green-400">{systemStats.cpu}%</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity size={14} className="text-purple-400" />
              <span className="text-white">Memory</span>
            </div>
            <span className="text-green-400">{systemStats.memory}%</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Thermometer size={14} className="text-orange-400" />
              <span className="text-white">Temp</span>
            </div>
            <span className="text-green-400">{systemStats.temp}°C</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cloud size={14} className="text-cyan-400" />
              <span className="text-white">Network</span>
            </div>
            <span className="text-green-400">Online</span>
          </div>
        </div>
        
        <div className="mt-4 pt-3 border-t border-white/20">
          <p className="text-cyan-400 text-xs font-mono">
            {time.toLocaleTimeString()}
          </p>
          <p className="text-gray-400 text-xs">
            {time.toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Render Windows */}
      {windows.map(renderWindow)}

      {/* Taskbar with minimized windows */}
      {windows.some(w => w.isMinimized) && (
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20">
          <div className="glass px-4 py-2 rounded-lg flex gap-2">
            {windows.filter(w => w.isMinimized).map(window => (
              <button
                key={window.id}
                onClick={() => restoreWindow(window.id)}
                className="flex items-center gap-2 px-3 py-1 hover:bg-white/10 rounded transition-colors"
              >
                {window.type === 'terminal' && <Terminal size={16} className="text-green-400" />}
                {window.type === 'browser' && <Globe size={16} className="text-blue-400" />}
                <span className="text-white text-sm">{window.title}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
