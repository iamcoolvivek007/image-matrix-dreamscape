
import { useState } from 'react';
import { Folder, File, Settings, Database, HardDrive, Globe } from 'lucide-react';

export const FileSystemPanel = () => {
  const [selectedApp, setSelectedApp] = useState<string | null>(null);

  const apps = [
    { id: 'showFiles', icon: Folder, name: 'Show Files', category: 'filesystem' },
    { id: 'setup', icon: Settings, name: 'Setup', category: 'filesystem' },
    { id: 'storage', icon: HardDrive, name: 'Storage', category: 'filesystem' },
    { id: 'themes', icon: File, name: 'Themes', category: 'filesystem' },
    { id: 'database', icon: Database, name: 'Database', category: 'filesystem' },
    { id: 'fonts', icon: File, name: 'Fonts', category: 'filesystem' },
    { id: 'cache', icon: Folder, name: 'Cache', category: 'filesystem' },
    { id: 'gpucache', icon: Settings, name: 'GPUCache', category: 'filesystem' },
  ];

  return (
    <div className="fixed bottom-16 left-2 w-64 glass-ultra rounded border border-white/5 p-2 z-20 interactive">
      <div className="text-xs text-white/80 font-mono mb-2 border-b border-white/10 pb-1">
        FILESYSTEM
      </div>
      
      <div className="grid grid-cols-4 gap-1">
        {apps.map((app) => (
          <button
            key={app.id}
            onClick={() => setSelectedApp(app.id)}
            className={`flex flex-col items-center p-2 rounded transition-all interactive hover:glass-strong ${
              selectedApp === app.id ? 'glass-strong' : ''
            }`}
          >
            <app.icon size={14} className="text-white/70 mb-1" />
            <span className="text-xs text-white/80 font-mono leading-tight text-center">
              {app.name}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-2 pt-2 border-t border-white/10">
        <div className="text-xs text-white/60 font-mono">
          Mount: /home/squared used 71%
        </div>
      </div>
    </div>
  );
};
