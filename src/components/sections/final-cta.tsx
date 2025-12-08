"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useUserRole } from "@/hooks/use-user-role";
import { getCTAContent } from "@/config/role-content";
import type { CTAVariant } from "./hero";

interface FinalCTAProps {
  ctaVariant?: CTAVariant;
  onCTAClick?: () => void;
}

export function FinalCTA({ ctaVariant = "quote", onCTAClick }: FinalCTAProps) {
  const { selectedRole } = useUserRole();
  const ctaContent = getCTAContent(selectedRole);
  const ctaText = "Start Free";

  return (
    <section className="pt-8 pb-20 bg-background">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center p-12 bg-surface border border-border rounded-lg">
          <h2 className="text-text-primary font-bold mb-4">
            {ctaContent.headline}
          </h2>
          <p className="text-xl text-text-secondary mb-8 max-w-xl mx-auto">
            {ctaContent.subheadline}
          </p>

          <div className="flex items-center justify-center">
            <Button
              size="lg"
              onClick={onCTAClick}
              className="group w-full sm:w-auto"
            >
              {ctaText}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <p className="mt-6 text-sm text-text-muted">
            First 500 rows included • 24-48 hours delivery
          </p>
        </div>
      </div>
    </section>
  );
}
