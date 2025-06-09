
import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

interface ResizableWindowProps {
  children: React.ReactNode;
  title: string;
  onClose?: () => void;
  onMinimize?: () => void;
  initialX?: number;
  initialY?: number;
  initialWidth?: number;
  initialHeight?: number;
  minWidth?: number;
  minHeight?: number;
}

export const ResizableWindow = ({
  children,
  title,
  onClose,
  onMinimize,
  initialX = 100,
  initialY = 100,
  initialWidth = 800,
  initialHeight = 600,
  minWidth = 400,
  minHeight = 300
}: ResizableWindowProps) => {
  const windowRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({
    width: initialWidth,
    height: initialHeight,
    x: initialX,
    y: initialY
  });

  useEffect(() => {
    if (windowRef.current && headerRef.current) {
      // Animate window entrance
      gsap.fromTo(windowRef.current, 
        { 
          scale: 0.8, 
          opacity: 0,
          y: 50
        },
        { 
          scale: 1, 
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "back.out(1.7)"
        }
      );

      // Make window draggable by header
      Draggable.create(windowRef.current, {
        trigger: headerRef.current,
        bounds: "body",
        onDrag: function() {
          setDimensions(prev => ({
            ...prev,
            x: this.x,
            y: this.y
          }));
        }
      });
    }
  }, []);

  const handleResize = (direction: string, e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = dimensions.width;
    const startHeight = dimensions.height;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      let newWidth = startWidth;
      let newHeight = startHeight;

      if (direction.includes('right')) {
        newWidth = Math.max(minWidth, startWidth + deltaX);
      }
      if (direction.includes('left')) {
        newWidth = Math.max(minWidth, startWidth - deltaX);
      }
      if (direction.includes('bottom')) {
        newHeight = Math.max(minHeight, startHeight + deltaY);
      }
      if (direction.includes('top')) {
        newHeight = Math.max(minHeight, startHeight - deltaY);
      }

      setDimensions(prev => ({
        ...prev,
        width: newWidth,
        height: newHeight
      }));
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      ref={windowRef}
      className="fixed glass-window rounded-lg overflow-hidden transform-3d"
      style={{
        left: dimensions.x,
        top: dimensions.y,
        width: dimensions.width,
        height: dimensions.height,
        zIndex: 50
      }}
    >
      {/* Window Header */}
      <div
        ref={headerRef}
        className="glass-strong px-4 py-2 border-b border-white/10 cursor-move select-none"
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-mono text-white/90">{title}</span>
          <div className="window-controls flex gap-2">
            {onMinimize && (
              <button
                onClick={onMinimize}
                className="window-control-btn flex items-center justify-center"
              >
                <div className="w-2 h-px bg-white/60"></div>
              </button>
            )}
            <button className="window-control-btn flex items-center justify-center">
              <div className="w-2 h-2 border border-white/60"></div>
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="window-control-btn flex items-center justify-center"
              >
                <div className="w-2 h-2">
                  <svg viewBox="0 0 12 12" className="w-full h-full fill-white/60">
                    <path d="M6 4.586L2.707 1.293a1 1 0 00-1.414 1.414L4.586 6 1.293 9.293a1 1 0 001.414 1.414L6 7.414l3.293 3.293a1 1 0 001.414-1.414L7.414 6l3.293-3.293a1 1 0 00-1.414-1.414L6 4.586z"/>
                  </svg>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Window Content */}
      <div className="h-full glass-scrollbar overflow-auto">
        {children}
      </div>

      {/* Resize Handles */}
      <div
        className="resize-handle edge-horizontal cursor-ns-resize"
        style={{ bottom: 0 }}
        onMouseDown={(e) => handleResize('bottom', e)}
      />
      <div
        className="resize-handle edge-horizontal cursor-ns-resize"
        style={{ top: 0 }}
        onMouseDown={(e) => handleResize('top', e)}
      />
      <div
        className="resize-handle edge-vertical cursor-ew-resize"
        style={{ right: 0 }}
        onMouseDown={(e) => handleResize('right', e)}
      />
      <div
        className="resize-handle edge-vertical cursor-ew-resize"
        style={{ left: 0 }}
        onMouseDown={(e) => handleResize('left', e)}
      />
      
      {/* Corner handles */}
      <div
        className="resize-handle corner cursor-nw-resize"
        style={{ top: 0, left: 0 }}
        onMouseDown={(e) => handleResize('top-left', e)}
      />
      <div
        className="resize-handle corner cursor-ne-resize"
        style={{ top: 0, right: 0 }}
        onMouseDown={(e) => handleResize('top-right', e)}
      />
      <div
        className="resize-handle corner cursor-sw-resize"
        style={{ bottom: 0, left: 0 }}
        onMouseDown={(e) => handleResize('bottom-left', e)}
      />
      <div
        className="resize-handle corner cursor-se-resize"
        style={{ bottom: 0, right: 0 }}
        onMouseDown={(e) => handleResize('bottom-right', e)}
      />
    </div>
  );
};
