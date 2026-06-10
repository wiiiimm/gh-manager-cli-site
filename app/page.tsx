import { HomePage } from '@/components/home-page';
import { getChangelog, type ChangelogEntry } from '@/lib/changelog';

export const revalidate = 3600;

export default async function Page() {
  let recentEntries: ChangelogEntry[] = [];
  try {
    recentEntries = (await getChangelog()).slice(0, 5);
  } catch {
    // Changelog unavailable — the What's New section simply doesn't render
  }
  return <HomePage recentEntries={recentEntries} />;
}
