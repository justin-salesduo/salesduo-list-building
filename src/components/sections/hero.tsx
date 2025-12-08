"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export type CTAVariant = "quote" | "free-leads";

interface HeroProps {
  ctaVariant?: CTAVariant;
  onCTAClick?: () => void;
}

const painPoints = [
  "Data Manipulation",
  "Endless If-Else",
  "Countless Clay Columns",
  "Manual Data Sourcing",
  "Data Cleaning",
];

export function Hero({ ctaVariant = "quote", onCTAClick }: HeroProps) {
  const ctaText = "Start Free";
  const ctaSubtext = "First 500 rows included";

  return (
    <section className="min-h-[92vh] bg-background flex flex-col justify-center py-10">
      <div className="container-custom flex-1 flex flex-col justify-center">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <h1 className="mb-8 text-8xl md:text-9xl text-text-primary font-bold text-balance leading-tight">
            List building made easy
          </h1>

          {/* Subheadline */}
          <p className="mb-6 text-lg md:text-xl text-text-secondary max-w-3xl mx-auto text-balance leading-relaxed">
            Film a quick video of your list building process. Get a quote with
            sample data. Receive your complete dataset within 24-48 hours.
          </p>

          {/* CTAs */}
          <div className="flex flex-col items-center justify-center mb-6">
            <Button
              size="lg"
              onClick={onCTAClick}
              className="group w-full sm:w-auto px-8 py-6 text-base shadow-md hover:shadow-lg"
            >
              {ctaText}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            {/* Value Prop */}
            {ctaSubtext && (
              <span className="text-sm text-text-muted mt-2">{ctaSubtext}</span>
            )}
          </div>
        </div>
      </div>

      {/* Pain Points Pills - Scrolling at bottom */}
      <div className="container-custom">
        <p className="text-center text-sm text-text-muted mb-6 italic font-bold opacity-80">
          Say goodbye to:
        </p>
        <div className="relative overflow-hidden">
          <div className="flex gap-3 animate-scroll-left">
            {/* Duplicate array twice for seamless loop */}
            {[...painPoints, ...painPoints].map((point, index) => (
              <div
                key={index}
                className="inline-flex items-center px-4 py-2 bg-surface border border-border rounded-full text-sm whitespace-nowrap flex-shrink-0 opacity-80"
              >
                <span className="font-medium text-text-muted">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
