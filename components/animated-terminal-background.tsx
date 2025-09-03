"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const terminalCommands = [
  "gh-manager-cli --help",
  "gh repo list --limit 20",
  "gh repo view my-awesome-project",
  "gh repo archive old-project",
  "gh repo sync my-fork",
  "gh auth status",
  "gh repo create new-project --private",
  "gh repo delete deprecated-repo",
  "gh repo edit my-project --visibility public",
  "gh workflow list",
]

const responses = [
  "✓ Authentication successful",
  "✓ Repository list updated",
  "✓ Viewing repository details",
  "✓ Repository archived",
  "✓ Fork synchronized",
  "✓ Authenticated as user",
  "✓ Repository created",
  "✓ Repository deleted",
  "✓ Visibility updated",
  "✓ Workflows loaded",
]

export function AnimatedTerminalBackground() {
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [showResponse, setShowResponse] = useState(false)
  const [lines, setLines] = useState<Array<{ command: string; response: string }>>([])

  useEffect(() => {
    console.log("[v0] Animation state:", { currentCommandIndex, isTyping, showResponse, linesCount: lines.length })
  }, [currentCommandIndex, isTyping, showResponse, lines.length])

  useEffect(() => {
    const currentCommand = terminalCommands[currentCommandIndex]

    if (isTyping) {
      const typingInterval = setInterval(
        () => {
          setDisplayedText((prev) => {
            if (prev.length < currentCommand.length) {
              return currentCommand.slice(0, prev.length + 1)
            } else {
              setIsTyping(false)
              setShowResponse(true)
              clearInterval(typingInterval)
              return prev
            }
          })
        },
        50 + Math.random() * 50,
      ) // Variable typing speed

      return () => clearInterval(typingInterval)
    } else if (showResponse) {
      const responseTimeout = setTimeout(() => {
        setLines((prev) => [
          ...prev,
          {
            command: currentCommand,
            response: responses[currentCommandIndex],
          },
        ])

        // Move to next command
        setTimeout(() => {
          setCurrentCommandIndex((prev) => (prev + 1) % terminalCommands.length)
          setDisplayedText("")
          setIsTyping(true)
          setShowResponse(false)

          // Clear lines if too many
          if (lines.length > 8) {
            setLines([])
          }
        }, 1000)
      }, 800)

      return () => clearTimeout(responseTimeout)
    }
  }, [currentCommandIndex, displayedText, isTyping, showResponse, lines.length])

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Animated terminal content */}
      <div className="absolute inset-0 p-8 font-mono text-sm overflow-hidden">
        <div className="max-w-4xl mx-auto h-full flex flex-col justify-center">
          {/* Previous commands */}
          <AnimatePresence>
            {lines.map((line, index) => (
              <motion.div
                key={`${line.command}-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.4, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-3"
              >
                <div className="text-green-400">
                  <span className="text-muted-foreground/60">$</span> {line.command}
                </div>
                <div className="text-muted-foreground/60 ml-2">{line.response}</div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Current typing command */}
          <div className="mb-3">
            <div className="text-green-400 flex items-center">
              <span className="text-muted-foreground/60 mr-1">$</span>
              <span>{displayedText}</span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                className="ml-1 bg-green-400 w-2 h-4 inline-block"
              />
            </div>
            {showResponse && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                className="text-muted-foreground/60 ml-2 mt-1"
              >
                {responses[currentCommandIndex]}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-background/85 backdrop-blur-[2px]" />
    </div>
  )
}
