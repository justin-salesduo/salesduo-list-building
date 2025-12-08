"use client";

import { useState, useMemo } from "react";
import { useUserRole } from "@/hooks/use-user-role";
import { getScenarioContent } from "@/config/role-content";

type PricingType = "free" | "per-run" | "only-if-found";

type CostField = {
  field: string;
  pricingType: PricingType;
  creditsPerRow: number;
  successRate?: number; // For "only-if-found" fields (0-1)
  includes?: string[]; // Additional fields included in this enrichment
};

type CostScenario = {
  id: string;
  name: string;
  description: string;
  fields: CostField[];
  sampleRows: number; // Number of rows in example
};

const costScenarios: CostScenario[] = [
  {
    id: "clay-users-500",
    name: "Companies Using Clay",
    description: "500 rows example",
    sampleRows: 500,
    fields: [
      { field: "Company Name", pricingType: "free", creditsPerRow: 0 },
      { field: "Contact Name", pricingType: "free", creditsPerRow: 0 },
      { field: "Title", pricingType: "free", creditsPerRow: 0 },
      {
        field: "Email",
        pricingType: "only-if-found",
        creditsPerRow: 1,
        successRate: 0.85,
      },
      {
        field: "Phone",
        pricingType: "only-if-found",
        creditsPerRow: 10,
        successRate: 0.75,
      },
      { field: "LinkedIn URL", pricingType: "free", creditsPerRow: 0 },
      { field: "Company Website", pricingType: "free", creditsPerRow: 0 },
      { field: "Tech Stack", pricingType: "per-run", creditsPerRow: 2 },
      { field: "Company Size", pricingType: "per-run", creditsPerRow: 1 },
      { field: "Industry", pricingType: "free", creditsPerRow: 0 },
      { field: "Location", pricingType: "free", creditsPerRow: 0 },
      { field: "Is Company B2B? (AI)", pricingType: "per-run", creditsPerRow: 3 },
      { field: "Has Enterprise Plan? (AI)", pricingType: "per-run", creditsPerRow: 3 },
    ],
  },
  {
    id: "expansion-news-2000",
    name: "Recent Expansion News",
    description: "2,000 rows example",
    sampleRows: 2000,
    fields: [
      { field: "Company Name", pricingType: "free", creditsPerRow: 0 },
      { field: "Contact Name", pricingType: "free", creditsPerRow: 0 },
      { field: "Title", pricingType: "free", creditsPerRow: 0 },
      {
        field: "Email",
        pricingType: "only-if-found",
        creditsPerRow: 1,
        successRate: 0.85,
      },
      { field: "LinkedIn URL", pricingType: "free", creditsPerRow: 0 },
      { field: "Company Website", pricingType: "free", creditsPerRow: 0 },
      {
        field: "Recent News",
        pricingType: "per-run",
        creditsPerRow: 3,
        includes: ["News Date"],
      },
      { field: "Company Size", pricingType: "per-run", creditsPerRow: 1 },
      { field: "Industry", pricingType: "free", creditsPerRow: 0 },
      { field: "Location", pricingType: "free", creditsPerRow: 0 },
      { field: "Mentioned 'expansion' in news? (AI)", pricingType: "per-run", creditsPerRow: 3 },
      { field: "Plans international growth? (AI)", pricingType: "per-run", creditsPerRow: 3 },
    ],
  },
  {
    id: "series-a-saas-5000",
    name: "Series A SaaS Companies",
    description: "5,000 rows example",
    sampleRows: 5000,
    fields: [
      { field: "Company Name", pricingType: "free", creditsPerRow: 0 },
      { field: "Contact Name", pricingType: "free", creditsPerRow: 0 },
      { field: "Title", pricingType: "free", creditsPerRow: 0 },
      {
        field: "Email",
        pricingType: "only-if-found",
        creditsPerRow: 1,
        successRate: 0.85,
      },
      { field: "LinkedIn URL", pricingType: "free", creditsPerRow: 0 },
      { field: "Company Website", pricingType: "free", creditsPerRow: 0 },
      {
        field: "Funding",
        pricingType: "per-run",
        creditsPerRow: 2,
        includes: ["Round", "Amount", "Date"],
      },
      { field: "Company Size", pricingType: "per-run", creditsPerRow: 1 },
      { field: "Industry", pricingType: "free", creditsPerRow: 0 },
      { field: "Location", pricingType: "free", creditsPerRow: 0 },
      { field: "Mentioned 'AI' in annual report? (AI)", pricingType: "per-run", creditsPerRow: 4 },
      { field: "Revenue model is subscription? (AI)", pricingType: "per-run", creditsPerRow: 3 },
    ],
  },
];

type Props = {
  perCredit: number; // From pricing calculator
};

export function CostBreakdown({ perCredit }: Props) {
  const { selectedRole } = useUserRole();
  const scenarioContent = getScenarioContent(selectedRole);

  // Filter scenarios based on role
  const filteredScenarios = useMemo(() => {
    return costScenarios.filter(scenario =>
      scenarioContent.costBreakdown.includes(scenario.id)
    );
  }, [scenarioContent]);

  const [activeScenario, setActiveScenario] = useState(filteredScenarios[0] || costScenarios[0]);

  // Calculate total credits for the scenario
  const calculateTotalCredits = (scenario: CostScenario) => {
    return scenario.fields.reduce((total, field) => {
      if (field.pricingType === "free") {
        return total;
      } else if (field.pricingType === "per-run") {
        return total + field.creditsPerRow * scenario.sampleRows;
      } else {
        // only-if-found
        const successRate = field.successRate || 1;
        const foundRows = Math.floor(scenario.sampleRows * successRate);
        return total + field.creditsPerRow * foundRows;
      }
    }, 0);
  };

  const totalCredits = calculateTotalCredits(activeScenario);
  const totalCost = totalCredits * perCredit;
  const costPerRow = totalCost / activeScenario.sampleRows;

  // Group fields by pricing type
  const freeFields = activeScenario.fields.filter(
    (f) => f.pricingType === "free",
  );
  const perRunFields = activeScenario.fields.filter(
    (f) => f.pricingType === "per-run",
  );
  const onlyIfFoundFields = activeScenario.fields.filter(
    (f) => f.pricingType === "only-if-found",
  );

  return (
    <section className="py-12 bg-surface" id="cost-breakdown">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-text-primary mb-3">
            Cost Breakdown Example
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-6">
            See exactly how list pricing works. Costs are predictable and
            transparent based on your data requirements.
          </p>

          {/* Pricing Type Legend */}
          <div className="flex justify-center gap-6 text-sm flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-600"></div>
              <span className="text-text-secondary">
                <strong>Free:</strong> No charge
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-600"></div>
              <span className="text-text-secondary">
                <strong>Per Run:</strong> Charged every row
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-600"></div>
              <span className="text-text-secondary">
                <strong>Only If Found:</strong> Charged when data found
              </span>
            </div>
          </div>
        </div>

        {/* Scenario Tabs */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {filteredScenarios.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => setActiveScenario(scenario)}
              className={`px-4 py-2 rounded-lg border-2 transition-all text-sm ${
                activeScenario.id === scenario.id
                  ? "border-accent bg-accent/5 text-text-primary font-medium"
                  : "border-border bg-background text-text-secondary hover:border-accent/50"
              }`}
            >
              {scenario.name}
            </button>
          ))}
        </div>

        {/* Cost Table */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-background border border-border rounded-lg overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 p-4 bg-surface border-b border-border font-semibold text-sm text-text-primary">
              <div className="col-span-4">Column Name</div>
              <div className="col-span-3">Pricing Type</div>
              <div className="col-span-2 text-right">Credits/Row</div>
              <div className="col-span-1 text-right">Rows</div>
              <div className="col-span-2 text-right">Total Credits</div>
            </div>

            {/* All Fields */}
            {activeScenario.fields.map((field) => {
              let totalFieldCredits = 0;
              let rowsUsed = activeScenario.sampleRows;

              if (field.pricingType === "free") {
                totalFieldCredits = 0;
              } else if (field.pricingType === "per-run") {
                totalFieldCredits =
                  field.creditsPerRow * activeScenario.sampleRows;
              } else if (field.pricingType === "only-if-found") {
                const successRate = field.successRate || 1;
                rowsUsed = Math.floor(activeScenario.sampleRows * successRate);
                totalFieldCredits = field.creditsPerRow * rowsUsed;
              }

              const typeColor =
                field.pricingType === "free"
                  ? "text-green-600"
                  : field.pricingType === "per-run"
                    ? "text-blue-600"
                    : "text-orange-600";

              const typeLabel =
                field.pricingType === "free"
                  ? "Free"
                  : field.pricingType === "per-run"
                    ? "Per Run"
                    : "Only If Found";

              return (
                <div
                  key={field.field}
                  className="grid grid-cols-12 gap-4 p-4 border-b border-border text-sm hover:bg-surface transition-colors"
                >
                  <div className="col-span-4">
                    <div className="text-text-primary font-medium">
                      {field.field}
                    </div>
                    {field.includes && (
                      <div className="text-xs text-text-muted mt-0.5">
                        {field.includes.join(", ")}
                      </div>
                    )}
                  </div>
                  <div className="col-span-3">
                    <span className={`${typeColor} font-medium`}>
                      {typeLabel}
                    </span>
                  </div>
                  <div className="col-span-2 text-right text-text-muted">
                    {field.creditsPerRow}
                  </div>
                  <div className="col-span-1 text-right text-text-muted">
                    {field.pricingType === "only-if-found" ? (
                      <div className="relative inline-block group">
                        <span className="border-b border-dotted border-text-muted cursor-help">
                          {rowsUsed}
                        </span>
                        <div className="absolute bottom-full left-0 mb-1 hidden group-hover:block whitespace-nowrap bg-text-primary text-white text-xs px-2 py-1 rounded shadow-lg z-10">
                          {Math.round((field.successRate || 1) * 100)}% found
                          rate
                        </div>
                      </div>
                    ) : (
                      activeScenario.sampleRows
                    )}
                  </div>
                  <div className="col-span-2 text-right text-text-primary font-semibold">
                    {totalFieldCredits.toLocaleString()}
                  </div>
                </div>
              );
            })}

            {/* Total Row */}
            <div className="grid grid-cols-12 gap-4 p-4 bg-accent/5 border-t border-accent/50 font-bold text-text-primary">
              <div className="col-span-4">
                Total ({activeScenario.sampleRows.toLocaleString()} rows)
              </div>
              <div className="col-span-3"></div>
              <div className="col-span-2"></div>
              <div className="col-span-1"></div>
              <div className="col-span-2 text-right text-lg">
                {totalCredits.toLocaleString()} credits
              </div>
            </div>

            {/* Dollar Cost Row */}
            <div className="grid grid-cols-12 gap-4 p-4 bg-accent/10 border-t border-border">
              <div className="col-span-10 text-text-secondary text-sm">
                At ${perCredit.toFixed(4)} per credit (from your selected package above)
              </div>
              <div className="col-span-2 text-right">
                <div className="text-xl font-bold text-accent">
                  ${totalCost.toFixed(2)}
                </div>
                <div className="text-xs text-text-muted mt-1">
                  ${costPerRow.toFixed(2)} per row
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Note */}
          <p className="text-center text-text-muted mt-6 text-xs italic">
            The above calculation is an illustration. Actual costs will vary. We
            will provide exact quotes before you commit.
          </p>
        </div>
      </div>
    </section>
  );
}
