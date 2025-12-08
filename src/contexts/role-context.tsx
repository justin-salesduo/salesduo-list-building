"use client";

import { createContext, useState, useEffect, type ReactNode } from "react";
import { UserRole, ROLE_STORAGE_KEY } from "@/types/roles";

export interface RoleContextValue {
  selectedRole: UserRole | null;
  showRoleModal: boolean;
  setShowRoleModal: (show: boolean) => void;
  updateRole: (role: UserRole) => void;
  isLoading: boolean;
}

export const RoleContext = createContext<RoleContextValue | undefined>(undefined);

interface RoleProviderProps {
  children: ReactNode;
}

/**
 * Role Provider - Manages global role state
 *
 * Provides role state to all components via Context API.
 * Ensures all components update simultaneously when role changes.
 *
 * Features:
 * - Centralized role state management
 * - localStorage persistence
 * - Automatic modal display for first-time users
 * - Loading state during hydration
 */
export function RoleProvider({ children }: RoleProviderProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Mark as mounted on client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Load role from localStorage on mount
  useEffect(() => {
    if (!isMounted) return;

    try {
      const savedRole = localStorage.getItem(ROLE_STORAGE_KEY);

      if (savedRole) {
        // Validate that saved role is still a valid UserRole
        const validRoles: UserRole[] = [
          "Lead Generation Agency",
          "Recruitment Firm",
          "B2B Marketing Leader",
        ];

        if (validRoles.includes(savedRole as UserRole)) {
          setSelectedRole(savedRole as UserRole);
        } else {
          // Invalid role stored, clear it
          localStorage.removeItem(ROLE_STORAGE_KEY);
          setShowRoleModal(true);
        }
      } else {
        // No role selected yet, show modal
        setShowRoleModal(true);
      }
    } catch (error) {
      // localStorage might not be available (SSR, privacy mode, etc.)
      console.warn("Failed to load role from localStorage:", error);
      setShowRoleModal(true);
    } finally {
      setIsLoading(false);
    }
  }, [isMounted]);

  /**
   * Update the selected role and persist to localStorage
   */
  const updateRole = (role: UserRole) => {
    setSelectedRole(role);
    setShowRoleModal(false);

    try {
      localStorage.setItem(ROLE_STORAGE_KEY, role);
    } catch (error) {
      console.warn("Failed to save role to localStorage:", error);
    }
  };

  const value: RoleContextValue = {
    selectedRole,
    showRoleModal,
    setShowRoleModal,
    updateRole,
    isLoading,
  };

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}
