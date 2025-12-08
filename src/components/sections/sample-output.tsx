"use client";

import { useState, useMemo } from "react";
import { FileSpreadsheet, Webhook, Sheet, FileJson } from "lucide-react";
import { useUserRole } from "@/hooks/use-user-role";
import { getScenarioContent } from "@/config/role-content";

const scenarios = [
  {
    id: "clay-users",
    name: "Companies Using Clay",
    description: "Tech stack-based targeting",
    data: [
      {
        field: "Company Name",
        example: "Velocity Growth Partners",
        source: "Apollo",
      },
      { field: "Contact Name", example: "Michael Chen", source: "LinkedIn" },
      { field: "Title", example: "Head of Growth", source: "LinkedIn" },
      {
        field: "Email",
        example: "michael.c@velocitygrowth.io",
        source: "Hunter.io",
      },
      { field: "Phone", example: "+1 (555) 234-5678", source: "RocketReach" },
      {
        field: "LinkedIn URL",
        example: "linkedin.com/in/michaelchen",
        source: "PhantomBuster",
      },
      {
        field: "Company Website",
        example: "velocitygrowth.io",
        source: "Clearbit",
      },
      {
        field: "Tech Stack",
        example: "Clay, Apollo, HubSpot",
        source: "BuiltWith",
      },
      { field: "Company Size", example: "25-50 employees", source: "LinkedIn" },
      {
        field: "Industry",
        example: "B2B Marketing Agency",
        source: "Clearbit",
      },
      { field: "Location", example: "San Francisco, CA", source: "Apollo" },
      {
        field: "Is Company B2B?",
        example: "Yes",
        source: "AI Analysis",
      },
      {
        field: "Has Enterprise Plan?",
        example: "No",
        source: "AI Analysis",
      },
    ],
  },
  {
    id: "expansion-news",
    name: "Recent Expansion News",
    description: "Signal-based targeting",
    data: [
      {
        field: "Company Name",
        example: "TechFlow Solutions",
        source: "Apollo",
      },
      { field: "Contact Name", example: "Sarah Martinez", source: "LinkedIn" },
      { field: "Title", example: "VP of Sales", source: "LinkedIn" },
      { field: "Email", example: "sarah.m@techflow.com", source: "Snov.io" },
      { field: "Phone", example: "+1 (555) 345-6789", source: "Lusha" },
      {
        field: "LinkedIn URL",
        example: "linkedin.com/in/sarahmartinez",
        source: "PhantomBuster",
      },
      { field: "Company Website", example: "techflow.com", source: "Clearbit" },
      {
        field: "Recent News",
        example: "Announced expansion to EMEA market",
        source: "NewsAPI",
      },
      { field: "News Date", example: "2025-11-15", source: "NewsAPI" },
      {
        field: "Company Size",
        example: "100-200 employees",
        source: "LinkedIn",
      },
      { field: "Industry", example: "SaaS", source: "Clearbit" },
      { field: "Location", example: "Austin, TX", source: "Apollo" },
      {
        field: "Mentioned 'expansion' in news?",
        example: "Yes",
        source: "AI Analysis",
      },
      {
        field: "Plans international growth?",
        example: "Yes - EMEA mentioned",
        source: "AI Analysis",
      },
    ],
  },
  {
    id: "series-a-saas",
    name: "Series A SaaS Companies",
    description: "Funding + industry filtering",
    data: [
      { field: "Company Name", example: "DataSync AI", source: "Crunchbase" },
      { field: "Contact Name", example: "Alex Thompson", source: "LinkedIn" },
      { field: "Title", example: "Co-Founder & CEO", source: "LinkedIn" },
      { field: "Email", example: "alex@datasync.ai", source: "Hunter.io" },
      { field: "Phone", example: "+1 (555) 456-7890", source: "ContactOut" },
      {
        field: "LinkedIn URL",
        example: "linkedin.com/in/alexthompson",
        source: "PhantomBuster",
      },
      {
        field: "Company Website",
        example: "datasync.ai",
        source: "Crunchbase",
      },
      { field: "Funding Stage", example: "Series A", source: "Crunchbase" },
      { field: "Funding Amount", example: "$8M", source: "Crunchbase" },
      { field: "Funding Date", example: "2025-09-20", source: "Crunchbase" },
      { field: "Company Size", example: "15-25 employees", source: "LinkedIn" },
      { field: "Industry", example: "AI/ML SaaS", source: "Crunchbase" },
      { field: "Location", example: "New York, NY", source: "Crunchbase" },
      {
        field: "Mentioned 'AI' in annual report?",
        example: "Yes - 47 mentions",
        source: "AI Analysis",
      },
      {
        field: "Revenue model is subscription?",
        example: "Yes",
        source: "AI Analysis",
      },
    ],
  },
  {
    id: "ecommerce-growth",
    name: "E-commerce Growth Stage",
    description: "Size + industry targeting",
    data: [
      {
        field: "Company Name",
        example: "Urban Essentials Co.",
        source: "Apollo",
      },
      { field: "Contact Name", example: "Jessica Park", source: "LinkedIn" },
      { field: "Title", example: "Director of Marketing", source: "LinkedIn" },
      {
        field: "Email",
        example: "jessica.p@urbanessentials.com",
        source: "Dropcontact",
      },
      { field: "Phone", example: "+1 (555) 567-8901", source: "RocketReach" },
      {
        field: "LinkedIn URL",
        example: "linkedin.com/in/jessicapark",
        source: "PhantomBuster",
      },
      {
        field: "Company Website",
        example: "urbanessentials.com",
        source: "Clearbit",
      },
      {
        field: "E-commerce Platform",
        example: "Shopify Plus",
        source: "BuiltWith",
      },
      {
        field: "Company Size",
        example: "50-100 employees",
        source: "LinkedIn",
      },
      { field: "Estimated Revenue", example: "$10M-$25M", source: "ZoomInfo" },
      { field: "Industry", example: "E-commerce / Retail", source: "Clearbit" },
      { field: "Location", example: "Los Angeles, CA", source: "Apollo" },
      {
        field: "Sells primarily D2C?",
        example: "Yes",
        source: "AI Analysis",
      },
      {
        field: "Has subscription products?",
        example: "Yes - recurring revenue model",
        source: "AI Analysis",
      },
    ],
  },
  {
    id: "employee-engagement",
    name: "Employee Engagement Initiatives",
    description: "Annual report signals",
    data: [
      {
        field: "Company Name",
        example: "GlobalTech Industries",
        source: "SEC EDGAR",
      },
      { field: "Contact Name", example: "Robert Williams", source: "LinkedIn" },
      { field: "Title", example: "Chief People Officer", source: "LinkedIn" },
      {
        field: "Email",
        example: "r.williams@globaltech.com",
        source: "Hunter.io",
      },
      { field: "Phone", example: "+1 (555) 678-9012", source: "SignalHire" },
      {
        field: "LinkedIn URL",
        example: "linkedin.com/in/robertwilliams",
        source: "PhantomBuster",
      },
      {
        field: "Company Website",
        example: "globaltech.com",
        source: "SEC EDGAR",
      },
      { field: "Stock Ticker", example: "NASDAQ: GLBT", source: "SEC EDGAR" },
      {
        field: "Report Quote",
        example: '"investing $2.5M in employee engagement platforms"',
        source: "SEC EDGAR",
      },
      {
        field: "Report Source",
        example: "2024 10-K, Page 47",
        source: "SEC EDGAR",
      },
      {
        field: "Report Link",
        example: "sec.gov/Archives/edgar/data/123456/10-k.htm",
        source: "SEC EDGAR",
      },
      {
        field: "Company Size",
        example: "1,000+ employees",
        source: "LinkedIn",
      },
      {
        field: "Industry",
        example: "Technology / Manufacturing",
        source: "SEC EDGAR",
      },
      { field: "Location", example: "Chicago, IL", source: "SEC EDGAR" },
      {
        field: "Mentioned 'employee engagement' in report?",
        example: "Yes - 12 mentions",
        source: "AI Analysis",
      },
      {
        field: "Has remote work policy?",
        example: "Yes - hybrid model mentioned",
        source: "AI Analysis",
      },
    ],
  },
];

const formats = [
  { name: "CSV", icon: FileSpreadsheet },
  { name: "Clay Webhook", icon: Webhook },
  { name: "Google Sheets", icon: Sheet },
  { name: "JSON", icon: FileJson },
];

export function SampleOutput() {
  const { selectedRole } = useUserRole();
  const scenarioContent = getScenarioContent(selectedRole);

  // Filter scenarios based on role
  const filteredScenarios = useMemo(() => {
    return scenarios.filter(scenario =>
      scenarioContent.sampleOutput.includes(scenario.id)
    );
  }, [scenarioContent]);

  const [activeScenario, setActiveScenario] = useState(filteredScenarios[0] || scenarios[0]);

  return (
    <section className="section-padding bg-surface" id="examples">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-text-primary font-bold mb-4">
            See What You'll Get
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Every lead comes fully enriched with the data points you need.
            Explore different targeting scenarios below.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Available Formats - Aligned Right */}
            <div className="lg:col-span-12 flex justify-end mb-2">
              <div className="flex items-center gap-6 flex-wrap">
                <span className="text-sm text-text-muted">
                  Available formats:
                </span>
                {formats.map((format) => (
                  <div key={format.name} className="flex items-center gap-2">
                    <format.icon className="w-4 h-4 text-text-muted" />
                    <span className="text-sm text-text-muted">
                      {format.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {/* Left Tabs */}
            <div className="lg:col-span-3">
              <div className="space-y-2">
                {filteredScenarios.map((scenario) => (
                  <button
                    key={scenario.id}
                    onClick={() => setActiveScenario(scenario)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      activeScenario.id === scenario.id
                        ? "border-accent bg-background shadow-md"
                        : "border-border bg-background hover:border-accent"
                    }`}
                  >
                    <div className="font-semibold text-text-primary mb-1">
                      {scenario.name}
                    </div>
                    <div className="text-xs text-text-secondary">
                      {scenario.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Sample Data Table */}
            <div className="lg:col-span-9">
              <div className="bg-background border border-border rounded-lg overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h3 className="text-lg font-semibold text-text-primary">
                    {activeScenario.name}
                  </h3>
                  <p className="text-sm text-text-secondary mt-1">
                    Example output (anonymized)
                  </p>
                </div>
                <div className="divide-y divide-border">
                  {activeScenario.data.map((item) => (
                    <div
                      key={item.field}
                      className="grid grid-cols-12 gap-4 p-4 hover:bg-surface transition-colors items-center"
                    >
                      <span className="col-span-4 font-medium text-text-primary text-sm">
                        {item.field}
                      </span>
                      <span className="col-span-5 text-text-secondary text-sm font-mono">
                        {item.example}
                      </span>
                      <span className="col-span-3 text-text-muted text-xs text-right">
                        {item.source}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
