'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Hero, type CTAVariant } from '@/components/sections/hero';
import { Backstory } from '@/components/sections/backstory';
import { ThreeSteps } from '@/components/sections/three-steps';
import { SampleOutput } from '@/components/sections/sample-output';
import { Pricing } from '@/components/sections/pricing';
import { FinalCTA } from '@/components/sections/final-cta';
import { Footer } from '@/components/footer';

export default function LandingPage() {
  const router = useRouter();

  // A/B testing variant - can be controlled via URL param or random assignment
  const [ctaVariant] = useState<CTAVariant>(() => {
    // Check URL param first
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const variant = params.get('variant');
      if (variant === 'quote' || variant === 'free-leads') {
        return variant;
      }
    }

    // Default to 'quote' for now - can be randomized later
    // return Math.random() > 0.5 ? 'quote' : 'free-leads';
    return 'quote';
  });

  const handleCTAClick = () => {
    // Navigate to upload page
    router.push('/upload');
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <Hero ctaVariant={ctaVariant} onCTAClick={handleCTAClick} />
        <Backstory />
        <ThreeSteps />
        <SampleOutput />
        <Pricing />
        <FinalCTA ctaVariant={ctaVariant} onCTAClick={handleCTAClick} />
        <Footer />
      </main>
    </>
  );
}
