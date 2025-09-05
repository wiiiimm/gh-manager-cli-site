'use client';

import { useState, useEffect } from 'react';

interface NpmStatsProps {
  packageName: string;
  className?: string;
}

interface NpmStatsData {
  weekly: number;
  monthly: number;
  total: number;
  version: string;
}

export default function NpmStats({
  packageName,
  className = '',
}: NpmStatsProps) {
  const [stats, setStats] = useState<NpmStatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch package info and downloads in parallel
        const [packageResponse, weeklyResponse] = await Promise.all([
          fetch(`https://registry.npmjs.org/${packageName}`),
          fetch(
            `https://api.npmjs.org/downloads/point/last-week/${packageName}`
          ),
        ]);

        if (!packageResponse.ok || !weeklyResponse.ok) {
          throw new Error('Failed to fetch npm data');
        }

        const packageData = await packageResponse.json();
        const weeklyData = await weeklyResponse.json();

        // Fetch monthly and total downloads
        const [monthlyResponse, totalResponse] = await Promise.all([
          fetch(
            `https://api.npmjs.org/downloads/point/last-month/${packageName}`
          ),
          fetch(
            `https://api.npmjs.org/downloads/point/2020-01-01:${
              new Date().toISOString().split('T')[0]
            }/${packageName}`
          ),
        ]);

        const monthlyData = await monthlyResponse.json();
        const totalData = await totalResponse.json();

        setStats({
          weekly: weeklyData.downloads || 0,
          monthly: monthlyData.downloads || 0,
          total: totalData.downloads || 0,
          version: packageData['dist-tags']?.latest || 'unknown',
        });
      } catch (err) {
        console.error('Error fetching npm stats:', err);
        setError('Failed to load download statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [packageName]);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  if (loading) {
    return (
      <div className={`flex items-center space-x-4 ${className}`}>
        <div className="animate-pulse bg-muted rounded px-3 py-1 h-8 w-20"></div>
        <div className="animate-pulse bg-muted rounded px-3 py-1 h-8 w-20"></div>
        <div className="animate-pulse bg-muted rounded px-3 py-1 h-8 w-20"></div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className={`flex items-center space-x-4 ${className}`}>
        <a
          href={`https://www.npmjs.com/package/${packageName}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-3 py-1 rounded-md bg-red-100 text-red-800 text-sm font-mono hover:bg-red-200 transition-colors"
        >
          <img
            src="https://badgen.net/npm/dw/gh-manager-cli"
            alt="weekly downloads"
            className="h-6"
          />
        </a>
        <a
          href={`https://www.npmjs.com/package/${packageName}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-3 py-1 rounded-md bg-red-100 text-red-800 text-sm font-mono hover:bg-red-200 transition-colors"
        >
          <img
            src="https://badgen.net/npm/dm/gh-manager-cli"
            alt="monthly downloads"
            className="h-6"
          />
        </a>
        <a
          href={`https://www.npmjs.com/package/${packageName}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-3 py-1 rounded-md bg-red-100 text-red-800 text-sm font-mono hover:bg-red-200 transition-colors"
        >
          <img
            src="https://badgen.net/npm/dt/gh-manager-cli"
            alt="total downloads"
            className="h-6"
          />
        </a>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      <a
        href={`https://www.npmjs.com/package/${packageName}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-3 py-1 rounded-md bg-green-100 text-green-800 text-sm font-mono hover:bg-green-200 transition-colors dark:bg-green-900 dark:text-green-200 dark:hover:bg-green-800"
      >
        <span className="mr-1">📦</span>
        {formatNumber(stats.weekly)}/week
      </a>
      <a
        href={`https://www.npmjs.com/package/${packageName}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-3 py-1 rounded-md bg-blue-100 text-blue-800 text-sm font-mono hover:bg-blue-200 transition-colors dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800"
      >
        <span className="mr-1">📈</span>
        {formatNumber(stats.monthly)}/month
      </a>
      <a
        href={`https://www.npmjs.com/package/${packageName}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-3 py-1 rounded-md bg-purple-100 text-purple-800 text-sm font-mono hover:bg-purple-200 transition-colors dark:bg-purple-900 dark:text-purple-200 dark:hover:bg-purple-800"
      >
        <span className="mr-1">🏆</span>
        {formatNumber(stats.total)} total
      </a>
    </div>
  );
}
