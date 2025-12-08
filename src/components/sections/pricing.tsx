"use client";

import { useState } from "react";
import { Sparkles, TrendingUp, Zap } from "lucide-react";
import { CostBreakdown } from "./cost-breakdown";

// Credit bundle pricing - base prices
const bundles = [
  { credits: 10000, price: 300, perCredit: 0.03, expiry: 1 },
  { credits: 40000, price: 1000, perCredit: 0.025, expiry: 2 },
  { credits: 70000, price: 1500, perCredit: 0.0214, expiry: 3 },
  { credits: 150000, price: 3000, perCredit: 0.02, expiry: 6, popular: true },
  { credits: 300000, price: 5000, perCredit: 0.0167, expiry: 6 },
  { credits: 500000, price: 8000, perCredit: 0.016, expiry: 8 },
  { credits: 1000000, price: 14000, perCredit: 0.014, expiry: 12 },
];

// Calculate price based on credits
function calculatePrice(
  credits: number,
  isLifetime: boolean = false,
): { price: number; perCredit: number } {
  let basePrice = 0;
  let basePerCredit = 0;

  if (credits >= 1000000) {
    basePrice = credits * 0.014;
    basePerCredit = 0.014;
  } else if (credits >= 500000) {
    basePrice = credits * 0.016;
    basePerCredit = 0.016;
  } else if (credits >= 300000) {
    basePrice = credits * 0.0167;
    basePerCredit = 0.0167;
  } else if (credits >= 150000) {
    basePrice = credits * 0.02;
    basePerCredit = 0.02;
  } else if (credits >= 70000) {
    basePrice = credits * 0.0214;
    basePerCredit = 0.0214;
  } else if (credits >= 40000) {
    basePrice = credits * 0.025;
    basePerCredit = 0.025;
  } else {
    basePrice = credits * 0.03;
    basePerCredit = 0.03;
  }

  // Apply 15% premium for lifetime
  if (isLifetime) {
    basePrice = basePrice * 1.15;
    basePerCredit = basePerCredit * 1.15;
  }

  return { price: Math.round(basePrice), perCredit: basePerCredit };
}

// Calculate expiry based on credit amount
function calculateExpiry(credits: number): number {
  if (credits >= 1000000) return 12;
  if (credits >= 500000) return 8;
  if (credits >= 150000) return 6;
  if (credits >= 70000) return 3;
  if (credits >= 40000) return 2;
  return 1;
}

const leadTiers = [
  {
    name: "Basic Lead",
    credits: "1",
    icon: Sparkles,
    dataPoints: ["Name, email", "Company", "LinkedIn profile", "Job title"],
  },
  {
    name: "Standard Lead",
    credits: "2-4",
    icon: TrendingUp,
    dataPoints: [
      "Everything in Basic",
      "Company size, industry, location",
      "Verified phone number",
      "Tech stack data",
    ],
    popular: true,
  },
  {
    name: "Advanced Lead",
    credits: "4+",
    icon: Zap,
    dataPoints: [
      "Everything in Standard",
      "Custom data points (10+ fields)",
      "Recent activity signals",
      "Intent data",
      "Multi-source verification",
    ],
  },
];

export function Pricing() {
  const [selectedCredits, setSelectedCredits] = useState(150000);
  const [isLifetime, setIsLifetime] = useState(false);
  const { price, perCredit } = calculatePrice(selectedCredits, isLifetime);
  const expiryMonths = calculateExpiry(selectedCredits);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCredits(Number(e.target.value));
  };

  const handleBundleClick = (credits: number) => {
    setSelectedCredits(credits);
  };

  return (
    <>
      <section className="py-12 bg-background" id="pricing">
        <div className="container-custom">
          {/* Section Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-text-primary mb-3">
              Credit-Based Pricing
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Flexible Pay What You Need.
            </p>
          </div>

        {/* Lifetime Toggle */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 p-1 bg-surface border border-border rounded-lg">
            <button
              onClick={() => setIsLifetime(false)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                !isLifetime
                  ? "bg-accent text-white shadow-sm"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              <div className="flex flex-col items-center">
                <span>Regular</span>
                <span
                  className={`text-[10px] mt-0.5 ${!isLifetime ? "text-white/80" : "text-text-muted"}`}
                >
                  Credits expire 1-12 months
                </span>
              </div>
            </button>
            <button
              onClick={() => setIsLifetime(true)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                isLifetime
                  ? "bg-accent text-white shadow-sm"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              <div className="flex flex-col items-center">
                <span>Lifetime</span>
                <span
                  className={`text-[10px] mt-0.5 ${isLifetime ? "text-white/80" : "text-text-muted"}`}
                >
                  Credits never expire (+15%)
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Interactive Credit Selector with Bundles */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Quick Select Bundles - Left Side */}
            <div>
              <div className="p-4 bg-surface border border-border rounded-lg h-full">
                <h3 className="text-center text-sm font-semibold text-text-primary mb-3">
                  Popular Packages
                </h3>
                <div className="flex flex-col gap-2">
                  {bundles.map((bundle) => {
                    const displayPrice = isLifetime
                      ? Math.round(bundle.price * 1.15)
                      : bundle.price;
                    const displayPerCredit = isLifetime
                      ? (bundle.perCredit * 1.15).toFixed(4)
                      : bundle.perCredit.toFixed(4);
                    const expiryText = isLifetime
                      ? "Never expires"
                      : `Expire in ${bundle.expiry}mo`;

                    return (
                      <button
                        key={bundle.credits}
                        onClick={() => handleBundleClick(bundle.credits)}
                        className={`p-3 rounded-lg border-2 transition-all hover:scale-[1.02] relative ${
                          selectedCredits === bundle.credits
                            ? "border-accent bg-background shadow-md"
                            : "border-border bg-background hover:border-accent"
                        }`}
                      >
                        {bundle.popular && (
                          <span className="absolute -top-2 right-2 inline-flex items-center px-2 py-0.5 bg-accent text-white text-[10px] font-semibold rounded-full uppercase">
                            Popular
                          </span>
                        )}
                        <div className="flex items-baseline justify-between mb-1">
                          <div className="text-lg font-bold text-text-primary">
                            {bundle.credits.toLocaleString()}
                          </div>
                          <div className="text-base font-semibold text-text-primary">
                            ${displayPrice.toLocaleString()}
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-text-muted">
                          <span>{expiryText}</span>
                          <span>${displayPerCredit}/cr</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Calculator - Right Side */}
            <div>
              <div className="p-4 bg-surface border border-border rounded-lg h-full flex flex-col">
                <h3 className="text-center text-sm font-semibold text-text-primary mb-3">
                  Pay As You Go
                </h3>

                {/* Centered Slider Section */}
                <div className="flex-1 flex flex-col justify-center py-8">
                  {/* Credit Amount Display Above Slider */}
                  <div className="text-center mb-6">
                    <div className="flex items-baseline justify-center gap-2">
                      <div className="text-5xl font-bold text-text-primary">
                        {selectedCredits.toLocaleString()}
                      </div>
                      <div className="text-sm text-text-muted">credits</div>
                    </div>
                  </div>

                  {/* Slider */}
                  <input
                    type="range"
                    min="10000"
                    max="1000000"
                    step="10000"
                    value={selectedCredits}
                    onChange={handleSliderChange}
                    className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-accent mb-8"
                  />

                  {/* Pricing Details */}
                  <div className="text-center">
                    <div className="text-4xl font-bold text-accent mb-3">
                      ${price.toLocaleString()}
                    </div>
                    <div className="text-sm text-text-muted mb-3">
                      ${perCredit.toFixed(4)} per credit
                    </div>
                    <div className="text-base text-text-secondary font-medium">
                      {isLifetime
                        ? "Credits never expire"
                        : `Credits expire in ${expiryMonths} month${expiryMonths === 1 ? "" : "s"}`}
                    </div>
                  </div>
                </div>

                {/* Buy Button */}
                <button
                  className="w-full py-3 px-4 bg-cta text-white rounded-lg font-semibold text-sm hover:bg-cta-hover transition-colors shadow-sm hover:shadow-md"
                  onClick={() => {
                    window.location.href = "/upload";
                  }}
                >
                  Start Free (500 rows included)
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Cost Breakdown Section */}
      <CostBreakdown perCredit={perCredit} />
    </>
  );
}
