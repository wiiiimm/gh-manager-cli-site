'use client';

import { useState, useRef } from 'react';
import { Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { track } from '@vercel/analytics';

interface HeroVideoProps {
  className?: string;
}

export function HeroVideo({ className = '' }: HeroVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handlePlayClick = () => {
    if (!showVideo) {
      // Track initial play button click (GIF to video transition)
      track('click', { target: 'hero-video-play-button' });
      setShowVideo(true);
      // Auto-play when video loads
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play();
          setIsPlaying(true);
        }
      }, 100);
    } else {
      // Track play/pause toggle clicks
      track('click', {
        target: isPlaying
          ? 'hero-video-pause-button'
          : 'hero-video-resume-button',
      });
      togglePlay();
    }
  };

  return (
    <div className={`relative max-w-4xl mx-auto ${className}`}>
      <div className="relative bg-black/5 dark:bg-black/20 rounded-lg overflow-hidden shadow-2xl border border-border/50">
        {!showVideo ? (
          // Poster/GIF Preview
          <div
            className="relative cursor-pointer group"
            onClick={handlePlayClick}
          >
            <img
              src="https://raw.githubusercontent.com/wiiiimm/gh-manager-cli-site/main/docs/app-demo.gif"
              alt="gh-manager-cli demo preview"
              className="w-full h-auto rounded-lg"
              loading="lazy"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-6 shadow-lg"
              >
                <Play className="h-8 w-8 ml-1" />
              </Button>
            </div>
            <div className="absolute bottom-4 left-4 bg-black/80 text-white px-3 py-1 rounded text-sm font-mono">
              Click to play full demo
            </div>
          </div>
        ) : (
          // Video Player
          <div className="relative">
            <video
              ref={videoRef}
              className="w-full h-auto"
              poster="https://raw.githubusercontent.com/wiiiimm/gh-manager-cli-site/main/docs/app-demo-poster.jpg"
              preload="metadata"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onLoadedData={() => setVideoLoaded(true)}
              controls
            >
              <source
                src="https://raw.githubusercontent.com/wiiiimm/gh-manager-cli-site/main/docs/app-demo-optimized.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>

            {/* Loading state */}
            {!videoLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="text-white font-mono">Loading video...</div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Video description */}
      <div className="mt-4 text-center">
        <p className="text-sm text-muted-foreground font-mono">
          Interactive demo showing repository browsing, search, and management
          features
        </p>
      </div>
    </div>
  );
}
