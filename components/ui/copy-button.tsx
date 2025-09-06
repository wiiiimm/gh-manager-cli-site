'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { copyToClipboard } from '@/lib/copy-to-clipboard';
import { track } from '@/lib/analytics';

interface CopyButtonProps {
  text: string;
  className?: string;
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  showText?: boolean;
  onCopy?: () => void;
  trackingTarget?: string;
}

export function CopyButton({
  text,
  className,
  variant = 'ghost',
  size = 'icon',
  showText = false,
  onCopy,
  trackingTarget,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);

      // Enhanced tracking with code content
      if (trackingTarget) {
        track('click', {
          target: trackingTarget,
          codeContent: text.substring(0, 100), // Limit to first 100 chars to avoid hitting data limits
        });
      }

      onCopy?.();
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleCopy}
      className={cn(
        'transition-colors',
        copied && 'text-green-600 dark:text-green-400',
        className
      )}
      aria-label={copied ? 'Copied!' : 'Copy to clipboard'}
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {showText && <span className="ml-2">{copied ? 'Copied!' : 'Copy'}</span>}
    </Button>
  );
}
