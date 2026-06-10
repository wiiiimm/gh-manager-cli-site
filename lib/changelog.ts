const CHANGELOG_URL =
  'https://raw.githubusercontent.com/wiiiimm/gh-manager-cli/main/CHANGELOG.md';

const REPO_URL = 'https://github.com/wiiiimm/gh-manager-cli';

// Hourly background regeneration via ISR — keeps the page in sync with
// upstream releases without webhooks or manual rebuilds
export const CHANGELOG_REVALIDATE_SECONDS = 3600;

export type ChangelogSegment =
  | { type: 'text'; value: string }
  | { type: 'strong'; value: string }
  | { type: 'link'; label: string; href: string };

export interface ChangelogItem {
  segments: ChangelogSegment[];
}

export interface ChangelogSection {
  title: string;
  items: ChangelogItem[];
}

export interface ChangelogEntry {
  version: string;
  date: string;
  compareUrl?: string;
  releaseUrl: string;
  sections: ChangelogSection[];
  isMajorOrMinor: boolean;
}

// Matches semantic-release version headings, with or without a compare link:
//   ## [1.52.4](https://.../compare/v1.52.3...v1.52.4) (2026-06-10)
//   # 1.0.0 (2025-09-01)
const VERSION_HEADING =
  /^#{1,2}\s+(?:\[([\d][\w.-]*)\]\((\S+)\)|([\d][\w.-]*))\s+\((\d{4}-\d{2}-\d{2})\)/;

const SECTION_HEADING = /^###\s+(.+?)\s*$/;

const LIST_ITEM = /^\*\s+(.*)$/;

// CI artifact occasionally left in PR titles — pure noise for readers
const NOISE = /\s*\[semantic pr title\]/gi;

function parseInline(text: string): ChangelogSegment[] {
  const segments: ChangelogSegment[] = [];
  const token = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = token.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: 'text', value: text.slice(lastIndex, match.index) });
    }
    if (match[1] !== undefined) {
      segments.push({ type: 'link', label: match[1], href: match[2] });
    } else {
      segments.push({ type: 'strong', value: match[3] });
    }
    lastIndex = token.lastIndex;
  }
  if (lastIndex < text.length) {
    segments.push({ type: 'text', value: text.slice(lastIndex) });
  }
  return segments;
}

export function parseChangelog(markdown: string): ChangelogEntry[] {
  const entries: ChangelogEntry[] = [];
  let entry: ChangelogEntry | null = null;
  let section: ChangelogSection | null = null;

  for (const line of markdown.split('\n')) {
    const versionMatch = line.match(VERSION_HEADING);
    if (versionMatch) {
      const version = versionMatch[1] ?? versionMatch[3];
      entry = {
        version,
        date: versionMatch[4],
        compareUrl: versionMatch[2],
        releaseUrl: `${REPO_URL}/releases/tag/v${version}`,
        sections: [],
        isMajorOrMinor: /^\d+\.\d+\.0$/.test(version),
      };
      entries.push(entry);
      section = null;
      continue;
    }

    const sectionMatch = line.match(SECTION_HEADING);
    if (sectionMatch && entry) {
      section = { title: sectionMatch[1], items: [] };
      entry.sections.push(section);
      continue;
    }

    const itemMatch = line.match(LIST_ITEM);
    if (itemMatch && section) {
      section.items.push({
        segments: parseInline(itemMatch[1].replace(NOISE, '')),
      });
    }
  }

  return entries;
}

export async function getChangelog(): Promise<ChangelogEntry[]> {
  const res = await fetch(CHANGELOG_URL, {
    next: { revalidate: CHANGELOG_REVALIDATE_SECONDS },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch changelog: ${res.status}`);
  }
  return parseChangelog(await res.text());
}
