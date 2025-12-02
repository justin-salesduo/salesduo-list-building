'use client';

import { useState } from 'react';
import { Sparkles, TrendingUp, Zap } from 'lucide-react';

// Credit bundle pricing
const bundles = [
  { credits: 1000, price: 300, perCredit: 0.30, discount: '0%' },
  { credits: 5000, price: 1000, perCredit: 0.20, discount: '33%' },
  { credits: 10000, price: 1500, perCredit: 0.15, discount: '50%' },
  { credits: 25000, price: 3000, perCredit: 0.12, discount: '60%', popular: true },
  { credits: 50000, price: 5000, perCredit: 0.10, discount: '67%' },
  { credits: 100000, price: 8000, perCredit: 0.08, discount: '73%' },
  { credits: 250000, price: 15000, perCredit: 0.06, discount: '80%' },
];

// Calculate price based on credits
function calculatePrice(credits: number): { price: number; perCredit: number } {
  if (credits >= 250000) return { price: credits * 0.06, perCredit: 0.06 };
  if (credits >= 100000) return { price: credits * 0.08, perCredit: 0.08 };
  if (credits >= 50000) return { price: credits * 0.10, perCredit: 0.10 };
  if (credits >= 25000) return { price: credits * 0.12, perCredit: 0.12 };
  if (credits >= 10000) return { price: credits * 0.15, perCredit: 0.15 };
  if (credits >= 5000) return { price: credits * 0.20, perCredit: 0.20 };
  return { price: credits * 0.30, perCredit: 0.30 };
}

// Calculate expiry based on credit amount
function calculateExpiry(credits: number, price: number): number {
  if (credits >= 250000) return 12;
  if (credits >= 100000) return 12;
  if (credits >= 50000) return 9;
  if (credits >= 25000) return 6;
  if (credits >= 10000) return 3;
  if (credits >= 5000) return 2;
  return 1; // 1K credits
}

const leadTiers = [
  {
    name: 'Basic Lead',
    credits: '1',
    icon: Sparkles,
    dataPoints: ['Name, email', 'Company', 'LinkedIn profile', 'Job title'],
  },
  {
    name: 'Standard Lead',
    credits: '2-4',
    icon: TrendingUp,
    dataPoints: [
      'Everything in Basic',
      'Company size, industry, location',
      'Verified phone number',
      'Tech stack data',
    ],
    popular: true,
  },
  {
    name: 'Advanced Lead',
    credits: '4+',
    icon: Zap,
    dataPoints: [
      'Everything in Standard',
      'Custom data points (10+ fields)',
      'Recent activity signals',
      'Intent data',
      'Multi-source verification',
    ],
  },
];

export function Pricing() {
  const [selectedCredits, setSelectedCredits] = useState(25000);
  const { price, perCredit } = calculatePrice(selectedCredits);
  const expiryMonths = calculateExpiry(selectedCredits, price);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCredits(Number(e.target.value));
  };

  const handleBundleClick = (credits: number) => {
    setSelectedCredits(credits);
  };

  return (
    <section className="section-padding bg-background" id="pricing">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-text-primary font-bold mb-4">
            Credit-Based Pricing
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Flexible Pay As You Go. Up to 12 months credit expiry.
          </p>
        </div>

        {/* Interactive Credit Selector with Bundles */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calculator - Left Side (2 columns) */}
            <div className="lg:col-span-2">
              <div className="p-8 bg-surface border border-border rounded-lg h-full">
                <div className="mb-8">
                  <h3 className="text-center text-base font-semibold text-text-primary mb-6">
                    Select Credits
                  </h3>

                  {/* Slider */}
                  <input
                    type="range"
                    min="1000"
                    max="250000"
                    step="1000"
                    value={selectedCredits}
                    onChange={handleSliderChange}
                    className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-accent"
                  />

                  {/* Credit Amount Display */}
                  <div className="text-center mt-8">
                    <div className="text-5xl font-bold text-text-primary mb-2">
                      {selectedCredits.toLocaleString()} credits
                    </div>
                    <div className="text-3xl font-semibold text-accent mb-4">
                      ${price.toLocaleString()}
                    </div>
                    <div className="text-sm text-text-muted">
                      ${perCredit.toFixed(2)} per credit • Valid {expiryMonths} month{expiryMonths === 1 ? '' : 's'}
                    </div>
                  </div>
                </div>

                {/* Buy Button */}
                <button
                  className="w-full py-4 px-8 bg-cta text-white rounded-lg font-semibold text-lg hover:bg-cta-hover transition-colors shadow-sm hover:shadow-md"
                  onClick={() => {
                    window.location.href = '/upload';
                  }}
                >
                  Buy {selectedCredits.toLocaleString()} Credits
                </button>
              </div>
            </div>

            {/* Quick Select Bundles - Right Side (1 column) */}
            <div className="lg:col-span-1">
              <div className="p-6 bg-surface border border-border rounded-lg h-full flex flex-col">
                <h3 className="text-center text-base font-semibold text-text-primary mb-4">
                  Popular Bundles
                </h3>
                <div className="space-y-2">
                  {bundles.map((bundle) => {
                    const bundleExpiry = calculateExpiry(bundle.credits, bundle.price);
                    return (
                      <button
                        key={bundle.credits}
                        onClick={() => handleBundleClick(bundle.credits)}
                        className={`w-full p-3 rounded-lg border-2 transition-all hover:scale-105 relative ${
                          selectedCredits === bundle.credits
                            ? 'border-accent bg-background shadow-md'
                            : 'border-border bg-background hover:border-accent'
                        }`}
                      >
                        {bundle.popular && (
                          <span className="absolute -top-2 right-3 inline-flex items-center px-2 py-0.5 bg-accent text-white text-xs font-semibold rounded-full uppercase">
                            Most Popular
                          </span>
                        )}
                        <div className="flex items-baseline justify-between mb-1">
                          <div className="text-xl font-bold text-text-primary">
                            {bundle.credits.toLocaleString()}
                          </div>
                          <div className="text-base font-semibold text-text-primary">
                            ${bundle.price}
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-text-muted">
                            Valid {bundleExpiry} month{bundleExpiry === 1 ? '' : 's'}
                          </span>
                          {bundle.discount && (
                            <span className="text-accent font-medium">
                              Save {bundle.discount}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Credits-Per-Lead Tiers */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-semibold text-text-primary mb-4">
              How Credits Work
            </h3>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Credits per lead varies based on data complexity. Our AI agent analyzes
              your requirements to provide an exact quote.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {leadTiers.map((tier) => {
              // Calculate leads based on tier credits
              let estimatedLeads = 0;
              let creditsPerLead = 1;
              if (tier.credits === '1') {
                estimatedLeads = selectedCredits;
                creditsPerLead = 1;
              } else if (tier.credits === '2-4') {
                estimatedLeads = Math.floor(selectedCredits / 3);
                creditsPerLead = 3;
              } else if (tier.credits === '4+') {
                estimatedLeads = Math.floor(selectedCredits / 5);
                creditsPerLead = 5;
              }

              // Calculate cost per lead
              const costPerLead = perCredit * creditsPerLead;

              return (
                <div
                  key={tier.name}
                  className={`p-6 rounded-lg border-2 relative ${
                    tier.popular
                      ? 'border-accent bg-surface shadow-md'
                      : 'border-border bg-background'
                  }`}
                >
                  {tier.popular && (
                    <span className="absolute -top-3 right-4 inline-flex items-center gap-1 px-3 py-1 bg-accent text-white text-xs font-semibold rounded-full uppercase">
                      Most Common
                    </span>
                  )}

                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 flex items-center justify-center bg-background border border-border rounded-lg">
                      <tier.icon className="w-6 h-6 text-text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-text-primary">
                        {tier.name}
                      </h4>
                      <div className="text-sm text-accent font-medium">
                        {tier.credits} {tier.credits === '1' ? 'credit' : 'credits'}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4 p-3 bg-background rounded-lg border border-border">
                    <div className="text-sm text-text-secondary">
                      {selectedCredits.toLocaleString()} Credits ~ <span className="font-semibold text-text-primary">{estimatedLeads.toLocaleString()} leads</span>
                    </div>
                    <div className="text-xs text-text-muted mt-1">
                      ~${costPerLead.toFixed(2)} per lead
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {tier.dataPoints.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2 text-sm text-text-secondary"
                      >
                        <span className="text-text-primary mt-0.5">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <p className="text-center text-sm text-text-muted mt-8 max-w-2xl mx-auto">
            Our AI agent determines exact credits per lead by analyzing your
            requirements and data complexity.
          </p>
        </div>
      </div>
    </section>
  );
}
