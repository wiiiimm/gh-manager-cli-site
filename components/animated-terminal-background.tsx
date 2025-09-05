'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TerminalSession {
  command: string;
  responses: string[];
}

const terminalSessions: TerminalSession[] = [
  {
    command: 'npx gh-manager-cli',
    responses: [
      'GitHub Repository Manager v1.21.0',
      'Validating token...',
      'Press Esc to cancel',
      'GitHub Repository Manager v1.21.0                               @wiiiimm',
      'Repositories (Loading...)',
      '⠋ Loading repositories...',
      'Fetching your GitHub repositories',
      'Please wait...',
      'GitHub Repository Manager v1.21.0                     altx-labs/@wiiiimm',
      'ALT-X Labs ⌥ Repositories (15/369)                        API: 5000/5000',
      'Organization: ALT-X Labs  Sort: pushed ↓  Fork Status/Commits Behind: ⌥ ON',
      '1. altx-labs/piaf  Internal',
      '2. altx-labs/piaf-prototype-nextjs-v0-1  Internal',
      '3. altx-labs/piaf-prototype-nextjs-replit  Internal',
      '4. altx-labs/piaf-prototype-nextjs-claude-replit  Internal',
      '● TypeScript  ★ 0  ⑂ 0  Updated yesterday',
      '↑↓ Navigate • Ctrl+G Top • G Bottom • ⏎/O Open • R Refresh',
      '/ Search • S Sort • D Direction • T Density • F Fork Status • V Visibility',
      'I Info • C Copy URL • Ctrl+R Rename • Ctrl+A Un/Archive • Ctrl+V Change',
      'K Cache Info • W Org Switch • Del/Backspace Delete • Ctrl+L Logout • Q Quit',
      'ALT-X Labs ⌥ (ENT) Repositories (15/369)                  API: 5000/5000',
    ],
  },
  {
    command: 'npm install -g gh-manager-cli',
    responses: [
      '> gh-manager-cli@1.21.0 build …/gh-manager-cli/.conductor/wiiiimm-phoenix',
      '> tsup',
      'CLI Building entry: src/index.tsx',
      'CLI Using tsconfig: tsconfig.json',
      'CLI tsup v8.5.0',
      'CLI Using tsup config: …/tsup.config.ts',
      'CLI Target: node18',
      'CLI Cleaning output folder',
      'ESM Build start',
      'ESM dist/github-ERXQNAVD.js 1.18 KB',
      'ESM dist/index.js           149.56 KB',
      'ESM dist/chunk-RI2B33OX.js  37.30 KB',
      'ESM ⚡️ Build success in 29ms',
      '> gh-manager-cli@1.21.0 start …/gh-manager-cli/.conductor/wiiiimm-phoenix',
      '> node dist/index.js',
      'GitHub Repository Manager v1.21.0',
      'Validating token...',
      'Press Esc to cancel',
      'GitHub Repository Manager v1.21.0                               @wiiiimm',
      'Repositories (Loading...)',
      '⠋ Loading repositories...',
      'Fetching your GitHub repositories',
      'Please wait...',
      'GitHub Repository Manager v1.21.0                     altx-labs/@wiiiimm',
      'ALT-X Labs ⌥ Repositories (15/369)                        API: 5000/5000',
      'Organization: ALT-X Labs  Sort: pushed ↓  Fork Status/Commits Behind: ⌥ ON',
      '1. altx-labs/piaf  Internal',
      '2. altx-labs/piaf-prototype-nextjs-v0-1  Internal',
      '3. altx-labs/piaf-prototype-nextjs-replit  Internal',
      '4. altx-labs/piaf-prototype-nextjs-claude-replit  Internal',
      '● TypeScript  ★ 0  ⑂ 0  Updated yesterday',
      '↑↓ Navigate • Ctrl+G Top • G Bottom • ⏎/O Open • R Refresh',
      '/ Search • S Sort • D Direction • T Density • F Fork Status • V Visibility',
      'I Info • C Copy URL • Ctrl+R Rename • Ctrl+A Un/Archive • Ctrl+V Change',
      'K Cache Info • W Org Switch • Del/Backspace Delete • Ctrl+L Logout • Q Quit',
      'ALT-X Labs ⌥ (ENT) Repositories (15/369)                  API: 5000/5000',
    ],
  },
  {
    command: 'gh-manager-cli',
    responses: [
      'GitHub Repository Manager v1.21.0',
      'Starting interactive mode...',
      'Loading repositories from cache...',
      'Found 369 repositories',
      'Initializing UI...',
      'Ready.',
    ],
  },
  {
    command: 'gh-manager-cli --help',
    responses: [
      'GitHub Repository Manager v1.21.0',
      '',
      'Usage: gh-manager-cli [options]',
      '',
      'Options:',
      '  -h, --help      Display help information',
      '  -v, --version   Display version',
      '  --token <token> Use custom GitHub token',
      '  --org <name>    Filter by organization',
      '  --clear-cache   Clear local cache',
      '',
      'Interactive Commands:',
      '  ↑/↓             Navigate repositories',
      '  Enter/O         Open repository in browser',
      '  R               Refresh repository list',
      '  S               Change sort order',
      '  Q               Quit application',
    ],
  },
];

interface TerminalLine {
  type: 'command' | 'response';
  text: string;
  sessionIndex: number;
  isStreaming?: boolean;
  streamProgress?: number;
}

export function AnimatedTerminalBackground() {
  const [currentSessionIndex, setCurrentSessionIndex] = useState(0);
  const [displayedCommand, setDisplayedCommand] = useState('');
  const [isTypingCommand, setIsTypingCommand] = useState(true);
  const [currentResponseIndex, setCurrentResponseIndex] = useState(-1);
  const [displayedLines, setDisplayedLines] = useState<TerminalLine[]>([]);
  const [showCursor, setShowCursor] = useState(true);
  const [streamingLineIndex, setStreamingLineIndex] = useState(-1);
  const typingTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const responseTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const streamingTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Type command with random delays between keystrokes
  useEffect(() => {
    if (!isTypingCommand) return;

    const currentSession = terminalSessions[currentSessionIndex];
    const targetCommand = currentSession.command;

    if (displayedCommand.length < targetCommand.length) {
      // More natural typing delays: faster for common keys, slower for special chars
      const nextChar = targetCommand[displayedCommand.length];
      const isSpecialChar = /[^a-zA-Z0-9\s]/.test(nextChar);
      const baseDelay = isSpecialChar ? 80 : 40;
      const variance = isSpecialChar ? 100 : 60;

      typingTimeoutRef.current = setTimeout(() => {
        setDisplayedCommand(
          targetCommand.slice(0, displayedCommand.length + 1)
        );
      }, baseDelay + Math.random() * variance); // Variable delay based on character type
    } else {
      // Command fully typed, echo it and start responses
      setIsTypingCommand(false);
      setShowCursor(false);

      // Add command to displayed lines
      setDisplayedLines((prev) => [
        ...prev,
        {
          type: 'command',
          text: targetCommand,
          sessionIndex: currentSessionIndex,
        },
      ]);

      // Start showing responses after a short delay
      setTimeout(() => {
        setCurrentResponseIndex(0);
      }, 300);
    }

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [displayedCommand, isTypingCommand, currentSessionIndex]);

  // Display responses line by line with streaming effect
  useEffect(() => {
    if (currentResponseIndex < 0) return;

    const currentSession = terminalSessions[currentSessionIndex];
    const responses = currentSession.responses;

    if (currentResponseIndex < responses.length) {
      const currentLine = responses[currentResponseIndex];

      // Delay before starting to process this line (server processing time)
      const serverProcessingDelay = 100 + Math.random() * 300; // 100-400ms between lines

      responseTimeoutRef.current = setTimeout(() => {
        // Add line in streaming state
        const lineIndex = displayedLines.length;
        setDisplayedLines((prev) => [
          ...prev,
          {
            type: 'response',
            text: currentLine,
            sessionIndex: currentSessionIndex,
            isStreaming: true,
            streamProgress: 0,
          },
        ]);
        setStreamingLineIndex(lineIndex);

        // Start streaming the line content
        let charIndex = 0;
        const streamLine = () => {
          if (charIndex < currentLine.length) {
            // Per-character streaming delay (faster for server output)
            const streamDelay = 5 + Math.random() * 15; // 5-20ms per character

            streamingTimeoutRef.current = setTimeout(() => {
              charIndex++;
              setDisplayedLines((prev) =>
                prev.map((line, idx) =>
                  idx === lineIndex
                    ? { ...line, streamProgress: charIndex }
                    : line
                )
              );
              streamLine();
            }, streamDelay);
          } else {
            // Line fully streamed, mark as complete
            setDisplayedLines((prev) =>
              prev.map((line, idx) =>
                idx === lineIndex
                  ? { ...line, isStreaming: false, streamProgress: undefined }
                  : line
              )
            );
            setStreamingLineIndex(-1);

            // Move to next response line
            setCurrentResponseIndex(currentResponseIndex + 1);
          }
        };

        streamLine();
      }, serverProcessingDelay);
    } else {
      // All responses shown, wait then move to next session
      responseTimeoutRef.current = setTimeout(() => {
        // Reset for next session
        const nextIndex = (currentSessionIndex + 1) % terminalSessions.length;
        setCurrentSessionIndex(nextIndex);
        setDisplayedCommand('');
        setIsTypingCommand(true);
        setCurrentResponseIndex(-1);
        setShowCursor(true);

        // Clear old lines if too many
        if (displayedLines.length > 30) {
          setDisplayedLines([]);
        }
      }, 2000 + Math.random() * 1000); // Larger delay between sessions (2-3s)
    }

    return () => {
      if (responseTimeoutRef.current) {
        clearTimeout(responseTimeoutRef.current);
      }
      if (streamingTimeoutRef.current) {
        clearTimeout(streamingTimeoutRef.current);
      }
    };
  }, [currentResponseIndex, currentSessionIndex, displayedLines.length]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute inset-0 p-8 font-mono text-sm overflow-hidden">
        <div className="max-w-4xl mx-auto h-full flex flex-col justify-center">
          <div className="space-y-1">
            {/* Previously displayed lines */}
            <AnimatePresence mode="popLayout">
              {displayedLines.slice(-20).map((line, index) => (
                <motion.div
                  key={`${line.sessionIndex}-${line.type}-${index}`}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{
                    opacity: line.type === 'command' ? 0.7 : 0.5,
                    y: 0,
                  }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  {line.type === 'command' ? (
                    <div className="text-green-400/80">
                      <span className="text-gray-500/70">$</span> {line.text}
                    </div>
                  ) : (
                    <div className="text-gray-400/60 ml-2">
                      {line.isStreaming && line.streamProgress !== undefined
                        ? line.text.slice(0, line.streamProgress)
                        : line.text}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Currently typing command */}
            {isTypingCommand && (
              <div className="text-green-400/90 flex items-center">
                <span className="text-gray-500/70 mr-1">$</span>
                <span>{displayedCommand}</span>
                {showCursor && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      repeatType: 'loop',
                    }}
                    className="ml-0.5 bg-green-400/80 w-2 h-4 inline-block"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
