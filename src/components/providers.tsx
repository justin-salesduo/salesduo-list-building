"use client";

import { RoleProvider } from "@/contexts/role-context";
import type { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

/**
 * Client-side providers wrapper
 *
 * Wraps the app with all necessary context providers.
 * This component is "use client" to enable client-side state management.
 */
export function Providers({ children }: ProvidersProps) {
  return <RoleProvider>{children}</RoleProvider>;
}
