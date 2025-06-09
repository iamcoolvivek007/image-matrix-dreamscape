
import { useState, useEffect } from 'react';
import { Wifi, Globe, Activity } from 'lucide-react';

export const NetworkPanel = () => {
  const [networkData, setNetworkData] = useState({
    status: 'ONLINE',
    ip: '194.187.249.35',
    ping: Math.floor(Math.random() * 50) + 10,
    upload: Math.random() * 10,
    download: Math.random() * 50
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setNetworkData(prev => ({
        ...prev,
        ping: Math.floor(Math.random() * 50) + 10,
        upload: Math.random() * 10,
        download: Math.random() * 50
      }));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed top-2 right-2 w-64 space-y-2 z-20">
      {/* Network Status */}
      <div className="glass-ultra p-3 rounded border border-white/10">
        <div className="flex items-center gap-2 mb-2">
          <Wifi size={14} className="text-cyan-400" />
          <span className="text-sm text-cyan-400 font-mono">NETWORK STATUS</span>
        </div>
        <div className="space-y-1 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-400">STATE</span>
            <span className="text-green-400">{networkData.status}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">IP</span>
            <span className="text-white">{networkData.ip}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">PING</span>
            <span className="text-cyan-400">{networkData.ping}ms</span>
          </div>
        </div>
      </div>

      {/* World View */}
      <div className="glass-ultra p-3 rounded border border-white/10">
        <div className="flex items-center gap-2 mb-2">
          <Globe size={14} className="text-blue-400" />
          <span className="text-sm text-cyan-400 font-mono">WORLD VIEW</span>
        </div>
        <div className="text-xs text-gray-400 mb-2">GLOBAL NETWORK MAP</div>
        <div className="w-full h-24 bg-black/50 rounded border border-white/10 relative overflow-hidden">
          {/* Simplified world map representation */}
          <div className="absolute inset-0 opacity-30">
            {Array.from({ length: 20 }, (_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Network Traffic */}
      <div className="glass-ultra p-3 rounded border border-white/10">
        <div className="flex items-center gap-2 mb-2">
          <Activity size={14} className="text-green-400" />
          <span className="text-sm text-cyan-400 font-mono">NETWORK TRAFFIC</span>
        </div>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-400">UP/DOWN MB/S</span>
          </div>
          <div className="flex justify-between">
            <span className="text-green-400">TOTAL</span>
            <span className="text-white">{networkData.upload.toFixed(1)}/{networkData.download.toFixed(1)}</span>
          </div>
          
          {/* Traffic Graph */}
          <div className="w-full h-12 bg-black/50 rounded border border-white/10 relative">
            <svg className="w-full h-full">
              <polyline
                fill="none"
                stroke="#00ffff"
                strokeWidth="1"
                points={Array.from({ length: 20 }, (_, i) => 
                  `${i * 5},${Math.random() * 40 + 5}`
                ).join(' ')}
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
