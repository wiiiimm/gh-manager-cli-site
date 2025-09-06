'use client';

import { ReactNode } from 'react';
import { CopyButton } from '@/components/ui/copy-button';
import { cn } from '@/lib/utils';

interface TerminalWindowProps {
  children: ReactNode;
  className?: string;
  showCopy?: boolean;
  copyText?: string;
  title?: string;
  onCopy?: () => void;
  trackingTarget?: string;
}

export function TerminalWindow({
  children,
  className,
  showCopy = true,
  copyText,
  title = 'Terminal TUI',
  onCopy,
  trackingTarget,
}: TerminalWindowProps) {
  // Extract text content for copying if not explicitly provided
  const getTextContent = (): string => {
    if (copyText) return copyText;

    // Try to extract text from children
    if (typeof children === 'string') return children;

    // For React elements, we'll need to extract text content
    // This is a simplified approach - in practice you might want more sophisticated text extraction
    return '';
  };

  const textToCopy = getTextContent();

  return (
    <div
      className={cn(
        'relative bg-terminal-bg border border-border rounded-lg shadow-lg',
        className
      )}
    >
      <div className="bg-muted border-b border-border px-3 py-2 rounded-t-lg flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="text-sm text-muted-foreground font-mono ml-2">
          {title}
        </span>
      </div>
      <div className="px-10 py-8 font-mono bg-terminal-bg rounded-b-lg">
        {children}
      </div>
      {showCopy && textToCopy && (
        <div className="absolute bottom-2 right-2 z-10">
          <CopyButton
            text={textToCopy}
            size="sm"
            className="h-8 w-8 bg-background/80 backdrop-blur-sm hover:bg-background/90 text-muted-foreground hover:text-foreground border border-border/50"
            onCopy={onCopy}
            trackingTarget={trackingTarget}
          />
        </div>
      )}
    </div>
  );
}
