
import { useEffect, useRef } from 'react';
import { 
  Terminal, 
  Folder, 
  Globe, 
  Settings, 
  Image, 
  Music, 
  FileText, 
  Calculator,
  User,
  Power,
  LogOut
} from 'lucide-react';

interface StartMenuProps {
  onClose: () => void;
}

export const StartMenu = ({ onClose }: StartMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const menuItems = [
    { icon: Terminal, label: 'Terminal', category: 'System' },
    { icon: Folder, label: 'File Manager', category: 'System' },
    { icon: Globe, label: 'Web Browser', category: 'Internet' },
    { icon: Settings, label: 'Settings', category: 'System' },
    { icon: Image, label: 'Image Viewer', category: 'Graphics' },
    { icon: Music, label: 'Media Player', category: 'Multimedia' },
    { icon: FileText, label: 'Text Editor', category: 'Office' },
    { icon: Calculator, label: 'Calculator', category: 'Accessories' },
  ];

  return (
    <div
      ref={menuRef}
      className="fixed bottom-12 left-2 w-80 bg-gray-900 border border-gray-700 rounded-t-lg shadow-2xl z-30 font-mono"
    >
      {/* User Section */}
      <div className="bg-gray-800 p-4 border-b border-gray-700 rounded-t-lg">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
            <User size={24} className="text-white" />
          </div>
          <div>
            <div className="text-white font-semibold">User</div>
            <div className="text-gray-400 text-sm">Linux Desktop</div>
          </div>
        </div>
      </div>

      {/* Applications */}
      <div className="max-h-96 overflow-y-auto">
        <div className="p-2">
          <div className="text-gray-400 text-xs font-semibold mb-2 px-2">APPLICATIONS</div>
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="w-full flex items-center gap-3 p-2 hover:bg-gray-800 rounded text-white transition-colors text-left"
              onClick={() => {
                console.log(`Opening ${item.label}`);
                onClose();
              }}
            >
              <item.icon size={16} />
              <div>
                <div className="text-sm">{item.label}</div>
                <div className="text-xs text-gray-500">{item.category}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Power Options */}
      <div className="border-t border-gray-700 p-2">
        <div className="flex gap-1">
          <button className="flex-1 flex items-center justify-center gap-2 p-2 hover:bg-gray-800 rounded text-white transition-colors">
            <LogOut size={16} />
            <span className="text-sm">Log Out</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 p-2 hover:bg-gray-800 rounded text-red-400 transition-colors">
            <Power size={16} />
            <span className="text-sm">Shutdown</span>
          </button>
        </div>
      </div>
    </div>
  );
};
