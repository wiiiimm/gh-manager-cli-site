import React from 'react';

interface LogoMarkProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

export function LogoMark({ className = '', width = 32, height = 32 }: LogoMarkProps) {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 256 256" 
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="gh-manager-cli logo"
    >
      {/* Background tile */}
      <rect x="8" y="8" width="240" height="240" rx="28" fill="transparent" stroke="currentColor" strokeWidth="8"/>

      {/* Window traffic lights */}
      <circle cx="28" cy="30" r="6" fill="currentColor" opacity="0.5"/>
      <circle cx="46" cy="30" r="6" fill="currentColor" opacity="0.7"/>
      <circle cx="64" cy="30" r="6" fill="currentColor"/>

      {/* Prompt caret ">" */}
      <path d="M40 98 L92 128 L40 158 Z" fill="currentColor"/>
      {/* Prompt cursor "_" */}
      <rect x="102" y="146" width="44" height="8" rx="4" fill="currentColor"/>

      {/* Star (rep stars) */}
      <path d="M186 100 L192 118 L211 118 L195 129 L201 147 L186 136 L171 147 L177 129 L161 118 L180 118 Z" fill="currentColor" opacity="0.8"/>

      {/* Fork glyph (three nodes + connectors) */}
      <g stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" opacity="0.7">
        <circle cx="168" cy="170" r="8" fill="currentColor"/>
        <circle cx="210" cy="170" r="8" fill="currentColor"/>
        <circle cx="189" cy="200" r="8" fill="currentColor"/>
        <path d="M168 170 C178 170 189 176 189 188"/>
        <path d="M210 170 C200 170 189 176 189 188"/>
      </g>
    </svg>
  );
}