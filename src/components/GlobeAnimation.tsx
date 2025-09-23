
import React, { useEffect, useRef } from 'react';

const GlobeAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create shipping routes animation
    const createShippingRoute = (startX: number, startY: number, endX: number, endY: number, delay: number) => {
      const route = document.createElement('div');
      route.className = 'absolute w-1 h-1 bg-[#5EB447] rounded-full animate-pulse';
      route.style.left = `${startX}%`;
      route.style.top = `${startY}%`;
      route.style.animationDelay = `${delay}s`;
      
      container.appendChild(route);

      // Animate the route
      let progress = 0;
      const animate = () => {
        if (progress <= 1) {
          const currentX = startX + (endX - startX) * progress;
          const currentY = startY + (endY - startY) * progress;
          route.style.left = `${currentX}%`;
          route.style.top = `${currentY}%`;
          progress += 0.005;
          requestAnimationFrame(animate);
        } else {
          // Reset and restart
          progress = 0;
          setTimeout(() => requestAnimationFrame(animate), 2000);
        }
      };
      
      setTimeout(() => animate(), delay * 1000);
    };

    // Ethiopia outgoing routes (from center to various destinations)
    const ethiopiaX = 55; // Approximate position of Ethiopia
    const ethiopiaY = 45;

    // Outgoing routes
    createShippingRoute(ethiopiaX, ethiopiaY, 75, 35, 0); // To Europe
    createShippingRoute(ethiopiaX, ethiopiaY, 85, 50, 1); // To Asia
    createShippingRoute(ethiopiaX, ethiopiaY, 20, 55, 2); // To Americas
    createShippingRoute(ethiopiaX, ethiopiaY, 45, 65, 3); // To South Africa

    // Incoming routes
    createShippingRoute(75, 35, ethiopiaX, ethiopiaY, 4); // From Europe
    createShippingRoute(85, 50, ethiopiaX, ethiopiaY, 5); // From Asia
    createShippingRoute(20, 55, ethiopiaX, ethiopiaY, 6); // From Americas
    createShippingRoute(45, 65, ethiopiaX, ethiopiaY, 7); // From South Africa

  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden opacity-30">
      {/* Globe Grid */}
      <div className="absolute inset-0">
        <svg className="w-full h-full" viewBox="0 0 800 600">
          {/* Longitude lines */}
          {Array.from({ length: 12 }, (_, i) => (
            <ellipse
              key={`long-${i}`}
              cx="400"
              cy="300"
              rx={200 + i * 15}
              ry="250"
              fill="none"
              stroke="#5EB447"
              strokeWidth="0.5"
              opacity="0.3"
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
          
          {/* Latitude lines */}
          {Array.from({ length: 8 }, (_, i) => (
            <ellipse
              key={`lat-${i}`}
              cx="400"
              cy={150 + i * 50}
              rx={300 - Math.abs(i - 3.5) * 60}
              ry="15"
              fill="none"
              stroke="#5EB447"
              strokeWidth="0.5"
              opacity="0.3"
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </svg>
      </div>

      {/* Pulsing Ethiopia marker */}
      <div 
        className="absolute w-4 h-4 bg-[#5EB447] rounded-full animate-pulse"
        style={{ left: '55%', top: '45%', transform: 'translate(-50%, -50%)' }}
      >
        <div className="absolute inset-0 bg-[#5EB447] rounded-full animate-ping"></div>
      </div>

      {/* Floating particles */}
      {Array.from({ length: 20 }, (_, i) => (
        <div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-[#5EB447] rounded-full animate-bounce"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );
};

export default GlobeAnimation;
