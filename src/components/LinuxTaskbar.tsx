
import { useState } from 'react';
import { Menu, Terminal, Folder, Globe, Settings, Power } from 'lucide-react';
import { StartMenu } from './StartMenu';

export const LinuxTaskbar = () => {
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useState(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  });

  const toggleStartMenu = () => {
    setStartMenuOpen(!startMenuOpen);
  };

  return (
    <>
      {/* Start Menu */}
      {startMenuOpen && (
        <StartMenu onClose={() => setStartMenuOpen(false)} />
      )}
      
      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 h-12 bg-gray-900 border-t border-gray-700 flex items-center px-2 z-20">
        {/* Start Button */}
        <button
          onClick={toggleStartMenu}
          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-800 rounded text-white font-mono text-sm transition-colors"
        >
          <Menu size={16} />
          <span>Start</span>
        </button>

        {/* Quick Launch Icons */}
        <div className="flex items-center gap-1 ml-4">
          <button className="p-2 hover:bg-gray-800 rounded text-white transition-colors">
            <Terminal size={16} />
          </button>
          <button className="p-2 hover:bg-gray-800 rounded text-white transition-colors">
            <Folder size={16} />
          </button>
          <button className="p-2 hover:bg-gray-800 rounded text-white transition-colors">
            <Globe size={16} />
          </button>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* System Tray */}
        <div className="flex items-center gap-2">
          {/* System Icons */}
          <button className="p-1 hover:bg-gray-800 rounded text-white transition-colors">
            <Settings size={14} />
          </button>
          
          {/* Clock */}
          <div className="text-white font-mono text-sm px-2">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          
          {/* Power Button */}
          <button className="p-1 hover:bg-gray-800 rounded text-red-400 transition-colors">
            <Power size={14} />
          </button>
        </div>
      </div>
    </>
  );
};
