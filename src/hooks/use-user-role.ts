"use client";

import { useContext } from "react";
import { RoleContext, type RoleContextValue } from "@/contexts/role-context";

/**
 * Custom hook for accessing user role state from context
 *
 * Must be used within a RoleProvider. Provides access to:
 * - Current selected role
 * - Role modal visibility state
 * - Function to update role
 * - Loading state
 *
 * @returns {RoleContextValue} Role state and management functions
 *
 * @throws {Error} If used outside of RoleProvider
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { selectedRole, updateRole, showRoleModal } = useUserRole();
 *
 *   if (showRoleModal) {
 *     return <RoleSelectionModal onSelect={updateRole} />;
 *   }
 *
 *   return <div>Current role: {selectedRole}</div>;
 * }
 * ```
 */
export function useUserRole(): RoleContextValue {
  const context = useContext(RoleContext);

  if (context === undefined) {
    throw new Error("useUserRole must be used within a RoleProvider");
  }

  return context;
}
