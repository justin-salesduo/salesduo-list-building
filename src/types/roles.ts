import type { LucideIcon } from "lucide-react";
import { Building2, UserSearch, MessageCircleHeart } from "lucide-react";

/**
 * User role types representing different personas using the platform
 */
export type UserRole =
  | "Lead Generation Agency"
  | "Recruitment Firm"
  | "B2B Marketing Leader";

/**
 * Configuration for a single role option in the selection UI
 */
export interface RoleOption {
  role: UserRole;
  description: string;
  icon: LucideIcon;
}

/**
 * LocalStorage key for persisting user role selection
 */
export const ROLE_STORAGE_KEY = "salesduo-user-role";

/**
 * Available role options with descriptions and icons
 */
export const roleOptions: RoleOption[] = [
  {
    role: "Lead Generation Agency",
    description: "Build lead lists for your clients efficiently",
    icon: Building2,
  },
  {
    role: "Recruitment Firm",
    description: "Find companies with active job openings automatically",
    icon: UserSearch,
  },
  {
    role: "B2B Marketing Leader",
    description: "Build hyper-targeted lead lists for ABM campaigns",
    icon: MessageCircleHeart,
  },
];

/**
 * Get the grammatical article (a/an) for a role name
 */
export function getRoleArticle(role: UserRole): "a" | "an" {
  // Currently all roles use "a", but this function allows for future flexibility
  return "a";
}
