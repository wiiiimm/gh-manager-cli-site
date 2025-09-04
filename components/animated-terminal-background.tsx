"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const terminalCommands = [
  "npm install -g gh-manager-cli",
  "gh-manager-cli --version",
  "gh-manager-cli init",
  "gh-manager-cli auth login",
  "gh-manager-cli repo list --org mycompany",
  "gh-manager-cli repo create awesome-project --private",
  "gh-manager-cli repo clone awesome-project",
  "gh-manager-cli repo sync --all",
  "gh-manager-cli repo archive old-project",
  "gh-manager-cli repo transfer legacy-app --to archive-org",
  "gh-manager-cli workflow run deploy --repo awesome-project",
  "gh-manager-cli issues list --assignee @me",
  "gh-manager-cli pr create --title 'Add new feature'",
  "gh-manager-cli repo backup --destination ./backups",
  "gh-manager-cli analytics repos --period 30d",
  "gh-manager-cli config set default-org mycompany",
  "gh-manager-cli repo template create starter-template",
  "gh-manager-cli bulk-update --repos 'company/*' --visibility private",
]

const responses = [
  "✓ gh-manager-cli installed successfully",
  "✓ gh-manager-cli v2.1.4",
  "✓ Configuration initialized",
  "✓ Authentication successful",
  "✓ Found 47 repositories",
  "✓ Repository 'awesome-project' created",
  "✓ Repository cloned to ./awesome-project",
  "✓ 12 repositories synchronized",
  "✓ Repository archived successfully",
  "✓ Repository transferred to archive-org",
  "✓ Workflow 'deploy' started",
  "✓ Found 3 assigned issues",
  "✓ Pull request #42 created",
  "✓ 15 repositories backed up",
  "✓ Analytics report generated",
  "✓ Default organization set",
  "✓ Template 'starter-template' created",
  "✓ 23 repositories updated",
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
      <div className="absolute inset-0 p-8 font-mono text-sm overflow-hidden">
        <div className="max-w-4xl mx-auto h-full flex flex-col justify-center">
          {/* Previous commands */}
          <AnimatePresence>
            {lines.map((line, index) => (
              <motion.div
                key={`${line.command}-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.6, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-3"
              >
                <div className="text-green-400/80">
                  <span className="text-gray-500/70">$</span> {line.command}
                </div>
                <div className="text-gray-400/70 ml-2">{line.response}</div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Current typing command */}
          <div className="mb-3">
            <div className="text-green-400/90 flex items-center">
              <span className="text-gray-500/70 mr-1">$</span>
              <span>{displayedText}</span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                className="ml-1 bg-green-400/80 w-2 h-4 inline-block"
              />
            </div>
            {showResponse && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} className="text-gray-400/80 ml-2 mt-1">
                {responses[currentCommandIndex]}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
