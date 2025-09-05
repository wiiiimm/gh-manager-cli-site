'use client';

import { ReactNode } from 'react';
import { CopyButton } from '@/components/ui/copy-button';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  children: ReactNode;
  className?: string;
  copyText?: string;
  showCopy?: boolean;
}

export function CodeBlock({
  children,
  className,
  copyText,
  showCopy = true,
}: CodeBlockProps) {
  // Extract text content for copying if not explicitly provided
  const getTextContent = (): string => {
    if (copyText) return copyText;

    // Try to extract text from children
    if (typeof children === 'string') return children;

    // For React elements, we'll need to extract text content
    // This is a simplified approach - you might want more sophisticated text extraction
    return '';
  };

  const textToCopy = getTextContent();

  return (
    <div
      className={cn(
        'relative bg-muted/50 border border-border rounded-lg overflow-hidden',
        className
      )}
    >
      <div className="p-4 font-mono text-sm">{children}</div>
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
