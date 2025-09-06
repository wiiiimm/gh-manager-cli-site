'use client';

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
  Coffee,
  Heart,
} from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { AnimatedTerminalBackground } from '@/components/animated-terminal-background';
import { TerminalWindow } from '@/components/ui/terminal-window';
import { CopyButton } from '@/components/ui/copy-button';
import { CodeBlock } from '@/components/ui/code-block';
import { HeroVideo } from '@/components/hero-video';
import { LogoMark } from '@/components/icons/logo-mark';
import Script from 'next/script';
import { track } from '@vercel/analytics';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';

export default function HomePage() {
  const { theme, resolvedTheme } = useTheme();

  // Helper function to track click events with custom data
  const trackClick = (target: string) => {
    track('click', { target });
  };

  // Track theme usage on page load
  useEffect(() => {
    // Wait for theme to be mounted and resolved
    if (resolvedTheme) {
      // Determine the specific theme variant
      let themeVariant = '';

      if (theme === 'system') {
        themeVariant = `system-${resolvedTheme}`; // 'system-dark' or 'system-light'
      } else {
        themeVariant = resolvedTheme; // 'dark' or 'light'
      }

      // Track theme usage on page load
      track('theme_usage', {
        themeVariant,
        userSetTheme: theme || 'system', // What user explicitly set (light/dark/system)
        resolvedTheme, // What actually renders (light/dark)
        isSystemPreference: theme === 'system',
      });
    }
  }, [theme, resolvedTheme]);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'gh-manager-cli',
    alternateName: [
      'GitHub Manager Terminal',
      'GitHub Manager CLI',
      'GitHub Terminal Management Tool',
    ],
    applicationCategory: 'DeveloperApplication',
    operatingSystem: ['Windows', 'macOS', 'Linux'],
    description:
      "TUI Terminal GitHub Repository Management Tool - Stop clicking through GitHub's slow web UI. Archive, delete, and organize repos with powerful keyboard shortcuts.",
    url: 'https://gh-manager-cli.dev',
    author: {
      '@type': 'Person',
      name: 'William Li',
      url: 'https://github.com/wiiiimm',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    softwareVersion: '1.30.0',
    keywords:
      'gh-manager-cli, github manager terminal, github manager cli, github terminal management, terminal ui github, tui github manager',
    downloadUrl: 'https://www.npmjs.com/package/gh-manager-cli',
    installUrl: 'https://www.npmjs.com/package/gh-manager-cli',
    releaseNotes: 'https://github.com/wiiiimm/gh-manager-cli/releases',
    screenshot: 'https://gh-manager-cli.dev/app-demo-poster.jpg',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      ratingCount: '100',
    },
  };

  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Header - moved outside container for proper sticky positioning */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="w-full sm:mx-auto md:max-w-7xl px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <LogoMark
                className="text-primary hidden sm:block"
                width={32}
                height={32}
              />
            </div>
            <div className="relative">
              <span className="font-bold text-md sm:text-xl font-mono">
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
          <div className="flex items-center gap-1 sm:gap-4">
            <a
              href="https://www.npmjs.com/package/gh-manager-cli"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClick('header-npm-total')}
              className="hidden md:block"
            >
              <img
                src="https://img.shields.io/npm/dt/gh-manager-cli?style=social&logo=npm"
                alt="npm total downloads"
                className="h-6"
              />
            </a>
            <ThemeToggle
              onThemeChange={(theme) =>
                trackClick(`header-theme-toggle-${theme}`)
              }
            />
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 rounded-full header-button-white-hover"
              asChild
            >
              <a
                href="https://github.com/wiiiimm/gh-manager-cli"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackClick('header-github-link')}
              >
                <Github className="h-4 w-4" />
              </a>
            </Button>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 rounded-full header-button-white-hover"
              asChild
            >
              <a
                href="https://www.npmjs.com/package/gh-manager-cli"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackClick('header-npm-link')}
              >
                <Package className="h-4 w-4" />
              </a>
            </Button>
            <Button
              className="h-8 px-3 gap-2 bg-yellow-400 hover:bg-yellow-500 border-yellow-500 text-gray-900 hover:text-gray-900 transition-colors header-button-white-hover"
              asChild
            >
              <a
                href="https://buymeacoffee.com/wiiiimm"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackClick('header-buymeacoffee-link')}
              >
                <Coffee className="h-4 w-4" />
                <span className="hidden sm:inline">Sponsor</span>
              </a>
            </Button>
          </div>
        </div>
      </header>

      <div className="min-h-screen relative overflow-x-hidden">
        <AnimatedTerminalBackground />

        <div className="absolute inset-0 bg-white/10 dark:bg-black/10 backdrop-blur-sm z-[1]" />

        <div className="relative z-10">
          {/* Hero Section */}
          <section className="py-20 sm:py-24 lg:py-[5vh] px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 w-full max-w-6xl mx-auto">
            <div className="w-full sm:mx-auto md:max-w-none text-center">
              <Badge
                variant="secondary"
                className="mb-8 bg-muted text-primary font-mono"
              >
                {'>'} Clean up your GitHub account in 5 minutes
              </Badge>
              <h1 className="text-xl sm:text-3xl md:text-4xl font-bold mb-8 text-balance font-mono">
                gh-manager-cli: The Terminal GitHub Manager for{' '}
                <span className="text-primary">Repository Management</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-12 text-pretty w-full font-mono">
                GitHub manager terminal interface. Archive, delete, and organize
                repos with this CLI tool. <br />
                The TUI GitHub management solution developers love - manage
                GitHub from terminal.
              </p>

              {/* Hero Video Demo */}
              <HeroVideo className="mb-12 w-full max-w-xl mx-auto" />

              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono"
                  asChild
                >
                  <a
                    href="#get-started"
                    onClick={() => trackClick('hero-try-now-button')}
                  >
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
                    onClick={() => trackClick('hero-github-button')}
                  >
                    <Github className="h-4 w-4 mr-2" />
                    View on GitHub
                  </a>
                </Button>
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 w-full max-w-6xl mx-auto">
            <div className="w-full sm:mx-auto md:max-w-none">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl font-bold mb-4 sm:mb-6 font-mono">
                  Powerful Repository Management
                </h2>
                <p className="text-muted-foreground text-lg font-mono">
                  Everything you need to manage GitHub repos efficiently
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                <Card className="border-border bg-card">
                  <CardHeader>
                    <Search className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="font-mono">
                      Smart Search & Filter
                    </CardTitle>
                    <CardDescription className="font-mono">
                      Server-side search through repository names and
                      descriptions with live pagination
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
                      Track commits behind upstream and sync forks with
                      automatic conflict detection
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
                      Real-time GraphQL & REST API usage with visual warnings
                      and automatic delta tracking
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
                      Seamlessly switch between personal and organization
                      contexts with enterprise badges
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
                      UI settings, sort order, density, and filters saved
                      between sessions
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

          {/* GitHub Web UI Pain Points Section */}
          <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 w-full max-w-6xl mx-auto">
            <div className="w-full sm:mx-auto md:max-w-none">
              <div className="text-center mb-12 sm:mb-16">
                <Badge variant="destructive" className="mb-6 font-mono">
                  {'>'} The Problem
                </Badge>
                <h2 className="text-3xl font-bold mb-4 sm:mb-6 font-mono">
                  Stop Clicking Through GitHub's Slow Web Interface
                </h2>
                <p className="text-muted-foreground text-lg font-mono max-w-3xl mx-auto">
                  Managing repositories on github.com is painfully slow. Every
                  action requires multiple clicks, page loads, and digging
                  through settings menus. With dozens or hundreds of repos, it's
                  a nightmare.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto mb-12">
                {/* GitHub Web Pain Points */}
                <Card className="border-destructive/20 bg-destructive/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-mono text-lg text-destructive">
                      <Github className="h-5 w-5" />
                      GitHub.com Problems
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm font-mono">
                      <li className="flex items-start gap-2">
                        <span className="text-destructive">✕</span>
                        <span className="text-muted-foreground">
                          20 repos per page, endless "Next" clicking
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-destructive">✕</span>
                        <span className="text-muted-foreground">
                          Click repo → Settings → scroll → find action
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-destructive">✕</span>
                        <span className="text-muted-foreground">
                          No bulk operations for archive/delete
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-destructive">✕</span>
                        <span className="text-muted-foreground">
                          Full page refresh after every action
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-destructive">✕</span>
                        <span className="text-muted-foreground">
                          Can't filter by last activity or fork status
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-destructive">✕</span>
                        <span className="text-muted-foreground">
                          No keyboard shortcuts for power users
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* gh-manager-cli Solutions */}
                <Card className="border-primary/20 bg-primary/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-mono text-lg text-primary">
                      <Terminal className="h-5 w-5" />
                      gh-manager-cli Solution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm font-mono">
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">
                          View all repos with smooth infinite scroll
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">
                          Single keypress for any action
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">
                          Batch operations on multiple repos
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">
                          Instant updates with no page reload
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">
                          Smart filters by date, size, fork status
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">
                          Full keyboard control for everything
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center">
                <p className="text-xl font-bold text-primary font-mono">
                  Result: Clean up 50+ repos in 5 minutes instead of an hour of
                  clicking
                </p>
              </div>
            </div>
          </section>

          {/* Account Cleanup Section */}
          <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 w-full max-w-6xl mx-auto">
            <div className="w-full sm:mx-auto md:max-w-none">
              <div className="text-center mb-12 sm:mb-16">
                <Badge
                  variant="secondary"
                  className="mb-6 bg-primary/10 text-primary font-mono"
                >
                  {'>'} Account Organization
                </Badge>
                <h2 className="text-3xl font-bold mb-4 sm:mb-6 font-mono">
                  Finally Clean Up Your GitHub Account
                </h2>
                <p className="text-muted-foreground text-lg font-mono max-w-3xl mx-auto">
                  Tired of scrolling through hundreds of repos? Old forks
                  cluttering your profile? Dead projects you forgot about? Take
                  control and organize your GitHub presence.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 sm:gap-12 max-w-4xl mx-auto">
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-mono text-lg">
                      <Archive className="h-6 w-6 text-primary" />
                      Bulk Repository Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm font-mono text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        Archive outdated projects in seconds
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        Delete old forks you'll never touch again
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        Batch rename repositories with consistent naming
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        Change visibility settings across multiple repos
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-mono text-lg">
                      <Search className="h-6 w-6 text-primary" />
                      Smart Filtering & Discovery
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm font-mono text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        Find inactive repos by last commit date
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        Filter by stars, size, language, and activity
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        Identify forks that are behind upstream
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        Search across repos and descriptions instantly
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-12 sm:mt-16 text-center">
                <div className="bg-card border border-border rounded-lg p-6 sm:p-8 max-w-2xl mx-auto">
                  <h3 className="font-bold text-xl mb-4 font-mono">
                    Transform Your GitHub Profile
                  </h3>
                  <p className="text-muted-foreground font-mono mb-6">
                    From chaotic repository list to organized, professional
                    profile. Show potential employers and collaborators only
                    your best work.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary font-mono">
                        5 min
                      </div>
                      <div className="text-xs text-muted-foreground font-mono">
                        Average cleanup time
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary font-mono">
                        50+
                      </div>
                      <div className="text-xs text-muted-foreground font-mono">
                        Repos managed per session
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary font-mono">
                        100%
                      </div>
                      <div className="text-xs text-muted-foreground font-mono">
                        Terminal-based efficiency
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Installation Methods */}
          <section
            id="installation"
            className="py-16 sm:py-20 lg:py-24 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 w-full max-w-6xl mx-auto"
          >
            <div className="w-full sm:mx-auto md:max-w-none">
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
                      <Terminal className="h-5 w-5 text-primary" />
                      NPX (Recommended)
                    </CardTitle>
                    <CardDescription className="font-mono">
                      Run instantly without installation
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock
                      copyText="npx gh-manager-cli@latest"
                      trackingTarget="installation-npx-copy-button"
                    >
                      <div className="text-primary">
                        npx gh-manager-cli@latest
                      </div>
                    </CodeBlock>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-mono">
                      <Terminal className="h-5 w-5 text-primary" />
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
                      trackingTarget="installation-homebrew-copy-button"
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
                      <Terminal className="h-5 w-5 text-primary" />
                      Global Install
                    </CardTitle>
                    <CardDescription className="font-mono">
                      Install globally via npm
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock
                      copyText="npm install -g gh-manager-cli@latest"
                      trackingTarget="installation-npm-global-copy-button"
                    >
                      <div className="text-primary">
                        npm install -g gh-manager-cli@latest
                      </div>
                    </CodeBlock>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-mono">
                      <Terminal className="h-5 w-5 text-primary" />
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
                        onClick={() =>
                          trackClick('installation-github-releases-link')
                        }
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
          <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 w-full max-w-2xl mx-auto">
            <div className="w-full sm:mx-auto md:max-w-none">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl font-bold mb-4 sm:mb-6 font-mono">
                  Simple Workflow
                </h2>
                <p className="text-muted-foreground text-lg font-mono">
                  Get started in seconds
                </p>
              </div>

              <div className="space-y-8 sm:space-y-12 w-full">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-4 justify-center w-full">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm font-mono mb-2 md:mb-0">
                    1
                  </div>
                  <div className="text-center flex-1 w-full">
                    <h3 className="font-semibold mb-2 font-mono">
                      Run the command
                    </h3>
                    <CodeBlock
                      className="w-full max-w-lg mx-auto"
                      copyText="npx gh-manager-cli@latest"
                      trackingTarget="workflow-step1-copy-button"
                    >
                      <div className="text-primary">
                        npx gh-manager-cli@latest
                      </div>
                    </CodeBlock>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center md:items-start gap-4 justify-center w-full">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm font-mono mb-2 md:mb-0">
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

                <div className="flex flex-col md:flex-row items-center md:items-start gap-4 justify-center w-full">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm font-mono mb-2 md:mb-0">
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
            className="py-20 sm:py-24 lg:py-32 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 w-full"
          >
            <div className="w-full sm:mx-auto md:max-w-none text-center">
              <h2 className="text-3xl font-bold mb-4 sm:mb-6 font-mono">
                Start cleaning up your GitHub account now
              </h2>
              <p className="text-muted-foreground text-lg mb-8 sm:mb-12 font-mono">
                Join thousands of developers who have organized their GitHub
                profiles with gh-manager-cli
              </p>

              <TerminalWindow
                className="mb-8 sm:mb-12 w-full max-w-lg mx-auto"
                copyText="npx gh-manager-cli@latest"
                trackingTarget="cta-terminal-copy-button"
              >
                <div className="terminal-prompt font-mono text-primary font-semibold text-lg my-8">
                  npx gh-manager-cli@latest
                </div>
              </TerminalWindow>

              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono"
                  asChild
                >
                  <a
                    href="#installation"
                    onClick={() => trackClick('cta-installation-methods-link')}
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
                    onClick={() => trackClick('cta-github-button')}
                  >
                    <Github className="h-4 w-4 mr-2" />
                    View on GitHub
                  </a>
                </Button>
              </div>
            </div>
          </section>

          {/* Sponsor Section */}
          <section className="py-16 sm:py-20 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 w-full border-t border-border bg-gradient-to-b from-background to-muted/30">
            <div className="w-full max-w-4xl mx-auto text-center">
              <div className="mb-8">
                <Heart className="h-12 w-12 text-green-500 dark:text-green-400 mx-auto mb-4" />
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-mono">
                  💚 Thank You for Using gh-manager-cli!
                </h2>
                <p className="text-lg text-muted-foreground mb-4 max-w-2xl mx-auto">
                  If this app saved you time, please consider supporting the
                  development of more open-source projects like this.
                </p>
                <p className="text-base text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Hi, I'm William — the person behind{' '}
                  <span className="text-primary font-semibold">wiiiimm</span>,
                  my new brand that brings together my worlds as a software
                  engineer, photographer, and multimedia designer.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-10 max-w-3xl mx-auto">
                <Card className="border-2 border-border/50 bg-card/50 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 justify-center">
                      <Terminal className="h-5 w-5 text-primary" />
                      Two Decades of Code
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      I've been coding since 1998 and working on web projects
                      since 2005 — over two decades of creating, launching, and
                      collaborating. Along the way, I've worked with multiple
                      agencies and helped bring countless projects to life.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-border/50 bg-card/50 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 justify-center">
                      <Zap className="h-5 w-5 text-primary" />
                      What's Next with wiiiimm
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-muted-foreground text-left space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>
                          Releasing at least one useful open-source app every
                          month
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>
                          Sharing photography and multimedia design projects
                          that explore visuals, sound, and storytelling
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-gradient-to-br from-yellow-500/10 to-green-500/10 dark:from-yellow-400/10 dark:to-green-400/10 rounded-lg p-8 max-w-2xl mx-auto mb-8">
                <p className="text-lg mb-6 text-foreground">
                  Your support isn't just coffee — it's an invitation to join
                  the journey. Together, we can keep experimenting, building,
                  and creating tools, images, and experiences worth sharing.
                </p>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-center gap-4 flex-wrap">
                    <Button
                      size="lg"
                      className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 hover:text-gray-900 font-semibold px-6 transition-colors"
                      asChild
                    >
                      <a
                        href="https://buymeacoffee.com/wiiiimm"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          trackClick('sponsor-section-buymeacoffee')
                        }
                      >
                        <Coffee className="h-5 w-5 mr-2" />
                        Buy Me a Coffee
                      </a>
                    </Button>

                    <Button
                      size="lg"
                      variant="outline"
                      className="border-primary hover:text-gray-600 dark:hover:text-gray-400 font-semibold px-6 transition-colors"
                      asChild
                    >
                      <a
                        href="https://wiiiimm.codes"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          trackClick('sponsor-section-wiiiimm-codes')
                        }
                      >
                        <Zap className="h-5 w-5 mr-2" />
                        Visit wiiiimm.codes
                      </a>
                    </Button>
                  </div>

                  <div className="flex justify-center">
                    <Button
                      size="lg"
                      variant="ghost"
                      className="text-muted-foreground hover:text-primary dark:hover:text-gray-400 font-semibold px-6 transition-colors"
                      asChild
                    >
                      <a
                        href="https://github.com/wiiiimm/gh-manager-cli"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          trackClick('sponsor-section-github-feedback')
                        }
                      >
                        <Github className="h-5 w-5 mr-2" />
                        Leave Feedback & Contribute
                      </a>
                    </Button>
                  </div>
                </div>

                <p className="text-xl font-semibold text-center text-foreground">
                  Your support and contributions make a difference! 🙏
                </p>
              </div>

              <div className="text-sm text-muted-foreground">
                <p>
                  Every contribution helps maintain and improve gh-manager-cli
                  and future open-source projects.
                </p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="border-t border-border bg-muted/30 py-12 sm:py-16 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 w-full">
            <div className="w-full sm:mx-auto md:max-w-5xl">
              <div className="grid md:grid-cols-3 gap-8 sm:gap-12">
                <div>
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <LogoMark className="text-primary" width={20} height={20} />
                    <span className="font-bold font-mono">gh-manager-cli</span>
                  </div>
                  <div className="items-center space-y-4">
                    <p className="text-muted-foreground text-sm font-mono">
                      Interactive TUI terminal app for GitHub repository
                      management
                    </p>
                    <p className="text-muted-foreground text-sm font-mono">
                      npx gh-manager-cli@latest
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      {/* GitHub Stars */}
                      <a
                        href="https://github.com/wiiiimm/gh-manager-cli"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackClick('footer-github-stars')}
                      >
                        <img
                          src="https://img.shields.io/github/stars/wiiiimm/gh-manager-cli?style=social"
                          alt="GitHub stars"
                          className="h-6"
                        />
                      </a>

                      {/* GitHub Forks */}
                      <a
                        href="https://github.com/wiiiimm/gh-manager-cli"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackClick('footer-github-forks')}
                      >
                        <img
                          src="https://img.shields.io/github/forks/wiiiimm/gh-manager-cli?style=social"
                          alt="GitHub forks"
                          className="h-6"
                        />
                      </a>

                      {/* NPM Total Downloads */}
                      <a
                        href="https://www.npmjs.com/package/gh-manager-cli"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackClick('footer-npm-total')}
                      >
                        <img
                          src="https://img.shields.io/npm/dt/gh-manager-cli?style=social&logo=npm"
                          alt="npm total downloads"
                          className="h-6"
                        />
                      </a>
                    </div>
                  </div>
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
                        onClick={() => trackClick('footer-documentation-link')}
                      >
                        Documentation
                      </a>
                    </li>
                    <li>
                      <a
                        href="#installation"
                        className="text-muted-foreground hover:text-primary"
                        onClick={() =>
                          trackClick('footer-installation-guide-link')
                        }
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
                        onClick={() =>
                          trackClick('footer-troubleshooting-link')
                        }
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
                        onClick={() => trackClick('footer-roadmap-link')}
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
                        onClick={() =>
                          trackClick('footer-github-repository-link')
                        }
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
                        onClick={() => trackClick('footer-npm-package-link')}
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
                        onClick={() => trackClick('footer-report-issues-link')}
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
                        onClick={() => trackClick('footer-contributing-link')}
                      >
                        Contributing
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://buymeacoffee.com/wiiiimm"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2 py-1 rounded bg-yellow-400 hover:bg-yellow-500 text-gray-900 hover:text-gray-900 transition-colors text-sm font-medium"
                        onClick={() => trackClick('footer-buymeacoffee-link')}
                      >
                        <Coffee className="h-4 w-4" />
                        Buy Me a Coffee
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
    </>
  );
}
