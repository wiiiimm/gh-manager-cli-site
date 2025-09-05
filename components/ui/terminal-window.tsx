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
}

export function TerminalWindow({
  children,
  className,
  showCopy = true,
  copyText,
  title = 'Terminal TUI',
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
    <div className={cn('terminal-window relative', className)}>
      <div className="terminal-header">
        <div className="terminal-dot red"></div>
        <div className="terminal-dot yellow"></div>
        <div className="terminal-dot green"></div>
        <span className="text-sm text-muted-foreground font-mono ml-2">
          {title}
        </span>
      </div>
      <div className="terminal-content">{children}</div>
      {showCopy && textToCopy && (
        <div className="absolute bottom-2 right-2 z-10">
          <CopyButton
            text={textToCopy}
            size="sm"
            className="h-8 w-8 bg-background/80 backdrop-blur-sm hover:bg-background/90 text-muted-foreground hover:text-foreground border border-border/50"
          />
        </div>
      )}
    </div>
  );
}
