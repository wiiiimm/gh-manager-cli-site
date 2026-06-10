'use client';

import { Button } from '@/components/ui/button';
import { Github, Heart, Package } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { LogoMark } from '@/components/icons/logo-mark';
import { trackClick } from '@/lib/analytics';
import Link from 'next/link';

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="w-full sm:mx-auto md:max-w-7xl px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
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
        </Link>
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
            className="h-8 w-8 p-0 rounded-full transition-colors dark:hover:text-white"
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
            className="h-8 w-8 p-0 rounded-full transition-colors dark:hover:text-white"
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
            className="h-8 w-8 md:w-auto md:px-3 p-0 md:gap-2 rounded-full md:rounded-md bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0 transition-opacity duration-200 shadow-md flex items-center justify-center hover:opacity-80"
            asChild
          >
            <a
              href="https://github.com/sponsors/wiiiimm"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClick('header-github-sponsors-link')}
              className="flex items-center gap-2"
            >
              <Heart className="h-4 w-4 fill-white animate-pulse" />
              <span className="hidden md:inline">Sponsor</span>
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
