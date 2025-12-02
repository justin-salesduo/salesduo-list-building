'use client';

import { Search, Database, Shield, Zap } from 'lucide-react';

const processes = [
  {
    icon: Search,
    title: 'Expert Manual Research',
    description:
      'Our team follows your exact process step-by-step, ensuring we capture the specific leads you\'re looking for with precision.',
  },
  {
    icon: Database,
    title: 'Multi-Source Verification',
    description:
      'We cross-reference data across multiple sources to ensure accuracy and completeness of every lead in your list.',
  },
  {
    icon: Shield,
    title: 'Quality Assurance',
    description:
      'Each lead goes through rigorous verification checks before delivery, including contact validation and data freshness.',
  },
  {
    icon: Zap,
    title: 'Fast Turnaround',
    description:
      'Optimized workflows and dedicated researchers ensure you get high-quality results within 48 hours, guaranteed.',
  },
];

export function ProcessTransparency() {
  return (
    <section className="section-padding bg-background" id="how-it-works">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-text-primary font-bold mb-4">
            How We Build Your Lists
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Behind every perfect lead list is a meticulous process designed for
            accuracy and speed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {processes.map((process) => (
            <div
              key={process.title}
              className="flex gap-6 p-6 bg-surface border border-border rounded-lg hover:border-accent transition-colors"
            >
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 flex items-center justify-center bg-background border border-border rounded-lg">
                  <process.icon className="w-6 h-6 text-text-primary" />
                </div>
              </div>

              {/* Content */}
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {process.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {process.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Process Visualization */}
        <div className="mt-16 p-8 bg-surface border border-border rounded-lg max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold text-text-primary mb-6 text-center">
            Why Video Walkthroughs Matter
          </h3>
          <div className="space-y-4 text-text-secondary">
            <p>
              Traditional forms and questionnaires miss critical nuances in your
              research process. A 5-minute video captures:
            </p>
            <ul className="space-y-2 ml-6">
              <li className="flex items-start gap-2">
                <span className="text-text-primary mt-1">•</span>
                <span>
                  Your specific search criteria and decision-making process
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-text-primary mt-1">•</span>
                <span>
                  Edge cases and exceptions that written forms can't articulate
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-text-primary mt-1">•</span>
                <span>
                  The context and intent behind each data point you need
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-text-primary mt-1">•</span>
                <span>
                  Visual examples of exactly what you're looking for
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
