import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Terminal,
  Github,
  Zap,
  Shield,
  Search,
  Archive,
  Eye,
  GitBranch,
  Package,
  Gauge,
  Activity,
  Building2,
  Settings,
  Layers,
  RefreshCw,
  Copy,
  Check,
} from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { AnimatedTerminalBackground } from '@/components/animated-terminal-background';
import { TerminalWindow } from '@/components/ui/terminal-window';
import { CopyButton } from '@/components/ui/copy-button';
import { CodeBlock } from '@/components/ui/code-block';
import { HeroVideo } from '@/components/hero-video';
import { LogoMark } from '@/components/icons/logo-mark';

export default function HomePage() {
  return (
    <div className="min-h-screen relative">
      <AnimatedTerminalBackground />

      <div className="absolute inset-0 bg-white/10 dark:bg-black/10 backdrop-blur-sm z-[1]" />

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="w-full sm:max-w-lg sm:mx-auto md:max-w-none px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <LogoMark className="text-primary" width={32} height={32} />
              </div>
              <div className="relative">
                <span className="font-bold text-xl font-mono">
                  gh-manager-cli
                </span>
                <span
                  className="absolute bottom-1 -right-3 w-1.5 h-4 bg-primary"
                  style={{
                    animation: 'cursor-blink 1.2s infinite',
                    animationTimingFunction: 'ease-in-out',
                  }}
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Button
                variant="ghost"
                className="h-8 w-8 p-0 rounded-full"
                asChild
              >
                <a
                  href="https://github.com/wiiiimm/gh-manager-cli"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button
                className="h-8 w-8 p-0 rounded-full bg-primary hover:bg-primary/90"
                asChild
              >
                <a
                  href="https://www.npmjs.com/package/gh-manager-cli"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Package className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 sm:py-24 lg:py-[5vh] px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 w-full max-w-6xl mx-auto">
          <div className="w-full sm:max-w-lg sm:mx-auto md:max-w-none text-center">
            <Badge
              variant="secondary"
              className="mb-8 bg-muted text-primary font-mono"
            >
              {'>'} Fast, keyboard-first GitHub repo management
            </Badge>
            <h1 className="text-xl sm:text-3xl md:text-5xl font-bold mb-8 text-balance font-mono">
              Interactive TUI terminal app to browse and manage your{' '}
              <span className="text-primary">GitHub repositories</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-12 text-pretty w-full font-mono">
              Built with Ink (React for CLIs) and the GitHub GraphQL API. <br />
              Manage your repos without leaving the terminal.
            </p>

            {/* Hero Video Demo */}
            <HeroVideo className="mb-12 w-full max-w-xl mx-auto" />

            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono"
                asChild
              >
                <a href="#get-started">
                  <Terminal className="h-4 w-4 mr-2" />
                  Try Now
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="font-mono border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all duration-200"
                asChild
              >
                <a
                  href="https://github.com/wiiiimm/gh-manager-cli"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4 mr-2" />
                  View on GitHub
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 w-full bg-muted/30 max-w-6xl mx-auto">
          <div className="w-full sm:max-w-lg sm:mx-auto md:max-w-none">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl font-bold mb-4 sm:mb-6 font-mono">
                Powerful Repository Management
              </h2>
              <p className="text-muted-foreground text-lg font-mono">
                Everything you need to manage GitHub repos efficiently
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <Card className="border-border bg-card">
                <CardHeader>
                  <Search className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="font-mono">
                    Smart Search & Filter
                  </CardTitle>
                  <CardDescription className="font-mono">
                    Server-side search through repository names and descriptions
                    with live pagination
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-border bg-card">
                <CardHeader>
                  <Zap className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="font-mono">
                    Keyboard-First Navigation
                  </CardTitle>
                  <CardDescription className="font-mono">
                    Full keyboard control with arrow keys, shortcuts, and
                    modal-based interactions
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-border bg-card">
                <CardHeader>
                  <Shield className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="font-mono">
                    Secure Authentication
                  </CardTitle>
                  <CardDescription className="font-mono">
                    GitHub OAuth or Personal Access Token with secure local
                    storage
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-border bg-card">
                <CardHeader>
                  <Archive className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="font-mono">
                    Repository Actions
                  </CardTitle>
                  <CardDescription className="font-mono">
                    Rename, archive, delete, change visibility, and sync forks
                    with confirmation prompts
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-border bg-card">
                <CardHeader>
                  <Eye className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="font-mono">
                    Visibility Management
                  </CardTitle>
                  <CardDescription className="font-mono">
                    Filter by visibility and change repository settings
                    including Enterprise support
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-border bg-card">
                <CardHeader>
                  <GitBranch className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="font-mono">
                    Fork Synchronization
                  </CardTitle>
                  <CardDescription className="font-mono">
                    Track commits behind upstream and sync forks with automatic
                    conflict detection
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-border bg-card">
                <CardHeader>
                  <Gauge className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="font-mono">
                    Rate Limit Monitoring
                  </CardTitle>
                  <CardDescription className="font-mono">
                    Real-time GraphQL & REST API usage with visual warnings and
                    automatic delta tracking
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-border bg-card">
                <CardHeader>
                  <Activity className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="font-mono">
                    Live Repository Metrics
                  </CardTitle>
                  <CardDescription className="font-mono">
                    Stars, forks, language stats, size tracking, and last
                    activity timestamps
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-border bg-card">
                <CardHeader>
                  <Building2 className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="font-mono">
                    Enterprise & Org Support
                  </CardTitle>
                  <CardDescription className="font-mono">
                    Seamlessly switch between personal and organization contexts
                    with enterprise badges
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-border bg-card">
                <CardHeader>
                  <Settings className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="font-mono">
                    Persistent Preferences
                  </CardTitle>
                  <CardDescription className="font-mono">
                    UI settings, sort order, density, and filters saved between
                    sessions
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-border bg-card">
                <CardHeader>
                  <Layers className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="font-mono">
                    Display Density Control
                  </CardTitle>
                  <CardDescription className="font-mono">
                    Toggle between compact, cozy, and comfy modes for optimal
                    information density
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-border bg-card">
                <CardHeader>
                  <RefreshCw className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="font-mono">
                    Smart Caching & Performance
                  </CardTitle>
                  <CardDescription className="font-mono">
                    Apollo GraphQL cache with automatic prefetching and
                    virtualized rendering
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Installation Methods */}
        <section
          id="installation"
          className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 w-full max-w-6xl mx-auto"
        >
          <div className="w-full sm:max-w-lg sm:mx-auto md:max-w-none">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl font-bold mb-4 sm:mb-6 font-mono">
                Multiple Installation Options
              </h2>
              <p className="text-muted-foreground text-lg font-mono">
                Choose the method that works best for you
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-mono">
                    <LogoMark className="text-primary" width={20} height={20} />
                    NPX (Recommended)
                  </CardTitle>
                  <CardDescription className="font-mono">
                    Run instantly without installation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock copyText="npx gh-manager-cli@latest">
                    <div className="text-primary">
                      npx gh-manager-cli@latest
                    </div>
                  </CodeBlock>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-mono">
                    <LogoMark className="text-primary" width={20} height={20} />
                    Homebrew
                  </CardTitle>
                  <CardDescription className="font-mono">
                    For macOS and Linux users
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock
                    copyText={`brew tap wiiiimm/tap
brew install gh-manager-cli`}
                  >
                    <div className="space-y-1">
                      <div className="text-primary">brew tap wiiiimm/tap</div>
                      <div className="text-primary">
                        brew install gh-manager-cli
                      </div>
                    </div>
                  </CodeBlock>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-mono">
                    <LogoMark className="text-primary" width={20} height={20} />
                    Global Install
                  </CardTitle>
                  <CardDescription className="font-mono">
                    Install globally via npm
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock copyText="npm install -g gh-manager-cli@latest">
                    <div className="text-primary">
                      npm install -g gh-manager-cli@latest
                    </div>
                  </CodeBlock>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-mono">
                    <LogoMark className="text-primary" width={20} height={20} />
                    Pre-built Binaries
                  </CardTitle>
                  <CardDescription className="font-mono">
                    No Node.js required
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground font-mono mb-4">
                    Download standalone executables for Linux, macOS, and
                    Windows from{' '}
                    <a
                      href="https://github.com/wiiiimm/gh-manager-cli/releases"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      GitHub Releases
                    </a>
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Workflow Demo */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 w-full bg-muted/30 max-w-2xl mx-auto">
          <div className="w-full sm:max-w-lg sm:mx-auto md:max-w-none">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl font-bold mb-4 sm:mb-6 font-mono">
                Simple Workflow
              </h2>
              <p className="text-muted-foreground text-lg font-mono">
                Get started in seconds
              </p>
            </div>

            <div className="space-y-8 sm:space-y-12 w-full">
              <div className="flex items-start gap-4 justify-center w-full">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm font-mono">
                  1
                </div>
                <div className="text-center flex-1 w-full">
                  <h3 className="font-semibold mb-2 font-mono">
                    Run the command
                  </h3>
                  <CodeBlock
                    className="w-full max-w-lg mx-auto"
                    copyText="npx gh-manager-cli@latest"
                  >
                    <div className="text-primary">
                      npx gh-manager-cli@latest
                    </div>
                  </CodeBlock>
                </div>
              </div>

              <div className="flex items-start gap-4 justify-center w-full">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm font-mono">
                  2
                </div>
                <div className="text-center flex-1 w-full">
                  <h3 className="font-semibold mb-2 font-mono">
                    Authenticate with GitHub
                  </h3>
                  <p className="text-muted-foreground font-mono">
                    Choose OAuth (recommended) or Personal Access Token
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 justify-center w-full">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm font-mono">
                  3
                </div>
                <div className="text-center flex-1 w-full">
                  <h3 className="font-semibold mb-2 font-mono">
                    Manage your repositories
                  </h3>
                  <p className="text-muted-foreground font-mono">
                    Browse, search, sort, and perform actions on your GitHub
                    repos
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          id="get-started"
          className="py-20 sm:py-24 lg:py-32 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 w-full"
        >
          <div className="w-full sm:max-w-lg sm:mx-auto md:max-w-none text-center">
            <h2 className="text-3xl font-bold mb-4 sm:mb-6 font-mono">
              Ready to streamline your GitHub workflow?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 sm:mb-12 font-mono">
              Join developers who are managing their repositories more
              efficiently with gh-manager-cli
            </p>

            <TerminalWindow
              className="mb-8 sm:mb-12 w-full max-w-lg mx-auto"
              copyText="npx gh-manager-cli@latest"
            >
              <div className="terminal-prompt font-mono text-primary font-semibold text-lg my-8">
                npx gh-manager-cli@latest
              </div>
            </TerminalWindow>

            <p className="text-xs text-muted-foreground mb-6 font-mono">
              <a
                href="#installation"
                className="hover:text-primary transition-colors underline"
              >
                Other installation methods available
              </a>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono"
                asChild
              >
                <a
                  href="https://www.npmjs.com/package/gh-manager-cli"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Terminal className="h-4 w-4 mr-2" />
                  Get Started Now
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="font-mono border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all duration-200"
              >
                <a
                  href="https://github.com/wiiiimm/gh-manager-cli"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4 mr-2" />
                  View on GitHub
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border bg-muted/30 py-12 sm:py-16 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 w-full">
          <div className="w-full sm:max-w-lg sm:mx-auto md:max-w-none">
            <div className="grid md:grid-cols-3 gap-8 sm:gap-12">
              <div>
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <LogoMark className="text-primary" width={20} height={20} />
                  <span className="font-bold font-mono">gh-manager-cli</span>
                </div>
                <p className="text-muted-foreground text-sm font-mono">
                  Interactive TUI terminal app for GitHub repository management
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-3 sm:mb-4 font-mono">
                  Resources
                </h4>
                <ul className="space-y-2 text-sm font-mono">
                  <li>
                    <a
                      href="https://github.com/wiiiimm/gh-manager-cli/tree/main/wiki"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary"
                    >
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a
                      href="#installation"
                      className="text-muted-foreground hover:text-primary"
                    >
                      Installation Guide
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/wiiiimm/gh-manager-cli/blob/main/wiki/Troubleshooting.md"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary"
                    >
                      Troubleshooting
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/wiiiimm/gh-manager-cli/blob/main/wiki/Roadmap.md"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary"
                    >
                      Roadmap
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-3 sm:mb-4 font-mono">
                  Community
                </h4>
                <ul className="space-y-2 text-sm font-mono">
                  <li>
                    <a
                      href="https://github.com/wiiiimm/gh-manager-cli"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary"
                    >
                      GitHub Repository
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.npmjs.com/package/gh-manager-cli"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary"
                    >
                      NPM Package
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/wiiiimm/gh-manager-cli/issues"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary"
                    >
                      Report Issues
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/wiiiimm/gh-manager-cli/blob/main/CONTRIBUTING.md"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary"
                    >
                      Contributing
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-sm text-muted-foreground font-mono">
              <p>© 2025 gh-manager-cli. Released under the MIT License.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
