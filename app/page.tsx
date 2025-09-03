import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Terminal, Github, Zap, Shield, Search, Archive, Eye, GitBranch } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl font-mono">gh-manager-cli</span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="ghost" size="sm" asChild>
              <a href="https://github.com/wiiiimm/gh-manager-cli" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </a>
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90 font-mono">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-6 bg-muted text-primary font-mono">
            {">"} Fast, keyboard-first GitHub repo management
          </Badge>
          <h1 className="text-5xl font-bold mb-6 text-balance font-mono">
            Interactive terminal app to browse and manage your <span className="text-primary">GitHub repositories</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto font-mono">
            Built with Ink (React for CLIs) and the GitHub GraphQL API. Manage your repos without leaving the terminal.
          </p>

          {/* Terminal Command showcase */}
          <div className="terminal-window mb-8 max-w-md mx-auto">
            <div className="terminal-header">
              <div className="terminal-dot red"></div>
              <div className="terminal-dot yellow"></div>
              <div className="terminal-dot green"></div>
              <span className="text-sm text-muted-foreground font-mono ml-2">Terminal</span>
            </div>
            <div className="terminal-content">
              <div className="terminal-prompt font-mono text-primary font-semibold text-lg">npx gh-manager-cli</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono">
              <Terminal className="h-4 w-4 mr-2" />
              Try Now
            </Button>
            <Button variant="outline" size="lg" className="font-mono bg-transparent">
              <Github className="h-4 w-4 mr-2" />
              View on GitHub
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 font-mono">Powerful Repository Management</h2>
            <p className="text-muted-foreground text-lg font-mono">
              Everything you need to manage GitHub repos efficiently
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <Search className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="font-mono">Smart Search & Filter</CardTitle>
                <CardDescription className="font-mono">
                  Server-side search through repository names and descriptions with live pagination
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <Zap className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="font-mono">Keyboard-First Navigation</CardTitle>
                <CardDescription className="font-mono">
                  Full keyboard control with arrow keys, shortcuts, and modal-based interactions
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <Shield className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="font-mono">Secure Authentication</CardTitle>
                <CardDescription className="font-mono">
                  GitHub OAuth or Personal Access Token with secure local storage
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <Archive className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="font-mono">Repository Actions</CardTitle>
                <CardDescription className="font-mono">
                  Archive, delete, change visibility, and sync forks with confirmation prompts
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <Eye className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="font-mono">Visibility Management</CardTitle>
                <CardDescription className="font-mono">
                  Filter by visibility and change repository settings including Enterprise support
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <GitBranch className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="font-mono">Fork Synchronization</CardTitle>
                <CardDescription className="font-mono">
                  Track commits behind upstream and sync forks with automatic conflict detection
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Installation Methods */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 font-mono">Multiple Installation Options</h2>
            <p className="text-muted-foreground text-lg font-mono">Choose the method that works best for you</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-mono">
                  <Terminal className="h-5 w-5 text-primary" />
                  NPX (Recommended)
                </CardTitle>
                <CardDescription className="font-mono">Run instantly without installation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="terminal-window">
                  <div className="terminal-content">
                    <div className="terminal-prompt font-mono text-primary">npx gh-manager-cli</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-mono">
                  <Terminal className="h-5 w-5 text-primary" />
                  Homebrew
                </CardTitle>
                <CardDescription className="font-mono">For macOS and Linux users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="terminal-window">
                  <div className="terminal-content space-y-1">
                    <div className="terminal-prompt font-mono text-primary">brew tap wiiiimm/tap</div>
                    <div className="terminal-prompt font-mono text-primary">brew install gh-manager-cli</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-mono">
                  <Terminal className="h-5 w-5 text-primary" />
                  Global Install
                </CardTitle>
                <CardDescription className="font-mono">Install globally via npm</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="terminal-window">
                  <div className="terminal-content">
                    <div className="terminal-prompt font-mono text-primary">npm install -g gh-manager-cli</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-mono">
                  <Terminal className="h-5 w-5 text-primary" />
                  Pre-built Binaries
                </CardTitle>
                <CardDescription className="font-mono">No Node.js required</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground font-mono">
                  Download standalone executables for Linux, macOS, and Windows from GitHub Releases
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Workflow Demo */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 font-mono">Simple Workflow</h2>
            <p className="text-muted-foreground text-lg font-mono">Get started in seconds</p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm font-mono">
                1
              </div>
              <div>
                <h3 className="font-semibold mb-2 font-mono">Run the command</h3>
                <div className="terminal-window max-w-xs">
                  <div className="terminal-content">
                    <div className="terminal-prompt font-mono text-primary">npx gh-manager-cli</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm font-mono">
                2
              </div>
              <div>
                <h3 className="font-semibold mb-2 font-mono">Authenticate with GitHub</h3>
                <p className="text-muted-foreground font-mono">Choose OAuth (recommended) or Personal Access Token</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm font-mono">
                3
              </div>
              <div>
                <h3 className="font-semibold mb-2 font-mono">Manage your repositories</h3>
                <p className="text-muted-foreground font-mono">
                  Browse, search, sort, and perform actions on your GitHub repos
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-3xl font-bold mb-4 font-mono">Ready to streamline your GitHub workflow?</h2>
          <p className="text-muted-foreground text-lg mb-8 font-mono">
            Join developers who are managing their repositories more efficiently with gh-manager-cli
          </p>

          <div className="terminal-window mb-8 max-w-sm mx-auto">
            <div className="terminal-header">
              <div className="terminal-dot red"></div>
              <div className="terminal-dot yellow"></div>
              <div className="terminal-dot green"></div>
              <span className="text-sm text-muted-foreground font-mono ml-2">Terminal</span>
            </div>
            <div className="terminal-content">
              <div className="terminal-prompt font-mono text-primary font-semibold text-lg">npx gh-manager-cli</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono">
              <Terminal className="h-4 w-4 mr-2" />
              Get Started Now
            </Button>
            <Button variant="outline" size="lg" asChild className="font-mono bg-transparent">
              <a href="https://github.com/wiiiimm/gh-manager-cli" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-2" />
                Star on GitHub
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Terminal className="h-5 w-5 text-primary" />
                <span className="font-bold font-mono">gh-manager-cli</span>
              </div>
              <p className="text-muted-foreground text-sm font-mono">
                Interactive terminal app for GitHub repository management
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 font-mono">Resources</h4>
              <ul className="space-y-2 text-sm font-mono">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Installation Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Troubleshooting
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Roadmap
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 font-mono">Community</h4>
              <ul className="space-y-2 text-sm font-mono">
                <li>
                  <a
                    href="https://github.com/wiiiimm/gh-manager-cli"
                    className="text-muted-foreground hover:text-primary"
                  >
                    GitHub Repository
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.npmjs.com/package/gh-manager-cli"
                    className="text-muted-foreground hover:text-primary"
                  >
                    NPM Package
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Report Issues
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Contributing
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground font-mono">
            <p>© 2025 gh-manager-cli. Released under the MIT License.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
