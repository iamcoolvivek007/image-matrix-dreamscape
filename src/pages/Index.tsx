
import { useEffect, useRef } from 'react';
import { MatrixRain } from '../components/MatrixRain';
import { LinuxTaskbar } from '../components/LinuxTaskbar';

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 grayscale"
        style={{
          backgroundImage: `url('/lovable-uploads/ef4b6569-7747-4438-955a-5ef3b43914ee.png')`
        }}
      />
      
      {/* Matrix Rain Effect */}
      <MatrixRain />
      
      {/* Desktop Area */}
      <div className="relative z-10 min-h-screen pb-12">
        {/* Desktop content area - empty for now, can add desktop icons later */}
      </div>
      
      {/* Linux Taskbar */}
      <LinuxTaskbar />
    </div>
  );
};

export default Index;
