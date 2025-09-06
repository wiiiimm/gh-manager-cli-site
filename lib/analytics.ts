'use client';

import { track as vercelTrack } from '@vercel/analytics';

// Type definitions for event tracking
export interface AnalyticsEventData {
  [key: string]: string | number | boolean | undefined;
}

// Helper function to send events to Google Analytics
const sendGoogleAnalyticsEvent = (
  eventName: string,
  eventData?: AnalyticsEventData
) => {
  // Check if gtag is available (Google Analytics is loaded)
  if (typeof window !== 'undefined' && window.gtag) {
    // Convert the event data to GA4 format
    const gaEventData: { [key: string]: any } = {};

    if (eventData) {
      Object.entries(eventData).forEach(([key, value]) => {
        // Convert keys to snake_case as recommended by GA4
        const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
        gaEventData[snakeKey] = value;
      });
    }

    // Send event to Google Analytics
    window.gtag('event', eventName, gaEventData);
  }
};

/**
 * Tracks events to both Vercel Analytics and Google Analytics
 * @param eventName - Name of the event (e.g., 'click', 'theme_usage')
 * @param eventData - Additional data to track with the event
 */
export const track = (eventName: string, eventData?: AnalyticsEventData) => {
  // Track with Vercel Analytics (existing implementation)
  vercelTrack(eventName, eventData);

  // Track with Google Analytics
  sendGoogleAnalyticsEvent(eventName, eventData);
};

/**
 * Tracks click events specifically with consistent naming
 * @param target - The target element or action being clicked
 * @param additionalData - Any additional event data
 */
export const trackClick = (
  target: string,
  additionalData?: AnalyticsEventData
) => {
  track('click', { target, ...additionalData });
};

/**
 * Tracks theme usage events
 * @param themeData - Theme-related data to track
 */
export const trackThemeUsage = (themeData: {
  themeVariant: string;
  userSetTheme: string;
  resolvedTheme: string;
  isSystemPreference: boolean;
}) => {
  track('theme_usage', themeData);
};

// Extend the Window interface for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}
