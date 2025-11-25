import React, { useMemo } from 'react';
import { COLORS } from '../constants';

interface KaleidoscopeProps {
  className?: string;
}

const PetalLayer = ({ 
  count, 
  radius, 
  color, 
  rotationOffset = 0, 
  scale = 1,
  opacity = 1 
}: { 
  count: number; 
  radius: number; 
  color: string; 
  rotationOffset?: number; 
  scale?: number;
  opacity?: number;
}) => {
  const petals = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const angle = (i * 360) / count;
      return (
        <g key={i} transform={`rotate(${angle + rotationOffset})`}>
          {/* Bulbous fluid shape */}
          <path
            d={`M 0,0 
               C ${radius * 0.2},${-radius * 0.5} ${radius * 0.5},${-radius * 0.8} 0,${-radius} 
               C ${-radius * 0.5},${-radius * 0.8} ${-radius * 0.2},${-radius * 0.5} 0,0 Z`}
            fill={color}
            opacity={opacity}
            transform={`scale(${scale})`}
            className="drop-shadow-lg"
          />
        </g>
      );
    });
  }, [count, radius, color, rotationOffset, scale, opacity]);

  return <>{petals}</>;
};

const WavyRing = ({ 
  radius, 
  color, 
  waves = 8 
}: { 
  radius: number; 
  color: string; 
  waves?: number 
}) => {
  // Generate a wavy circle path
  const pathData = useMemo(() => {
    let d = "";
    const points = 100;
    for (let i = 0; i <= points; i++) {
      const angle = (i / points) * Math.PI * 2;
      // Add a sine wave to the radius
      const r = radius + Math.sin(angle * waves) * (radius * 0.1);
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;
      d += `${i === 0 ? "M" : "L"} ${x},${y} `;
    }
    d += "Z";
    return d;
  }, [radius, waves]);

  return <path d={pathData} fill={color} />;
};

export const PsychedelicKaleidoscope: React.FC<KaleidoscopeProps> = ({ className }) => {
  return (
    <div className={`relative w-full h-full flex items-center justify-center overflow-hidden bg-fillmore-black ${className}`}>
      <svg
        viewBox="-400 -400 800 800"
        className="w-[180%] h-[180%] md:w-full md:h-full max-w-[800px] max-h-[800px]"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Grain Texture Filter */}
          <filter id="paper-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.15" /> 
            </feComponentTransfer>
            <feComposite operator="in" in2="SourceGraphic" />
          </filter>
          
          {/* Soft Blur for glow */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Static/Slow Ring - Dark Moss */}
        <g className="animate-[spin_60s_linear_infinite]">
             <WavyRing radius={380} color={COLORS.darkGreen} waves={12} />
        </g>

        {/* Layer 1: Large Base Petals - Burnt Orange */}
        <g className="animate-[spin_40s_linear_infinite_reverse] origin-center">
            <PetalLayer count={8} radius={350} color={COLORS.orange} scale={1} />
        </g>

        {/* Layer 2: Offset Petals - Moss Green */}
        <g className="animate-[spin_30s_linear_infinite] origin-center">
            <PetalLayer count={8} radius={300} color={COLORS.moss} rotationOffset={22.5} scale={0.9} />
        </g>

        {/* Layer 3: Inner Detailed Petals - Teal */}
        <g className="animate-[spin_25s_linear_infinite_reverse] origin-center">
             <PetalLayer count={12} radius={220} color={COLORS.teal} scale={1} />
        </g>

        {/* Layer 4: Cream accents */}
        <g className="animate-[spin_20s_linear_infinite] origin-center">
             <PetalLayer count={12} radius={150} color={COLORS.cream} rotationOffset={15} scale={0.5} opacity={0.8} />
        </g>
        
        {/* Layer 5: Pulsing Center Ring - Sepia */}
        <g className="animate-pulse-slow origin-center">
             <circle r={90} fill={COLORS.sepia} className="drop-shadow-2xl" />
        </g>

        {/* Texture Overlay */}
        <rect x="-400" y="-400" width="800" height="800" filter="url(#paper-grain)" fill="transparent" className="pointer-events-none opacity-50" />
      </svg>
      
      {/* Vignette Overlay for poster feel */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#121212_90%)] pointer-events-none"></div>
    </div>
  );
};
