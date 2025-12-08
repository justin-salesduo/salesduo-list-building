import { UserRole } from "@/types/roles";

/**
 * Hero section content configuration
 */
export interface HeroContent {
  headline: string;
  subheadline: string;
  painPoints: string[];
}

/**
 * Pricing section content configuration
 */
export interface PricingContent {
  emphasis: string;
  recommendedTier: number; // Credits amount
}

/**
 * Scenario filtering configuration
 */
export interface ScenarioContent {
  costBreakdown: string[]; // Scenario IDs to show
  sampleOutput: string[]; // Scenario IDs to show
}

/**
 * Final CTA section content configuration
 */
export interface CTAContent {
  headline: string;
  subheadline: string;
}

/**
 * Complete role-based content configuration
 */
export interface RoleContent {
  role: UserRole;
  hero: HeroContent;
  pricing: PricingContent;
  scenarios: ScenarioContent;
  cta: CTAContent;
}

/**
 * Role-based content mapping
 *
 * This centralizes all dynamic content based on user role selection.
 * Adding a new role requires only updating this configuration.
 */
export const roleContentMap: Record<UserRole, RoleContent> = {
  "Lead Generation Agency": {
    role: "Lead Generation Agency",
    hero: {
      headline: "List building made easy",
      subheadline:
        "Stop manual prospecting. Film a quick video of your requirements, get a quote with sample data, and receive complete datasets within 24-48 hours.",
      painPoints: [
        "Manual Data Sourcing",
        "Data Cleaning",
        "Endless Clay Columns",
        "Time-Consuming Research",
        "Costly Data Tool Subscriptions",
      ],
    },
    pricing: {
      emphasis: "Cost per qualified lead",
      recommendedTier: 150000,
    },
    scenarios: {
      costBreakdown: [
        "clay-users-500",
        "expansion-news-2000",
        "series-a-saas-5000",
      ],
      sampleOutput: ["clay-users", "expansion-news", "series-a-saas"],
    },
    cta: {
      headline: "Ready to Build Your Perfect Lead List?",
      subheadline: "No sales calls. Done in minutes.",
    },
  },

  "Recruitment Firm": {
    role: "Recruitment Firm",
    hero: {
      headline: "Find companies with active job openings, automatically",
      subheadline:
        "Stop manual job board scraping. Get targeted lists of companies actively hiring, complete with role details and hiring manager contacts within 24-48 hours.",
      painPoints: [
        "Manual Job Board Scraping",
        "Missing New Hiring Opportunities",
        "Outdated Company Hiring Data",
        "Time-Consuming Role Research",
        "Hard-to-Find Hiring Manager Contacts",
      ],
    },
    pricing: {
      emphasis: "Cost per active job opening",
      recommendedTier: 100000,
    },
    scenarios: {
      costBreakdown: ["series-a-saas-5000"],
      sampleOutput: ["employee-engagement", "series-a-saas"],
    },
    cta: {
      headline: "Ready to Find Companies Actively Hiring?",
      subheadline: "No sales calls. Done in minutes.",
    },
  },

  "B2B Marketing Leader": {
    role: "B2B Marketing Leader",
    hero: {
      headline: "Build hyper-targeted account lists for winning ABM campaigns",
      subheadline:
        "Stop generic targeting. Define your ideal customer profile, get enriched account lists with decision-maker contacts within 24-48 hours.",
      painPoints: [
        "Generic Target Lists",
        "Low Campaign Performance",
        "Misaligned Sales-Marketing Data",
        "Limited Account Intelligence",
        "Wasted Ad Spend",
      ],
    },
    pricing: {
      emphasis: "Cost per target account",
      recommendedTier: 200000,
    },
    scenarios: {
      costBreakdown: ["expansion-news-2000", "series-a-saas-5000"],
      sampleOutput: ["expansion-news", "series-a-saas", "ecommerce-growth"],
    },
    cta: {
      headline: "Ready to Build Your Hyper-Targeted Account Lists?",
      subheadline: "No sales calls. Done in minutes.",
    },
  },
};

/**
 * Get role-specific content configuration
 *
 * @param role - User role (or null for default)
 * @returns Role-specific content or default content
 *
 * @example
 * ```tsx
 * const content = getRoleContent("Lead Generation Agency");
 * console.log(content.hero.headline); // "Build high-quality lead lists..."
 * ```
 */
export function getRoleContent(role: UserRole | null): RoleContent {
  if (!role) {
    // Default to Lead Generation Agency content
    return roleContentMap["Lead Generation Agency"];
  }

  return roleContentMap[role];
}

/**
 * Get role-specific hero content
 */
export function getHeroContent(role: UserRole | null): HeroContent {
  return getRoleContent(role).hero;
}

/**
 * Get role-specific pricing content
 */
export function getPricingContent(role: UserRole | null): PricingContent {
  return getRoleContent(role).pricing;
}

/**
 * Get role-specific scenario filters
 */
export function getScenarioContent(role: UserRole | null): ScenarioContent {
  return getRoleContent(role).scenarios;
}

/**
 * Get role-specific CTA content
 */
export function getCTAContent(role: UserRole | null): CTAContent {
  return getRoleContent(role).cta;
}
