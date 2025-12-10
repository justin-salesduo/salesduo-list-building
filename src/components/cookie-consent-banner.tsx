'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const CONSENT_KEY = 'salesduo-cookie-consent';

type ConsentValue = 'accepted' | 'rejected' | null;

export function CookieConsentBanner() {
  const [consent, setConsent] = useState<ConsentValue>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    if (typeof window !== 'undefined') {
      const storedConsent = localStorage.getItem(CONSENT_KEY) as ConsentValue;
      setConsent(storedConsent);

      // Only show banner if no consent decision has been made
      if (!storedConsent) {
        // Small delay to avoid layout shift on page load
        const timer = setTimeout(() => setIsVisible(true), 500);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleAccept = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(CONSENT_KEY, 'accepted');
      setConsent('accepted');
      setIsVisible(false);
    }
  };

  const handleReject = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(CONSENT_KEY, 'rejected');
      setConsent('rejected');
      setIsVisible(false);
    }
  };

  // Don't render if consent has been given or user is in SSR
  if (consent || !isVisible) {
    return null;
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 h-12 bg-surface/95 backdrop-blur-sm border-t border-border shadow-lg animate-in slide-in-from-bottom duration-300"
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent banner"
    >
      <div className="flex items-center justify-between h-full px-6 max-w-full">
        {/* Message */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <p className="text-xs text-foreground/70 truncate">
            <span className="font-medium text-foreground">Privacy:</span> We use essential cookies only.{' '}
            <Link
              href="/privacy"
              className="text-primary hover:underline font-medium whitespace-nowrap"
            >
              Learn more →
            </Link>
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 ml-4 shrink-0">
          <Button
            onClick={handleReject}
            variant="secondary"
            size="sm"
            className="h-7 text-xs px-3"
          >
            Reject
          </Button>
          <Button
            onClick={handleAccept}
            size="sm"
            className="h-6 text-xs px-1 py-0"
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
