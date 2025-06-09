
import { useEffect, useRef } from 'react';
import { MatrixRain } from '../components/MatrixRain';

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{
          backgroundImage: `url('/lovable-uploads/ef4b6569-7747-4438-955a-5ef3b43914ee.png')`
        }}
      />
      
      {/* Matrix Rain Effect */}
      <MatrixRain />
      
      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-green-400 animate-fade-in font-mono tracking-wider">
            MATRIX
          </h1>
          <div className="text-xl md:text-2xl text-green-300 mb-8 animate-fade-in font-mono">
            <div className="typing-animation">
              Wake up, Neo...
            </div>
          </div>
          <p className="text-lg text-green-200 opacity-80 font-mono leading-relaxed animate-fade-in">
            The Matrix has you. Follow the white rabbit.
          </p>
          
          {/* Glitch effect text */}
          <div className="mt-12 text-green-400 font-mono text-sm opacity-60 glitch-text">
            REALITY.EXE HAS STOPPED WORKING
          </div>
        </div>
      </div>
      
      {/* Scanning line effect */}
      <div className="scan-line"></div>
    </div>
  );
};

export default Index;
