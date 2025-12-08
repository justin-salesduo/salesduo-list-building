"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, ZoomIn, ZoomOut, Workflow, Clock } from "lucide-react";

type WorkflowStep = string;

type WorkflowExample = {
  id: string;
  name: string;
  steps: WorkflowStep[];
  estimatedTime: string;
};

const workflows: WorkflowExample[] = [
  {
    id: "ecommerce",
    name: "E-commerce",
    steps: [
      "Find companies using Shopify",
      "Check if they use TikTok Shop, Lazada, Shopee, Amazon",
      "Verify storefront follower count and response time",
      "Find owner or director",
      "Get email and mobile numbers",
    ],
    estimatedTime: "3.5h",
  },
  {
    id: "construction",
    name: "Construction",
    steps: [
      "Find new construction projects from public sources and news",
      "Find projects from private databases like GlobalData",
      "Find projects from tender boards",
      "Dedupe all projects",
      "Qualify for relevant projects",
      "Push data to Hubspot CRM",
    ],
    estimatedTime: "2h",
  },
  {
    id: "recruitment-hr",
    name: "Recruitment/HR",
    steps: [
      "Find companies in target industry and size range",
      "Identify recent funding rounds or growth signals",
      "Find HR directors and hiring managers",
      "Check current job openings and headcount",
      "Verify contact information",
      "Enrich with tech stack and company data",
    ],
    estimatedTime: "3h",
  },
];

// Calculate optimal node width based on text length and line wrapping
function getNodeWidth(text: string): number {
  // Rough estimation: ~8 characters per line at base width (240px)
  // With padding and number badge, effective width is ~180px for text
  // At text-sm, roughly 3.5 chars per 10px
  const charsPerLine = 25; // Conservative estimate for 240px width
  const estimatedLines = Math.ceil(text.length / charsPerLine);

  if (estimatedLines > 3) {
    // If text would wrap more than 3 lines, increase width
    return 380; // Extra wide
  } else if (estimatedLines > 2) {
    return 320; // Wide
  } else {
    return 260; // Standard
  }
}

export function WorkflowExamples() {
  const [activeWorkflow, setActiveWorkflow] = useState(workflows[0].id);
  const [zoom, setZoom] = useState(0.5);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentWorkflow = workflows.find((w) => w.id === activeWorkflow)!;

  // Calculate optimal zoom to fit all nodes
  useEffect(() => {
    const calculateOptimalZoom = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;

      // Calculate total width needed for all nodes
      let totalWidth = 0;
      currentWorkflow.steps.forEach((step) => {
        const nodeWidth = getNodeWidth(step);
        totalWidth += nodeWidth;
      });

      // Add gap space (16px gap + arrow ~20px) between nodes
      const gapSpace = (currentWorkflow.steps.length - 1) * 36;
      totalWidth += gapSpace;

      // Add padding (24px on each side for p-6)
      totalWidth += 300;

      // Calculate zoom to fit
      const optimalZoom = Math.min(containerWidth / totalWidth, 1.0);
      setZoom(Math.max(optimalZoom, 0.3)); // Minimum 30% zoom
    };

    calculateOptimalZoom();

    // Recalculate on window resize
    window.addEventListener("resize", calculateOptimalZoom);
    return () => window.removeEventListener("resize", calculateOptimalZoom);
  }, [activeWorkflow, currentWorkflow.steps]);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.1, 1.5));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.1, 0.3));
  };

  const handleResetZoom = () => {
    // Recalculate optimal zoom
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.offsetWidth;
    let totalWidth = 0;
    currentWorkflow.steps.forEach((step) => {
      const nodeWidth = getNodeWidth(step);
      totalWidth += nodeWidth;
    });
    const gapSpace = (currentWorkflow.steps.length - 1) * 36;
    totalWidth += gapSpace + 48;
    const optimalZoom = Math.min(containerWidth / totalWidth, 1.0);
    setZoom(Math.max(optimalZoom, 0.3));
  };

  return (
    <div className="my-12 w-full px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-base font-semibold text-text-primary">
              Real Examples: Behind the Scenes
            </h4>

            {/* Legend */}
            <div className="flex items-center gap-4 text-xs text-text-muted">
              <div className="flex items-center gap-1.5">
                <Workflow className="w-3.5 h-3.5" />
                <span>Steps</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Hours spent</span>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 mb-6">
            {workflows.map((workflow) => (
              <button
                key={workflow.id}
                onClick={() => setActiveWorkflow(workflow.id)}
                className={`px-3 py-2 rounded-lg border-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeWorkflow === workflow.id
                    ? "border-accent bg-accent/5 text-text-primary font-medium"
                    : "border-border bg-background text-text-secondary hover:border-accent/50"
                }`}
              >
                <span className="text-sm">{workflow.name}</span>
                <Workflow className="w-2.5 h-2.5 opacity-50" />
                <span className="text-[10px] opacity-50">
                  {workflow.steps.length}
                </span>
                <Clock className="w-2.5 h-2.5 opacity-50" />
                <span className="text-[10px] opacity-50">
                  {workflow.estimatedTime}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Horizontal Workflow Display - Canvas */}
        <div
          ref={containerRef}
          className="bg-gradient-to-br from-background to-surface border border-border rounded-lg overflow-hidden w-full"
        >
          <div className="p-6 w-full">
            <div className="flex items-center justify-center min-h-[140px]">
              <div
                className="inline-flex items-center gap-4 transition-transform duration-200"
                style={{
                  transform: `scale(${zoom})`,
                  transformOrigin: "center center",
                }}
              >
                {currentWorkflow.steps.map((step, index) => (
                  <div key={index} className="flex items-center gap-4">
                    {/* Step Node - Fieldset Style with Number on Border */}
                    <div className="flex-shrink-0 relative">
                      {/* Number Badge - Positioned on Top Border */}
                      <div className="absolute -top-3 left-4 z-10">
                        <span className="flex items-center justify-center w-6 h-6 bg-gradient-to-br from-accent to-accent/80 text-white text-xs font-bold rounded-md shadow-sm">
                          {index + 1}
                        </span>
                      </div>

                      {/* Node Card */}
                      <div
                        className="bg-white border border-border/40 rounded-xl px-5 py-4 shadow-lg hover:shadow-xl transition-shadow duration-200"
                        style={{
                          width: `${getNodeWidth(step)}px`,
                          minHeight: "90px",
                        }}
                      >
                        <div className="flex items-center h-full">
                          <p className="text-lg text-text-primary leading-relaxed font-medium w-full">
                            {step}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Arrow Connector */}
                    {index < currentWorkflow.steps.length - 1 && (
                      <div className="flex-shrink-0 flex items-center">
                        <div className="w-8 h-0.5 bg-gradient-to-r from-accent/60 to-accent/30"></div>
                        <ArrowRight className="w-5 h-5 text-accent -ml-2" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Result Summary */}
        <div className="mt-4 text-sm text-text-muted text-right">
          Typical completion: {currentWorkflow.estimatedTime} of manual work
        </div>
      </div>
    </div>
  );
}
