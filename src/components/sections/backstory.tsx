"use client";

import { ArrowRight, Zap } from "lucide-react";
import { WorkflowExamples } from "./workflows-example";

export function Backstory() {
  return (
    <section className="section-padding bg-surface" id="why-we-built-this">
      <div className="container-custom">
        {/* Section Header */}
        <div className="mb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-background border border-border rounded-full text-sm text-text-secondary">
            <Zap className="w-4 h-4" />
            <span>Built by Agency Operators, For Agencies</span>
          </div>

          <h2 className="text-text-primary font-bold mb-8">
            We built the tool we wished existed
          </h2>

          <div className="space-y-6 text-lg leading-relaxed">
            <p className="text-text-secondary">
              When we ran our lead gen agency, our clients loved us for one
              thing:{" "}
              <span className="text-text-primary font-medium">
                rapid iteration on campaign ideas.
              </span>
            </p>

            <p className="text-text-secondary">
              We would brainstorm on campaign angles, test different ICPs,
              refine messaging — all the high-value strategic work that lays the
              foundation for a good campaign.
            </p>

            <p className="text-text-secondary">
              But here's what nobody saw: the{" "}
              <span className="text-text-primary font-medium">2-4 hours</span>{" "}
              we spent turning each campaign idea into an actual target list.
            </p>
          </div>
        </div>

        {/* Workflow Examples */}
        <WorkflowExamples />

        {/* The Problem - Narrative Story */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-background border-l-4 border-accent px-8 py-6 mb-8">
            <h3 className="text-xl font-semibold text-text-primary mb-4">
              The bottleneck
            </h3>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                Even with Clay (which we loved), every campaign had nuanced
                differences. Different data sources. Custom qualification logic.
                Specific enrichment needs.
              </p>
              <p>
                Templates got us 70% there. But that last 30%? Connecting
                integrations, cleaning data, writing endless if/else conditions
                —
                <span className="text-text-primary font-medium italic">
                  &nbsp;that took hours
                </span>
                .
              </p>
            </div>
          </div>

          <div className="bg-background border-l-4 border-accent px-8 py-6 mb-12">
            <h3 className="text-xl font-semibold text-text-primary mb-4">
              The real cost
            </h3>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                We'd have 5 campaign ideas ready to test. But we could only
                build 2 per day because of the manual work.
              </p>
              <p>
                The irony? Our clients paid us for strategic thinking. But we
                spent most of our time doing data plumbing.
              </p>
              <p className="text-text-primary font-medium">
                There had to be a better way.
              </p>
            </div>
          </div>

          {/* Transition */}
          <div className="flex items-center gap-4 my-12">
            <div className="flex-1 h-px bg-border"></div>
            <ArrowRight className="w-6 h-6 text-accent" />
            <div className="flex-1 h-px bg-border"></div>
          </div>
        </div>

        {/* Solution Statement */}
        <div className="max-w-4xl mx-auto mb-16">
          <h3 className="text-2xl font-semibold text-text-primary mb-6">
            So we built this
          </h3>

          <div className="space-y-6 text-lg text-text-secondary leading-relaxed">
            <p>
              A tool where you just{" "}
              <span className="text-text-primary font-medium">
                show us your list building process
              </span>
              . Film a quick Loom walking through how you're currently building
              your lists.
            </p>

            <p>
              Our AI agent (and us) handles all the data plumbing — connecting
              sources, cleaning, enriching, validating. Everything that used to
              take hours.
            </p>

            <p>
              You'll receive a ready-to-use list in 24-48 hours. And because we
              support all Clay-integrated data providers, you get maximum
              coverage without the manual setup.
            </p>

            <div className="mt-8 p-6 bg-background border border-accent rounded-lg">
              <p className="text-text-primary font-bold mb-2">The best part?</p>
              <p className="text-text-secondary">
                Your time investment drops from 2-4 hours to 5 minutes. <br />{" "}
                No subscriptions, no commitments — just results.
              </p>
            </div>
          </div>
        </div>

        {/* Simple Stats */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
            <div className="p-6 bg-background rounded-lg">
              <div className="text-xl md:text-2xl font-bold text-text-primary mb-2">
                2-4 hrs → 5 min
              </div>
              <p className="text-sm text-text-secondary">Your time saved</p>
            </div>
            <div className="p-6 bg-background rounded-lg">
              <div className="text-xl md:text-2xl font-bold text-text-primary mb-2">
                100% self-service
              </div>
              <p className="text-sm text-text-secondary">
                No sales calls needed
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
