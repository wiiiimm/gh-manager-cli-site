import React from 'react';

interface AppLogoProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

export function AppLogo({ className = '', width = 24, height = 24 }: AppLogoProps) {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 64 64" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Terminal window background */}
      <rect x="4" y="4" width="56" height="56" rx="8" ry="8" 
            fill="#1a1a1a" stroke="#0366d6" strokeWidth="2"/>
      
      {/* Terminal header */}
      <rect x="4" y="4" width="56" height="14" rx="8" ry="8" fill="#2a2a2a"/>
      <rect x="4" y="14" width="56" height="4" fill="#2a2a2a"/>
      
      {/* Terminal dots */}
      <circle cx="12" cy="11" r="2" fill="#ff5f56"/>
      <circle cx="20" cy="11" r="2" fill="#ffbd2e"/>
      <circle cx="28" cy="11" r="2" fill="#27ca3f"/>
      
      {/* Prompt symbol */}
      <text x="10" y="30" fontFamily="Monaco, 'Courier New', monospace" 
            fontSize="8" fill="#4CAF50" fontWeight="bold">{'>'}</text>
      
      {/* Repository grid representation */}
      <rect x="16" y="24" width="6" height="6" rx="1" fill="#64B5F6"/>
      <rect x="26" y="24" width="6" height="6" rx="1" fill="#FF7043"/>
      <rect x="36" y="24" width="6" height="6" rx="1" fill="#66BB6A"/>
      
      <rect x="16" y="34" width="6" height="6" rx="1" fill="#FFA726"/>
      <rect x="26" y="34" width="6" height="6" rx="1" fill="#AB47BC"/>
      <rect x="36" y="34" width="6" height="6" rx="1" fill="#42A5F5"/>
      
      <rect x="16" y="44" width="6" height="6" rx="1" fill="#26C6DA"/>
      <rect x="26" y="44" width="6" height="6" rx="1" fill="#D4E157"/>
      <rect x="36" y="44" width="6" height="6" rx="1" fill="#FF8A65"/>
      
      {/* Cursor */}
      <rect x="46" y="24" width="6" height="6" fill="#4CAF50" opacity="0.8"/>
    </svg>
  );
}