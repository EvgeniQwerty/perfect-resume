"use client";

import { useEffect, useRef, useState } from "react";

interface ResumeAnimationProps {}

export default function ResumeAnimation({}: ResumeAnimationProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const animationRef = useRef(null);

  useEffect(() => {
    // Check if we're on mobile on initial render
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add resize listener
    window.addEventListener("resize", checkIfMobile);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (animationRef.current) {
        const element = animationRef.current as HTMLElement;
        const rect = element.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  // Calculate animation styles based on mouse position
  const getAnimationStyle = (index: number) => {
    const xOffset = mousePosition.x * 20 - 10;
    const yOffset = mousePosition.y * 20 - 10;
    const rotation = (mousePosition.x - 0.5) * 10;
    
    return {
      transform: `translate(${xOffset}px, ${yOffset}px) rotate(${rotation}deg)`,
      transition: 'transform 0.3s ease-out'
    };
  };

  // Don't render anything on mobile screens
  if (isMobile) {
    return null;
  }

  return (
    <div 
      ref={animationRef}
      className="w-full lg:w-1/2 relative h-[450px] lg:h-[500px] bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div className="absolute inset-0 bg-blue-50 bg-opacity-50"></div>
      
      {/* Resume paper elements that react to mouse movement */}
      <div 
        className="absolute top-[15%] left-[20%] w-64 h-80 bg-white rounded shadow-md p-4"
        style={getAnimationStyle(0)}
      >
        <div className="w-full h-6 bg-blue-600 mb-4 rounded"></div>
        <div className="w-3/4 h-4 bg-gray-200 mb-3 rounded"></div>
        <div className="w-1/2 h-4 bg-gray-200 mb-6 rounded"></div>
        <div className="w-full h-3 bg-gray-200 mb-2 rounded"></div>
        <div className="w-full h-3 bg-gray-200 mb-2 rounded"></div>
        <div className="w-3/4 h-3 bg-gray-200 mb-6 rounded"></div>
        <div className="w-1/2 h-5 bg-gray-300 mb-4 rounded"></div>
        <div className="w-full h-3 bg-gray-200 mb-2 rounded"></div>
        <div className="w-full h-3 bg-gray-200 mb-2 rounded"></div>
      </div>
      
      <div 
        className="absolute top-[25%] right-[15%] w-48 h-64 bg-white rounded shadow-md p-3 transform rotate-6"
        style={getAnimationStyle(1)}
      >
        <div className="w-full h-5 bg-gray-300 mb-3 rounded"></div>
        <div className="w-full h-3 bg-gray-200 mb-2 rounded"></div>
        <div className="w-full h-3 bg-gray-200 mb-2 rounded"></div>
        <div className="w-3/4 h-3 bg-gray-200 mb-4 rounded"></div>
        <div className="w-1/2 h-5 bg-blue-200 mb-3 rounded"></div>
        <div className="w-full h-3 bg-gray-200 mb-2 rounded"></div>
      </div>
      
      <div 
        className="absolute bottom-[20%] left-[30%] w-40 h-40 bg-white rounded-lg shadow-md p-3 transform -rotate-3"
        style={getAnimationStyle(2)}
      >
        <div className="w-full h-4 bg-blue-200 mb-3 rounded"></div>
        <div className="w-3/4 h-3 bg-gray-200 mb-2 rounded"></div>
        <div className="w-full h-3 bg-gray-200 mb-2 rounded"></div>
        <div className="w-1/2 h-3 bg-gray-200 mb-2 rounded"></div>
      </div>
    </div>
  );
}