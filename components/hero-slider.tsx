'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Play,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackClick } from '@/lib/analytics';

const DEMO_GIF =
  'https://raw.githubusercontent.com/wiiiimm/gh-manager-cli-site/main/docs/app-demo.gif';
const DEMO_POSTER =
  'https://raw.githubusercontent.com/wiiiimm/gh-manager-cli-site/main/docs/app-demo-poster.jpg';
const DEMO_VIDEO =
  'https://raw.githubusercontent.com/wiiiimm/gh-manager-cli-site/main/docs/app-demo-optimized.mp4';

type Slide =
  | { id: string; kind: 'video'; caption: string }
  | {
      id: string;
      kind: 'image';
      /** Drop a real screenshot path here (e.g. "/screenshots/bulk-select.png") to replace the placeholder. */
      src?: string;
      label: string;
      alt: string;
      caption: string;
    };

// Add / reorder slides here. Image slides render a styled placeholder until
// you set `src` to a real screenshot path under /public.
const SLIDES: Slide[] = [
  {
    id: 'demo',
    kind: 'video',
    caption: 'Interactive demo — browse, search, and manage repositories',
  },
  {
    id: 'bulk-select',
    kind: 'image',
    label: 'Bulk Select mode',
    alt: 'gh-manager-cli Bulk Select mode acting on multiple repositories',
    caption: 'Bulk Select — archive, delete, or transfer dozens of repos at once',
  },
  {
    id: 'fuzzy-search',
    kind: 'image',
    label: 'Fuzzy search',
    alt: 'gh-manager-cli instant fuzzy search across the whole account',
    caption: 'Instant fuzzy search across your entire cached account',
  },
  {
    id: 'fork-sync',
    kind: 'image',
    label: 'Fork tracking & sync',
    alt: 'gh-manager-cli fork tracking with ahead/behind commit counts',
    caption: 'Fork tracking with ahead/behind counts and one-key sync',
  },
  {
    id: 'transfer',
    kind: 'image',
    label: 'Repository transfer',
    alt: 'gh-manager-cli repository transfer destination picker',
    caption: 'Transfer repositories to another owner or organisation',
  },
];

interface HeroSliderProps {
  className?: string;
}

function TerminalChrome({ title }: { title: string }) {
  return (
    <div className="bg-muted border-b border-border px-3 py-2 flex items-center gap-2 shrink-0">
      <div className="w-3 h-3 rounded-full bg-red-500" />
      <div className="w-3 h-3 rounded-full bg-yellow-500" />
      <div className="w-3 h-3 rounded-full bg-green-500" />
      <span className="text-xs text-muted-foreground font-mono ml-2 truncate">
        {title}
      </span>
    </div>
  );
}

export function HeroSlider({ className = '' }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const count = SLIDES.length;

  const goTo = useCallback(
    (index: number) => {
      const next = (index + count) % count;
      setCurrent(next);
      // Pause the demo video when navigating away from it
      if (next !== 0 && videoRef.current) {
        videoRef.current.pause();
      }
    },
    [count]
  );

  const next = useCallback(() => {
    trackClick('hero-slider-next');
    goTo(current + 1);
  }, [current, goTo]);

  const prev = useCallback(() => {
    trackClick('hero-slider-prev');
    goTo(current - 1);
  }, [current, goTo]);

  const handlePlay = () => {
    trackClick('hero-video-play-button');
    setShowVideo(true);
    setTimeout(() => videoRef.current?.play(), 100);
  };

  // Keyboard navigation when the slider is focused
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      next();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prev();
    }
  };

  useEffect(() => {
    // Reset the video preview when leaving the first slide
    if (current !== 0) setShowVideo(false);
  }, [current]);

  const activeCaption = SLIDES[current].caption;

  return (
    <div className={`relative max-w-2xl mx-auto ${className}`}>
      <div
        className="relative rounded-lg overflow-hidden shadow-2xl border border-border/50 bg-terminal-bg outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
        role="region"
        aria-roledescription="carousel"
        aria-label="Product screenshots"
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        {/* Track */}
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {SLIDES.map((slide, i) => (
            <div
              key={slide.id}
              className="w-full shrink-0 basis-full"
              aria-hidden={i !== current}
            >
              {slide.kind === 'video' ? (
                <div className="aspect-video w-full bg-black flex items-center justify-center">
                  {!showVideo ? (
                    <button
                      type="button"
                      onClick={handlePlay}
                      className="relative w-full h-full group cursor-pointer"
                      aria-label="Play full demo"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={DEMO_GIF}
                        alt="gh-manager-cli demo preview"
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                      <span className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                        <span className="bg-primary group-hover:bg-primary/90 text-primary-foreground rounded-full p-5 shadow-lg flex">
                          <Play className="h-7 w-7 ml-1" />
                        </span>
                      </span>
                      <span className="absolute bottom-4 left-4 bg-black/80 text-white px-3 py-1 rounded text-sm font-mono">
                        Click to play full demo
                      </span>
                    </button>
                  ) : (
                    <video
                      ref={videoRef}
                      className="w-full h-full object-contain"
                      poster={DEMO_POSTER}
                      preload="metadata"
                      controls
                    >
                      <source src={DEMO_VIDEO} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              ) : slide.src ? (
                <div className="aspect-video w-full bg-terminal-bg flex flex-col">
                  <TerminalChrome title={slide.label} />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    className="w-full flex-1 object-contain min-h-0"
                    loading="lazy"
                  />
                </div>
              ) : (
                // Placeholder until a real screenshot is supplied
                <div className="aspect-video w-full bg-terminal-bg flex flex-col">
                  <TerminalChrome title={slide.label} />
                  <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-dashed border-primary/40 text-primary/70">
                      <ImageIcon className="h-6 w-6" />
                    </div>
                    <div className="font-mono text-sm sm:text-base text-foreground">
                      {slide.label}
                    </div>
                    <div className="font-mono text-xs text-muted-foreground">
                      Screenshot coming soon
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Prev / Next controls */}
        {count > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous screenshot"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm border border-border/50 text-muted-foreground hover:text-foreground hover:bg-background transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next screenshot"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm border border-border/50 text-muted-foreground hover:text-foreground hover:bg-background transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {/* Dot indicators */}
      {count > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => {
                trackClick(`hero-slider-dot-${slide.id}`);
                goTo(i);
              }}
              aria-label={`Go to ${
                slide.kind === 'video' ? 'demo' : slide.label
              }`}
              aria-current={i === current}
              className={`h-2 rounded-full transition-all ${
                i === current
                  ? 'w-6 bg-primary'
                  : 'w-2 bg-border hover:bg-primary/50'
              }`}
            />
          ))}
        </div>
      )}

      {/* Active caption */}
      <div className="mt-3 text-center">
        <p className="text-sm text-muted-foreground font-mono">
          {activeCaption}
        </p>
      </div>
    </div>
  );
}
