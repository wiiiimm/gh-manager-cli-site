'use client';

import { Heart } from 'lucide-react';
import { LogoMark } from '@/components/icons/logo-mark';
import { trackClick } from '@/lib/analytics';
import Link from 'next/link';

export function SiteFooter() {
  return (
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
                  href="/#installation"
                  className="text-muted-foreground hover:text-primary"
                  onClick={() =>
                    trackClick('footer-installation-guide-link')
                  }
                >
                  Installation Guide
                </a>
              </li>
              <li>
                <Link
                  href="/changelog"
                  className="text-muted-foreground hover:text-primary"
                  onClick={() => trackClick('footer-changelog-link')}
                >
                  Changelog
                </Link>
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
                  href="https://github.com/sponsors/wiiiimm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-8 py-1 rounded bg-gradient-to-r from-pink-500 to-purple-600 text-white transition-opacity duration-200 text-sm font-medium shadow-md hover:opacity-80"
                  onClick={() => trackClick('footer-github-sponsors-link')}
                >
                  <Heart className="h-4 w-4" />
                  Sponsor
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
  );
}
