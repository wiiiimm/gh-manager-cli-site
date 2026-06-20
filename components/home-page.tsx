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
  Gauge,
  Activity,
  Building2,
  Settings,
  Layers,
  RefreshCw,
  Copy,
  Check,
  Coffee,
  Star,
  Heart,
  CheckSquare,
  ArrowRightLeft,
  FilePlus2,
  Palette,
  ScanSearch,
  BarChart3,
  Keyboard,
  Clock,
  MousePointerClick,
  Ban,
} from 'lucide-react';
import { AnimatedTerminalBackground } from '@/components/animated-terminal-background';
import { TerminalWindow } from '@/components/ui/terminal-window';
import { CopyButton } from '@/components/ui/copy-button';
import { CodeBlock } from '@/components/ui/code-block';
import { HeroSlider } from '@/components/hero-slider';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import Script from 'next/script';
import Link from 'next/link';
import { track, trackClick, trackThemeUsage } from '@/lib/analytics';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import type { ComponentType } from 'react';
import type { ChangelogEntry } from '@/lib/changelog';

type FeatureCategory = 'find' | 'manage' | 'bulk' | 'power';

const FEATURE_FILTERS: { id: FeatureCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'find', label: 'Find & Navigate' },
  { id: 'manage', label: 'Manage Repos' },
  { id: 'bulk', label: 'Bulk Operations' },
  { id: 'power', label: 'Power & Polish' },
];

type Feature = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  category: FeatureCategory;
  highlighted?: boolean;
  description: React.ReactNode;
};

const FEATURES: Feature[] = [
  {
    icon: Search,
    title: 'Smart Search & Filter',
    category: 'find',
    description: (
      <>
        Server-side search plus instant fuzzy search (
        <kbd className="font-mono">/</kbd>) across your full cached account —
        find any repo in milliseconds
      </>
    ),
  },
  {
    icon: Zap,
    title: 'Keyboard-First Navigation',
    category: 'find',
    description:
      'Full keyboard control with arrow keys, shortcuts, and modal-based interactions',
  },
  {
    icon: RefreshCw,
    title: 'Smart Caching & Performance',
    category: 'find',
    description:
      'Background fetch caches your entire account after the first page load — enabling instant fuzzy search and bulk operations across all repos',
  },
  {
    icon: Activity,
    title: 'Live Repository Metrics',
    category: 'find',
    description:
      'Stars, forks, language stats, size tracking, and last activity timestamps',
  },
  {
    icon: Archive,
    title: 'Repository Actions',
    category: 'manage',
    description:
      'Rename, archive, delete, change visibility, transfer to another owner/org, and sync forks — all with confirmation prompts',
  },
  {
    icon: FilePlus2,
    title: 'Repository Creation',
    category: 'manage',
    description: (
      <>
        Create a new repository without leaving the terminal — press{' '}
        <kbd className="font-mono">Ctrl+N</kbd> to open the creation form with
        name, description, visibility, and initialisation options
      </>
    ),
  },
  {
    icon: Star,
    title: 'Stars Management',
    category: 'manage',
    description:
      'View and manage starred repositories with dedicated stars mode and quick star/unstar actions',
  },
  {
    icon: Eye,
    title: 'Visibility Management',
    category: 'manage',
    description:
      'Filter by visibility and change repository settings including Enterprise support',
  },
  {
    icon: GitBranch,
    title: 'Fork Tracking & Sync',
    category: 'manage',
    description: (
      <>
        Ahead/behind commit counts, jump to upstream (
        <kbd className="font-mono">P</kbd>), and one-key fork sync (
        <kbd className="font-mono">Ctrl+F</kbd>) with conflict detection
      </>
    ),
  },
  {
    icon: CheckSquare,
    title: 'Bulk Select Mode',
    category: 'bulk',
    highlighted: true,
    description: (
      <>
        Press <kbd className="font-mono">B</kbd> to enter Bulk Select —
        multi-pick repos across pages and searches, then star/unstar, archive,
        change visibility, delete, or transfer them all at once. Two-stage
        confirmation with a review list and verification code for destructive
        actions.
      </>
    ),
  },
  {
    icon: ArrowRightLeft,
    title: 'Repository Transfer',
    category: 'bulk',
    highlighted: true,
    description: (
      <>
        Move a repo to another owner or organisation with{' '}
        <kbd className="font-mono">Shift+M</kbd>. A destination picker lists your
        personal account and all connected orgs, with a manual-entry fallback.
        Supports single and bulk transfer, both verification-code gated.
      </>
    ),
  },
  {
    icon: Building2,
    title: 'Enterprise & Org Support',
    category: 'power',
    description:
      'Seamlessly switch between personal and organization contexts with enterprise badges',
  },
  {
    icon: Shield,
    title: 'Secure Authentication',
    category: 'power',
    description:
      'GitHub OAuth or Personal Access Token with secure local storage',
  },
  {
    icon: Gauge,
    title: 'Rate Limit Monitoring',
    category: 'power',
    description:
      'Real-time GraphQL & REST API usage with visual warnings and automatic delta tracking',
  },
  {
    icon: Layers,
    title: 'Display Density Control',
    category: 'power',
    description:
      'Toggle between compact, cozy, and comfy modes for optimal information density',
  },
  {
    icon: Palette,
    title: 'Colour Themes',
    category: 'power',
    description: (
      <>
        Cycle through four built-in colour themes with{' '}
        <kbd className="font-mono">Shift+T</kbd>: Default, Ocean, Forest, and
        Monochrome — your preference is saved between sessions
      </>
    ),
  },
  {
    icon: Settings,
    title: 'Persistent Preferences',
    category: 'power',
    description:
      'UI settings, sort order, density, and filters saved between sessions',
  },
  {
    icon: BarChart3,
    title: 'Session Usage Summary',
    category: 'power',
    description:
      'On quit, see a summary of everything you did this session — repos actioned, time spent, and an estimated time saved versus doing the same work in the GitHub web UI',
  },
];

function entrySummary(entry: ChangelogEntry): string {
  const item = entry.sections[0]?.items[0];
  if (!item) return '';
  return item.segments
    .filter((s) => s.type !== 'link')
    .map((s) => (s.type === 'text' || s.type === 'strong' ? s.value : ''))
    .join('')
    .replace(/\s*\(\s*\)/g, '') // leftover parens around stripped PR/commit links
    .replace(/\s+/g, ' ')
    .trim();
}

function formatEntryDate(iso: string) {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  });
}

export function HomePage({
  recentEntries,
}: {
  recentEntries: ChangelogEntry[];
}) {
  const { theme, resolvedTheme } = useTheme();
  const [activeFeature, setActiveFeature] = useState<FeatureCategory | 'all'>(
    'all'
  );

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
      trackThemeUsage({
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
      "TUI Terminal GitHub Repository Management Tool - Stop clicking through GitHub's slow web UI. Archive, delete, bulk-select, transfer, and organise repos with powerful keyboard shortcuts.",
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
    softwareVersion: '1.40.0',
    keywords:
      'gh-manager-cli, github manager terminal, github manager cli, github terminal management, terminal ui github, tui github manager',
    downloadUrl: 'https://www.npmjs.com/package/gh-manager-cli',
    installUrl: 'https://www.npmjs.com/package/gh-manager-cli',
    releaseNotes: 'https://github.com/wiiiimm/gh-manager-cli/releases',
    screenshot: 'https://gh-manager-cli.dev/app-demo-poster.jpg',
  };

  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Header - moved outside container for proper sticky positioning */}
      <SiteHeader />

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
                {'>'} No more click, click, click — bulk-manage from the
                terminal
              </Badge>
              <h1 className="text-xl sm:text-3xl md:text-4xl font-bold mb-8 text-balance font-mono">
                Your entire GitHub account,{' '}
                <span className="text-primary">at your fingertips</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-12 text-pretty w-full font-mono">
                Stop clicking through github.com.{' '}
                <span className="text-foreground">gh-manager-cli</span> is a
                terminal UI (TUI) that lets you browse, search, and{' '}
                <span className="text-primary">bulk-manage</span> every
                repository you own — archive, delete, transfer, and change
                visibility across dozens of repos with a few keystrokes. <br />
                Manage GitHub from the terminal, in minutes not hours.
              </p>

              {/* Hero Product Slider */}
              <HeroSlider className="mb-12" />

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

          {/* GitHub Web UI Pain Points Section */}
          <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 w-full max-w-6xl mx-auto">
            <div className="w-full sm:mx-auto md:max-w-none">
              {/* The fix — one keyboard-driven view */}
              <Card className="border-primary/30 bg-primary/5 max-w-5xl mx-auto overflow-hidden mb-12 sm:mb-16">
                <div className="grid lg:grid-cols-[1.15fr_1fr]">
                  <CardContent className="p-6 sm:p-10 flex flex-col justify-center">
                    <Badge
                      variant="secondary"
                      className="mb-5 w-fit bg-primary/10 text-primary font-mono"
                    >
                      {'>'} Meet gh-manager-cli
                    </Badge>
                    <h3 className="text-2xl font-bold mb-4 font-mono">
                      Your whole account, in one keyboard-driven view
                    </h3>
                    <p className="text-muted-foreground font-mono leading-relaxed">
                      <span className="text-foreground">gh-manager-cli</span>{' '}
                      collapses the entire github.com click-path into a single
                      terminal UI.
                      Browse every repository with infinite scroll, act on any of
                      them with a single keypress, and use{' '}
                      <span className="text-primary">Bulk Select</span> to
                      archive, delete, transfer, or change visibility across pages
                      and searches at once — with instant updates and zero page
                      reloads.
                    </p>

                    <div className="mt-7 flex flex-wrap gap-x-8 gap-y-4">
                      <div>
                        <div className="text-2xl font-bold text-primary font-mono">
                          ~5 min
                        </div>
                        <div className="text-xs text-muted-foreground font-mono">
                          to clean up the same account
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary font-mono">
                          50+
                        </div>
                        <div className="text-xs text-muted-foreground font-mono">
                          repos managed per session
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary font-mono">
                          0
                        </div>
                        <div className="text-xs text-muted-foreground font-mono">
                          page reloads
                        </div>
                      </div>
                    </div>
                  </CardContent>

                  <div className="border-t lg:border-t-0 lg:border-l border-primary/20 bg-terminal-bg/60 p-6 sm:p-8 flex items-center">
                    <TerminalWindow
                      className="w-full"
                      title="gh-manager-cli"
                      copyText="npx gh-manager-cli@latest"
                      trackingTarget="problem-terminal-copy-button"
                    >
                      <div className="font-mono text-sm leading-relaxed text-left space-y-1">
                        <div className="text-primary font-semibold">
                          $ npx gh-manager-cli@latest
                        </div>
                        <div className="text-muted-foreground">
                          → 214 repositories loaded
                        </div>
                        <div className="h-3" />
                        <div className="text-muted-foreground">
                          <span className="text-primary">/</span>&nbsp;&nbsp;&nbsp;fuzzy
                          search your whole account
                        </div>
                        <div className="text-muted-foreground">
                          <span className="text-primary">B</span>&nbsp;&nbsp;&nbsp;bulk
                          select across pages
                        </div>
                        <div className="text-muted-foreground">
                          <span className="text-primary">^A</span>&nbsp;&nbsp;archive
                          &nbsp;·&nbsp; <span className="text-primary">Del</span>{' '}
                          delete &nbsp;·&nbsp;{' '}
                          <span className="text-primary">⇧M</span> transfer
                        </div>
                        <div className="text-primary">
                          ✓&nbsp;&nbsp;&nbsp;instant updates, zero reloads
                        </div>
                      </div>
                    </TerminalWindow>
                  </div>
                </div>
              </Card>

              <div className="text-center mb-12 sm:mb-16">
                <Badge
                  variant="secondary"
                  className="mb-6 bg-muted text-muted-foreground font-mono"
                >
                  {'>'} GitHub was never designed for this
                </Badge>
                <h2 className="text-3xl font-bold mb-4 sm:mb-6 font-mono">
                  Bulk-managing repos from a web UI is death by a thousand
                  clicks
                </h2>
                <p className="text-muted-foreground text-lg font-mono max-w-3xl mx-auto">
                  It's designed for browsing one repo at a time. The moment you
                  need to clean up, archive, or reorganise an account at scale,
                  every interaction works against you — paginated lists, settings
                  buried three levels deep, a full page reload after every
                  action, and no way to act on more than one repository at once.
                </p>
              </div>

              {/* The friction tax — concrete costs of the status quo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-5xl mx-auto mb-12 sm:mb-16">
                <Card className="border-border bg-card/60 hover:border-destructive/40 transition-colors">
                  <CardContent className="p-6">
                    <Layers className="h-5 w-5 text-destructive/70 mb-4" />
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-4xl font-bold font-mono text-destructive">
                        20
                      </span>
                      <span className="text-sm font-mono text-muted-foreground">
                        repos / page
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground font-mono leading-relaxed">
                      GitHub paginates everything. Own 200 repos? That's ten
                      pages of "Next" just to see what you have.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card/60 hover:border-destructive/40 transition-colors">
                  <CardContent className="p-6">
                    <MousePointerClick className="h-5 w-5 text-destructive/70 mb-4" />
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-4xl font-bold font-mono text-destructive">
                        3+
                      </span>
                      <span className="text-sm font-mono text-muted-foreground">
                        clicks / action
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground font-mono leading-relaxed">
                      Every archive, delete, or visibility change is buried: open
                      repo → Settings → scroll → confirm.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card/60 hover:border-destructive/40 transition-colors">
                  <CardContent className="p-6">
                    <Ban className="h-5 w-5 text-destructive/70 mb-4" />
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-4xl font-bold font-mono text-destructive">
                        1
                      </span>
                      <span className="text-sm font-mono text-muted-foreground">
                        repo at a time
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground font-mono leading-relaxed">
                      No bulk anything. Archiving 30 stale forks means repeating
                      the exact same ritual 30 times.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card/60 hover:border-destructive/40 transition-colors">
                  <CardContent className="p-6">
                    <Clock className="h-5 w-5 text-destructive/70 mb-4" />
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-4xl font-bold font-mono text-destructive">
                        ~60
                      </span>
                      <span className="text-sm font-mono text-muted-foreground">
                        min to tidy up
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground font-mono leading-relaxed">
                      Between page loads and menu-digging, a real account cleanup
                      quietly eats an afternoon.
                    </p>
                  </CardContent>
                </Card>
              </div>

            </div>
          </section>

          {/* Features Grid */}
          <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 w-full max-w-6xl mx-auto">
            <div className="w-full sm:mx-auto md:max-w-none">
              <div className="text-center mb-10 sm:mb-12">
                <Badge
                  variant="secondary"
                  className="mb-6 bg-primary/10 text-primary font-mono"
                >
                  {'>'} Features
                </Badge>
                <h2 className="text-3xl font-bold mb-4 sm:mb-6 font-mono">
                  Everything you need to manage GitHub repos
                </h2>
                <p className="text-muted-foreground text-lg font-mono max-w-2xl mx-auto">
                  Eighteen keyboard-driven capabilities, grouped so you can find
                  the one you need. Filter by what you're trying to do.
                </p>
              </div>

              {/* Category filter pills */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-12">
                {FEATURE_FILTERS.map((filter) => {
                  const isActive = activeFeature === filter.id;
                  const count =
                    filter.id === 'all'
                      ? FEATURES.length
                      : FEATURES.filter((f) => f.category === filter.id).length;
                  return (
                    <button
                      key={filter.id}
                      type="button"
                      onClick={() => {
                        setActiveFeature(filter.id);
                        trackClick(`features-filter-${filter.id}`);
                      }}
                      aria-pressed={isActive}
                      className={`font-mono text-sm px-4 py-2 rounded-full border transition-colors ${
                        isActive
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border bg-card/60 text-muted-foreground hover:border-primary/40 hover:text-foreground'
                      }`}
                    >
                      {filter.label}
                      <span className="ml-1.5 opacity-60">{count}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
                {FEATURES.map((feature) => {
                  const Icon = feature.icon;
                  const hidden =
                    activeFeature !== 'all' &&
                    feature.category !== activeFeature;
                  return (
                    <Card
                      key={feature.title}
                      className={`border-border bg-card w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.334rem)] max-w-sm ${
                        feature.highlighted ? 'border-primary/30' : ''
                      } ${hidden ? 'hidden' : ''}`}
                    >
                      <CardHeader>
                        <Icon className="h-8 w-8 text-primary mb-2" />
                        <CardTitle className="font-mono">
                          {feature.title}
                        </CardTitle>
                        <CardDescription className="font-mono">
                          {feature.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  );
                })}
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
                        <span>
                          <kbd className="text-primary">B</kbd> — enter Bulk Select mode, pick repos across pages and searches
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        Bulk archive, delete, star/unstar, and change visibility in one go
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>
                          Bulk transfer repos to another owner or organisation (<kbd className="text-primary">Shift+M</kbd>)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        Two-stage confirmation: review list, count prompt, and verification code for destructive actions
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        Manage starred repositories with dedicated stars mode
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
                        <span>
                          <kbd className="text-primary">/</kbd> — fuzzy search across your full cached account instantly
                        </span>
                      </li>
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
                        Identify forks that are behind upstream with ahead/behind counts
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

          {/* Keyboard Shortcuts Reference */}
          <section
            id="keyboard-shortcuts"
            className="py-16 sm:py-20 lg:py-24 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 w-full max-w-6xl mx-auto"
          >
            <div className="w-full sm:mx-auto md:max-w-none">
              <div className="text-center mb-12 sm:mb-16">
                <Badge
                  variant="secondary"
                  className="mb-6 bg-primary/10 text-primary font-mono"
                >
                  {'>'} Keyboard Reference
                </Badge>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 font-mono">
                  Everything at Your Fingertips
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base md:text-lg font-mono max-w-3xl mx-auto">
                  Full keyboard control — no mouse required. Every action is one
                  or two keystrokes away.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {/* Navigation */}
                <Card className="border-border bg-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 font-mono text-sm sm:text-base">
                      <Keyboard className="h-5 w-5 text-primary" />
                      Navigation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-xs sm:text-sm font-mono">
                      {[
                        ['↑ / ↓', 'Navigate repos'],
                        ['PgUp / PgDn', 'Jump 10 repos'],
                        ['Ctrl+G  /  G', 'Top / bottom of list'],
                        ['Enter  or  O', 'Open in browser (forks: chooser)'],
                        ['Esc', 'Close modal / clear search'],
                      ].map(([key, desc]) => (
                        <li key={key} className="flex items-center justify-between gap-2">
                          <kbd className="bg-muted px-1.5 py-0.5 rounded text-xs text-primary whitespace-nowrap">
                            {key}
                          </kbd>
                          <span className="text-muted-foreground text-right">{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Search & Display */}
                <Card className="border-border bg-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 font-mono text-sm sm:text-base">
                      <ScanSearch className="h-5 w-5 text-primary" />
                      Search & Display
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-xs sm:text-sm font-mono">
                      {[
                        ['/', 'Fuzzy search (full account cache)'],
                        ['S  /  D', 'Sort field / direction'],
                        ['V', 'View filters (visibility · archive · fork)'],
                        ['T', 'Density: compact / cozy / comfy'],
                        ['Shift+T', 'Cycle colour theme'],
                        ['Shift+S', 'Toggle starred repos mode'],
                        ['R', 'Refresh repo list'],
                      ].map(([key, desc]) => (
                        <li key={key} className="flex items-center justify-between gap-2">
                          <kbd className="bg-muted px-1.5 py-0.5 rounded text-xs text-primary whitespace-nowrap">
                            {key}
                          </kbd>
                          <span className="text-muted-foreground text-right">{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="border-border bg-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 font-mono text-sm sm:text-base">
                      <Zap className="h-5 w-5 text-primary" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-xs sm:text-sm font-mono">
                      {[
                        ['Ctrl+A', 'Archive / unarchive'],
                        ['Del / Backspace', 'Delete (with confirmation)'],
                        ['Ctrl+V', 'Change visibility'],
                        ['Ctrl+S', 'Star / unstar'],
                        ['Ctrl+R', 'Rename'],
                        ['Ctrl+N', 'Create new repository'],
                        ['Shift+M', 'Transfer to another owner/org'],
                        ['C', 'Copy repo URL (SSH/HTTPS)'],
                      ].map(([key, desc]) => (
                        <li key={key} className="flex items-center justify-between gap-2">
                          <kbd className="bg-muted px-1.5 py-0.5 rounded text-xs text-primary whitespace-nowrap">
                            {key}
                          </kbd>
                          <span className="text-muted-foreground text-right">{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Bulk Select Mode */}
                <Card className="border-border bg-card border-primary/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 font-mono text-sm sm:text-base">
                      <CheckSquare className="h-5 w-5 text-primary" />
                      Bulk Select Mode
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-xs sm:text-sm font-mono">
                      {[
                        ['B', 'Toggle Bulk Select mode'],
                        ['Space', 'Select / deselect repo'],
                        ['X', 'Unselect all'],
                        ['Ctrl+A', 'Bulk archive / unarchive'],
                        ['Del / Backspace', 'Bulk delete'],
                        ['Ctrl+S', 'Bulk star / unstar'],
                        ['Ctrl+V', 'Bulk change visibility'],
                        ['Shift+M', 'Bulk transfer'],
                        ['Esc', 'Exit Bulk Select mode'],
                      ].map(([key, desc]) => (
                        <li key={key} className="flex items-center justify-between gap-2">
                          <kbd className="bg-muted px-1.5 py-0.5 rounded text-xs text-primary whitespace-nowrap">
                            {key}
                          </kbd>
                          <span className="text-muted-foreground text-right">{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Fork Actions */}
                <Card className="border-border bg-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 font-mono text-sm sm:text-base">
                      <GitBranch className="h-5 w-5 text-primary" />
                      Forks & Repo Info
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-xs sm:text-sm font-mono">
                      {[
                        ['P', 'Jump to upstream repo'],
                        ['Ctrl+F', 'Sync fork with upstream'],
                        ['I', 'Repository info'],
                        ['L', 'Open PRs / Issues'],
                        ['K', 'Inspect cache status'],
                      ].map(([key, desc]) => (
                        <li key={key} className="flex items-center justify-between gap-2">
                          <kbd className="bg-muted px-1.5 py-0.5 rounded text-xs text-primary whitespace-nowrap">
                            {key}
                          </kbd>
                          <span className="text-muted-foreground text-right">{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Account & Session */}
                <Card className="border-border bg-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 font-mono text-sm sm:text-base">
                      <Settings className="h-5 w-5 text-primary" />
                      Account & Session
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-xs sm:text-sm font-mono">
                      {[
                        ['W', 'Switch context (personal / org)'],
                        ['Ctrl+L', 'Log out / switch account'],
                        ['Q', 'Quit (with session summary)'],
                      ].map(([key, desc]) => (
                        <li key={key} className="flex items-center justify-between gap-2">
                          <kbd className="bg-muted px-1.5 py-0.5 rounded text-xs text-primary whitespace-nowrap">
                            {key}
                          </kbd>
                          <span className="text-muted-foreground text-right">{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* What's New / Recent Releases */}
          {recentEntries.length > 0 && (
            <section
              id="whats-new"
              className="py-16 sm:py-20 lg:py-24 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 w-full max-w-6xl mx-auto"
            >
              <div className="w-full sm:mx-auto md:max-w-none">
                <div className="text-center mb-12 sm:mb-16">
                  <Badge
                    variant="secondary"
                    className="mb-6 bg-primary/10 text-primary font-mono"
                  >
                    {'>'} Recent Releases
                  </Badge>
                  <h2 className="text-3xl font-bold mb-4 sm:mb-6 font-mono">
                    What's New
                  </h2>
                  <p className="text-muted-foreground text-lg font-mono">
                    Actively maintained — shipped straight from GitHub Releases
                  </p>
                </div>

                <Card className="border-border bg-card max-w-3xl mx-auto py-0">
                  <CardContent className="p-0 divide-y divide-border">
                    {recentEntries.map((entry) => {
                      const sectionTitle = entry.sections[0]?.title ?? '';
                      const typeLabel =
                        sectionTitle === 'Features'
                          ? 'feat'
                          : sectionTitle === 'Bug Fixes'
                            ? 'fix'
                            : sectionTitle === 'Performance Improvements'
                              ? 'perf'
                              : 'chore';
                      return (
                        <Link
                          key={entry.version}
                          href="/changelog"
                          onClick={() =>
                            trackClick('whats-new-release-row')
                          }
                          className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4 font-mono text-sm group hover:bg-muted/50 transition-colors"
                        >
                          <span className="font-bold text-primary whitespace-nowrap">
                            v{entry.version}
                          </span>
                          <span
                            className={`text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded border whitespace-nowrap ${
                              typeLabel === 'feat'
                                ? 'bg-primary/10 text-primary border-primary/20'
                                : typeLabel === 'fix'
                                  ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                                  : 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20'
                            }`}
                          >
                            {typeLabel}
                          </span>
                          <span className="text-muted-foreground truncate flex-1 group-hover:text-foreground transition-colors">
                            {entrySummary(entry)}
                          </span>
                          <span className="text-xs text-muted-foreground whitespace-nowrap hidden sm:block">
                            {formatEntryDate(entry.date)}
                          </span>
                        </Link>
                      );
                    })}
                  </CardContent>
                </Card>

                <div className="text-center mt-8">
                  <Button
                    variant="outline"
                    className="font-mono border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all duration-200"
                    asChild
                  >
                    <Link
                      href="/changelog"
                      onClick={() => trackClick('whats-new-full-changelog-link')}
                    >
                      View Full Changelog
                    </Link>
                  </Button>
                </div>
              </div>
            </section>
          )}

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
              <p className="text-primary font-mono mb-3 sm:mb-4">
                No more click, click, click.
              </p>
              <h2 className="text-3xl font-bold mb-4 sm:mb-6 font-mono">
                Start managing your GitHub repos in bulk — from the terminal
              </h2>
              <p className="text-muted-foreground text-lg mb-8 sm:mb-12 font-mono">
                Free and open source. No signup, no config — just your terminal
                and a GitHub token. Run it once and tidy up your whole account in
                minutes.
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
            <div className="w-full max-w-5xl mx-auto text-center">
              <div className="bg-gradient-to-br from-yellow-500/10 to-green-500/10 dark:from-yellow-400/10 dark:to-green-400/10 rounded-lg p-8 sm:p-10 max-w-4xl mx-auto mb-8">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-mono">
                  Thank you for using gh-manager-cli
                </h2>
                <p className="text-lg mb-6 text-foreground">
                  If this app saved you time, please consider supporting the
                  development of more open-source projects like this. Your
                  sponsorship is an invitation to join the journey — together, we
                  can keep experimenting, building, and creating tools, images,
                  and experiences worth sharing.
                </p>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-center gap-4 flex-wrap">
                    <a
                      href="https://github.com/sponsors/wiiiimm"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackClick('sponsor-section-github-sponsors')
                      }
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold shadow-lg rounded-md transition-opacity duration-200 hover:opacity-80"
                      style={{ 
                        padding: '16px 32px',
                        minHeight: '48px',
                        WebkitBackfaceVisibility: 'hidden',
                        backfaceVisibility: 'hidden',
                        transform: 'translateZ(0)',
                        WebkitTransform: 'translateZ(0)',
                      }}
                    >
                      <Heart className="h-5 w-5 flex-shrink-0" />
                      <span>Sponsor on GitHub</span>
                    </a>

                    <a
                      href="https://wiiiimm.codes"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackClick('sponsor-section-wiiiimm-codes')
                      }
                      className="inline-flex items-center justify-center gap-2 border-2 border-primary text-foreground hover:bg-primary/10 font-semibold rounded-md bg-background transition-colors duration-200"
                      style={{ 
                        padding: '16px 32px',
                        minHeight: '48px',
                        WebkitBackfaceVisibility: 'hidden',
                        backfaceVisibility: 'hidden',
                        transform: 'translateZ(0)',
                        WebkitTransform: 'translateZ(0)',
                      }}
                    >
                      <Zap className="h-5 w-5 flex-shrink-0" />
                      <span>Visit wiiiimm.codes</span>
                    </a>
                  </div>

                  <div className="flex justify-center">
                    <a
                      href="https://github.com/wiiiimm/gh-manager-cli"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackClick('sponsor-section-github-feedback')
                      }
                      className="inline-flex items-center justify-center gap-2 text-muted-foreground hover:text-primary font-semibold rounded-md transition-colors duration-200"
                      style={{ 
                        padding: '16px 32px',
                        minHeight: '48px',
                        WebkitBackfaceVisibility: 'hidden',
                        backfaceVisibility: 'hidden',
                        transform: 'translateZ(0)',
                        WebkitTransform: 'translateZ(0)',
                      }}
                    >
                      <Github className="h-5 w-5 flex-shrink-0" />
                      <span>Leave Feedback & Contribute</span>
                    </a>
                  </div>

                  <p className="text-sm text-muted-foreground text-center">
                    Every contribution helps maintain and improve gh-manager-cli
                    and future open-source projects.
                  </p>
                </div>

                <p className="text-xl font-semibold text-center text-foreground">
                  Your support and contributions make a real difference.
                </p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <SiteFooter />
        </div>
      </div>
    </>
  );
}
