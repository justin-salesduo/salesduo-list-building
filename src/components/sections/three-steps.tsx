"use client";

import { Video, FileText, CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Share Your Requirements",
    description:
      "Define your desired data points and share a Loom video walking us through your thought process.",
    icon: Video,
  },
  {
    number: "02",
    title: "Get quote with sample data",
    description:
      "Our AI agent analyzes your video to understand requirements and generate a detailed quote with sample output within hours. Experts verify when needed.",
    icon: FileText,
  },
  {
    number: "03",
    title: "Receive data in desired format",
    description:
      "Confirm your requirements and receive the complete, verified dataset within 24-48 hours. Export to your preferred tools.",
    icon: CheckCircle,
  },
];

export function ThreeSteps() {
  return (
    <section className="section-padding bg-surface" id="steps">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-text-primary font-bold mb-4">
            Three Simple Steps to Your Perfect List
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            No sales calls. No back-and-forth emails. Just results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector Line (Desktop) */}
              {index < steps.length - 1 && (
                <div
                  className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-border -translate-y-1/2"
                  style={{ width: "calc(100% - 3rem)" }}
                />
              )}

              {/* Step Card */}
              <div className="relative bg-background border border-border rounded-lg p-8 hover:shadow-lg transition-shadow">
                {/* Icon - Top Right */}
                <div className="absolute top-8 right-8">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-surface border border-border rounded-lg">
                    <step.icon className="w-7 h-7 text-text-primary" />
                  </div>
                </div>

                {/* Step Number */}
                <div className="text-6xl font-bold text-border mb-6">
                  {step.number}
                </div>

                {/* Content */}
                <h3 className="text-text-primary font-semibold mb-3">
                  {step.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
