"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserRole, ROLE_STORAGE_KEY } from "@/types/roles";

interface RolePageProps {
  params: Promise<{
    role: string;
  }>;
}

/**
 * Dynamic route handler for role-based redirects
 *
 * Handles routes like:
 * - /lead-generation-agency → Sets "Lead Generation Agency" role
 * - /recruitment-firm → Sets "Recruitment Firm" role
 * - /b2b-marketing-leader → Sets "B2B Marketing Leader" role
 *
 * After setting the role, redirects to the home page where the role will be active.
 */
export default function RolePage({ params }: RolePageProps) {
  const router = useRouter();
  const { role } = use(params);

  useEffect(() => {
    // Map URL slug to UserRole
    const roleMap: Record<string, UserRole> = {
      "lead-generation-agency": "Lead Generation Agency",
      "recruitment-firm": "Recruitment Firm",
      "b2b-marketing-leader": "B2B Marketing Leader",
    };

    const roleSlug = role.toLowerCase();
    const mappedRole = roleMap[roleSlug];

    if (mappedRole) {
      // Valid role - set it in localStorage
      try {
        localStorage.setItem(ROLE_STORAGE_KEY, mappedRole);
      } catch (error) {
        console.warn("Failed to save role to localStorage:", error);
      }

      // Redirect to home page
      router.replace("/");
    } else {
      // Invalid role slug - redirect to home without setting role
      router.replace("/");
    }
  }, [role, router]);

  // Show loading state while redirecting
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-text-secondary">Loading...</p>
      </div>
    </div>
  );
}
