
import { useState, useEffect } from 'react';
import { Activity, Cpu, HardDrive, Thermometer, Wifi, Battery } from 'lucide-react';

export const SystemPanel = () => {
  const [time, setTime] = useState(new Date());
  const [systemStats, setSystemStats] = useState({
    cpu: Math.floor(Math.random() * 100),
    memory: Math.floor(Math.random() * 100),
    disk: Math.floor(Math.random() * 100),
    temp: Math.floor(Math.random() * 30) + 40,
    uptime: '1:09:51'
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      setSystemStats(prev => ({
        ...prev,
        cpu: Math.floor(Math.random() * 100),
        memory: Math.floor(Math.random() * 100),
        disk: Math.floor(Math.random() * 100),
        temp: Math.floor(Math.random() * 30) + 40
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed top-2 left-2 w-64 space-y-2 z-20">
      {/* Time Display */}
      <div className="glass-ultra p-3 rounded border border-white/5 pulse-glow">
        <div className="text-white/90 font-mono text-2xl">
          {time.toLocaleTimeString()}
        </div>
        <div className="text-xs text-white/60">
          {time.toLocaleDateString()}
        </div>
        <div className="text-xs text-white/70 mt-1">
          UPTIME: {systemStats.uptime}
        </div>
      </div>

      {/* CPU Usage */}
      <div className="glass-ultra p-2 rounded border border-white/5 interactive">
        <div className="flex items-center gap-2 mb-2">
          <Cpu size={12} className="text-white/70" />
          <span className="text-xs text-white/80 font-mono">CPU USAGE</span>
        </div>
        <div className="text-white/90 text-xs mb-1">{systemStats.cpu}%</div>
        <div className="w-full bg-black/30 h-8 relative rounded">
          {Array.from({ length: 50 }, (_, i) => (
            <div
              key={i}
              className={`absolute bottom-0 w-1 transition-all duration-300 ${
                i < (systemStats.cpu / 2) ? 'bg-white/70' : 'bg-white/20'
              }`}
              style={{ left: `${i * 2}%`, height: `${Math.random() * 100}%` }}
            />
          ))}
        </div>
      </div>

      {/* Memory Usage */}
      <div className="glass-ultra p-2 rounded border border-white/5 interactive">
        <div className="flex items-center gap-2 mb-2">
          <Activity size={12} className="text-white/70" />
          <span className="text-xs text-white/80 font-mono">MEMORY</span>
        </div>
        <div className="text-white/90 text-xs">
          {systemStats.memory}% ({(systemStats.memory * 8 / 100).toFixed(1)}GB / 8GB)
        </div>
        <div className="grid grid-cols-20 gap-px mt-1">
          {Array.from({ length: 100 }, (_, i) => (
            <div
              key={i}
              className={`h-1 transition-all duration-500 ${
                i < systemStats.memory ? 'bg-white/70' : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Temperature */}
      <div className="glass-ultra p-2 rounded border border-white/5 interactive">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Thermometer size={12} className="text-white/70" />
            <span className="text-xs text-white/80 font-mono">TEMP</span>
          </div>
          <span className="text-white/90 text-xs">{systemStats.temp}°C</span>
        </div>
      </div>

      {/* Network */}
      <div className="glass-ultra p-2 rounded border border-white/5 interactive">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wifi size={12} className="text-white/70" />
            <span className="text-xs text-white/80 font-mono">NETWORK</span>
          </div>
          <span className="text-white/70 text-xs">ONLINE</span>
        </div>
      </div>
    </div>
  );
};
