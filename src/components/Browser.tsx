
import { useState } from 'react';
import { Globe, RefreshCw, Home, ArrowLeft, ArrowRight, Minimize2, Square, X } from 'lucide-react';

interface BrowserProps {
  onClose?: () => void;
  onMinimize?: () => void;
}

export const Browser = ({ onClose, onMinimize }: BrowserProps) => {
  const [url, setUrl] = useState('portfoliovivekanand.netlify.app');
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleNavigate = (newUrl: string) => {
    setUrl(newUrl);
    handleRefresh();
  };

  return (
    <div className="glass rounded-lg overflow-hidden shadow-2xl w-full h-full flex flex-col">
      {/* Browser Header */}
      <div className="bg-black/50 px-4 py-2 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2">
          <Globe size={16} className="text-blue-400" />
          <span className="text-sm font-mono text-blue-400">Portfolio Browser</span>
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

      {/* Navigation Bar */}
      <div className="bg-black/30 px-4 py-2 flex items-center gap-2 border-b border-white/10">
        <button className="p-1 hover:bg-white/10 rounded transition-colors" disabled>
          <ArrowLeft size={16} className="text-gray-500" />
        </button>
        <button className="p-1 hover:bg-white/10 rounded transition-colors" disabled>
          <ArrowRight size={16} className="text-gray-500" />
        </button>
        <button 
          onClick={handleRefresh}
          className="p-1 hover:bg-white/10 rounded transition-colors"
        >
          <RefreshCw size={16} className={`text-white ${isLoading ? 'animate-spin' : ''}`} />
        </button>
        <button 
          onClick={() => handleNavigate('portfoliovivekanand.netlify.app')}
          className="p-1 hover:bg-white/10 rounded transition-colors"
        >
          <Home size={16} className="text-white" />
        </button>
        
        {/* URL Bar */}
        <div className="flex-1 flex items-center bg-black/50 rounded px-3 py-1 border border-white/20">
          <Globe size={14} className="text-gray-400 mr-2" />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleNavigate(url)}
            className="flex-1 bg-transparent outline-none text-white text-sm"
            placeholder="Enter URL..."
          />
        </div>
      </div>

      {/* Browser Content */}
      <div className="flex-1 bg-black/20 relative">
        {isLoading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
            <div className="text-center">
              <RefreshCw size={32} className="text-blue-400 animate-spin mx-auto mb-2" />
              <p className="text-white">Loading...</p>
            </div>
          </div>
        )}
        
        <iframe
          src={`https://${url}`}
          className="w-full h-full border-0"
          title="Portfolio Website"
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </div>
  );
};
