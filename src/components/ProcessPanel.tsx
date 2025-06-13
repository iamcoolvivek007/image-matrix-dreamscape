
import { useState, useEffect } from 'react';
import { Activity, Cpu } from 'lucide-react';

export const ProcessPanel = () => {
  const [processes] = useState([
    { pid: 5636, name: 'edex-ui', cpu: 10.3, mem: 2 },
    { pid: 1, name: 'systemd', cpu: 5.4, mem: 4 },
    { pid: 1137, name: 'edex-ui', cpu: 4.1, mem: 14 },
    { pid: 2318, name: 'Xorg', cpu: 0, mem: 8 },
    { pid: 567, name: 'edex-ui', cpu: 0.8, mem: 14 }
  ]);

  return (
    <div className="fixed bottom-16 right-2 w-72 glass-ultra rounded border border-white/5 p-3 z-20 interactive">
      <div className="flex items-center gap-2 mb-3 border-b border-white/10 pb-2">
        <Activity size={14} className="text-white/70" />
        <span className="text-sm text-white/80 font-mono">TOP PROCESSES</span>
      </div>
      
      <div className="space-y-1">
        <div className="grid grid-cols-4 gap-2 text-xs text-white/60 font-mono border-b border-white/10 pb-1">
          <span>PID</span>
          <span>NAME</span>
          <span>CPU</span>
          <span>MEM</span>
        </div>
        
        {processes.map((process) => (
          <div key={process.pid} className="grid grid-cols-4 gap-2 text-xs font-mono">
            <span className="text-white/90">{process.pid}</span>
            <span className="text-white/80">{process.name}</span>
            <span className="text-white/70">{process.cpu}%</span>
            <span className="text-white/70">{process.mem}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};
