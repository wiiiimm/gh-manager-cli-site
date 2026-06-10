import type { Metadata } from 'next';
import {
  Bug,
  ExternalLink,
  GitCompare,
  Github,
  Rocket,
  Sparkles,
  Zap,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import {
  CHANGELOG_REVALIDATE_SECONDS,
  getChangelog,
  type ChangelogEntry,
  type ChangelogItem,
  type ChangelogSection,
} from '@/lib/changelog';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Changelog - gh-manager-cli | Release Notes & Version History',
  description:
    'Every gh-manager-cli release — new features, bug fixes, and performance improvements for the terminal GitHub repository manager.',
  alternates: {
    canonical: '/changelog',
  },
  openGraph: {
    title: 'Changelog - gh-manager-cli',
    description:
      'Every gh-manager-cli release — new features, bug fixes, and performance improvements.',
    url: 'https://gh-manager-cli.dev/changelog',
    siteName: 'gh-manager-cli',
    type: 'website',
  },
};

const SECTION_STYLES: Record<
  string,
  { icon: typeof Sparkles; className: string }
> = {
  Features: {
    icon: Sparkles,
    className: 'bg-primary/10 text-primary border-primary/20',
  },
  'Bug Fixes': {
    icon: Bug,
    className:
      'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  },
  'Performance Improvements': {
    icon: Zap,
    className:
      'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20',
  },
};

const DEFAULT_SECTION_STYLE = {
  icon: Rocket,
  className: 'bg-muted text-muted-foreground border-border',
};

function formatDate(iso: string) {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

function ItemText({ item }: { item: ChangelogItem }) {
  return (
    <>
      {item.segments.map((segment, i) => {
        if (segment.type === 'link') {
          return (
            <a
              key={i}
              href={segment.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary/80 hover:text-primary hover:underline"
            >
              {segment.label}
            </a>
          );
        }
        if (segment.type === 'strong') {
          return (
            <span key={i} className="font-semibold text-foreground">
              {segment.value}
            </span>
          );
        }
        return <span key={i}>{segment.value}</span>;
      })}
    </>
  );
}

function Section({ section }: { section: ChangelogSection }) {
  const style = SECTION_STYLES[section.title] ?? DEFAULT_SECTION_STYLE;
  const Icon = style.icon;
  return (
    <div>
      <Badge
        variant="outline"
        className={`mb-3 font-mono ${style.className}`}
      >
        <Icon className="h-3 w-3" />
        {section.title}
      </Badge>
      <ul className="space-y-2">
        {section.items.map((item, i) => (
          <li
            key={i}
            className="text-sm font-mono text-muted-foreground leading-relaxed pl-4 relative before:content-['▸'] before:absolute before:left-0 before:text-primary/60"
          >
            <ItemText item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Entry({ entry, isLatest }: { entry: ChangelogEntry; isLatest: boolean }) {
  return (
    <article className="relative pl-8 sm:pl-10 pb-12 last:pb-0">
      {/* Timeline rail and node */}
      <span
        aria-hidden
        className="absolute left-[5px] top-2 bottom-0 w-px bg-border"
      />
      <span
        aria-hidden
        className={`absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full border-2 ${
          entry.isMajorOrMinor || isLatest
            ? 'bg-primary border-primary'
            : 'bg-background border-border'
        }`}
      />

      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-4">
        <h2 className="text-lg sm:text-xl font-bold font-mono">
          <a
            href={entry.releaseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            v{entry.version}
          </a>
        </h2>
        {isLatest && (
          <Badge className="font-mono text-[10px] uppercase tracking-wider">
            Latest
          </Badge>
        )}
        {entry.isMajorOrMinor && !isLatest && (
          <Badge
            variant="secondary"
            className="font-mono text-[10px] uppercase tracking-wider bg-primary/10 text-primary"
          >
            Feature release
          </Badge>
        )}
        <time
          dateTime={entry.date}
          className="text-xs sm:text-sm text-muted-foreground font-mono"
        >
          {formatDate(entry.date)}
        </time>
        <span className="flex items-center gap-3 text-xs font-mono">
          <a
            href={entry.releaseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
          >
            <ExternalLink className="h-3 w-3" />
            Release
          </a>
          {entry.compareUrl && (
            <a
              href={entry.compareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
            >
              <GitCompare className="h-3 w-3" />
              Diff
            </a>
          )}
        </span>
      </div>

      <div className="space-y-5">
        {entry.sections.map((section) => (
          <Section key={section.title} section={section} />
        ))}
      </div>
    </article>
  );
}

export default async function ChangelogPage() {
  let entries: ChangelogEntry[] = [];
  let failed = false;
  try {
    entries = await getChangelog();
  } catch {
    failed = true;
  }

  return (
    <>
      <SiteHeader />

      <div className="min-h-screen">
        <main className="py-16 sm:py-20 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 w-full max-w-3xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <Badge
              variant="secondary"
              className="mb-6 bg-muted text-primary font-mono"
            >
              {'>'} git log --oneline
            </Badge>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 font-mono">
              Changelog
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg font-mono max-w-2xl mx-auto">
              Every release of gh-manager-cli, fresh from{' '}
              <a
                href="https://github.com/wiiiimm/gh-manager-cli/releases"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                GitHub Releases
              </a>
              . Updated automatically — refreshed at most every{' '}
              {CHANGELOG_REVALIDATE_SECONDS / 60} minutes.
            </p>
          </div>

          {failed ? (
            <div className="text-center border border-border rounded-lg bg-card p-8">
              <p className="font-mono text-muted-foreground mb-4">
                Couldn&apos;t load the changelog right now.
              </p>
              <a
                href="https://github.com/wiiiimm/gh-manager-cli/blob/main/CHANGELOG.md"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-primary hover:underline"
              >
                <Github className="h-4 w-4" />
                View it on GitHub instead
              </a>
            </div>
          ) : (
            <div>
              {entries.map((entry, i) => (
                <Entry key={entry.version} entry={entry} isLatest={i === 0} />
              ))}
            </div>
          )}
        </main>

        <SiteFooter />
      </div>
    </>
  );
}
