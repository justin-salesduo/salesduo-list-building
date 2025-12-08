"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Building2, UserSearch, MessageCircleHeart } from "lucide-react";

const ROLE_STORAGE_KEY = "salesduo-user-role";

const roleOptions = [
  {
    role: "Lead Generation Agency",
    description: "Build lead lists for your clients efficiently",
    icon: Building2,
  },
  {
    role: "Recruitment Agency",
    description: "Build candidate lists efficiently",
    icon: UserSearch,
  },
  {
    role: "B2B Marketing Leader",
    description: "Build campaigns faster with quality target lists",
    icon: MessageCircleHeart,
  },
];

export function Navbar() {
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showLogo, setShowLogo] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Determine article based on selected role
  const article = selectedRole === "Agency Owner" ? "an" : "a";

  // Check localStorage for saved role on mount
  useEffect(() => {
    const savedRole = localStorage.getItem(ROLE_STORAGE_KEY);
    if (savedRole) {
      setSelectedRole(savedRole);
    } else {
      setShowRoleModal(true);
    }
  }, []);

  // Handle role selection
  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    localStorage.setItem(ROLE_STORAGE_KEY, role);
    setShowRoleModal(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show logo when at top or scrolling up
      if (currentScrollY < 50) {
        setShowLogo(true);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setShowLogo(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down
        setShowLogo(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav className="border-b border-border bg-background sticky top-0 z-50">
      <div className="flex items-center justify-between h-12 px-6">
        {/* Left: Logo */}
        <div className="flex items-center">
          <Link
            href="/"
            className={`flex items-center gap-2 hover:opacity-80 transition-all duration-300 ${
              showLogo
                ? "opacity-100 scale-100 w-auto"
                : "opacity-0 scale-95 w-0 overflow-hidden"
            }`}
          >
            <Image
              src="/favicon/favicon-32x32.png"
              alt="SalesDuo"
              width={24}
              height={24}
              className="w-6 h-6 flex-shrink-0"
            />
            <span className="text-base font-semibold text-text-primary whitespace-nowrap">
              SalesDuo
            </span>
          </Link>
        </div>

        {/* Center: Role Selector with smooth position transition */}
        {selectedRole && (
          <div
            className={`absolute left-1/2 -translate-x-1/2 transition-all duration-300 ${
              showLogo ? "" : "!left-6 !translate-x-0"
            }`}
          >
            <div className="flex items-center gap-2 text-sm opacity-50">
              <span className="text-text-secondary">I'm {article}</span>
              <div className="inline-block relative">
                <select
                  value={selectedRole}
                  onChange={(e) => handleRoleSelect(e.target.value)}
                  className="p-0 m-0 bg-transparent border-0 border-b border-dashed border-text-muted text-text-secondary hover:text-text-primary appearance-none cursor-pointer hover:border-accent transition-colors focus:outline-none focus:border-accent min-w-0"
                  style={{
                    width: `${selectedRole.length}ch`,
                  }}
                >
                  {roleOptions.map((option) => (
                    <option key={option.role} value={option.role}>
                      {option.role}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <a
            href="#pricing"
            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            Pricing
          </a>
          <a
            href="#examples"
            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            Examples
          </a>

          {/* CTA Button */}
          <Link
            href="/upload"
            className="px-4 py-1.5 bg-cta text-white rounded-lg font-medium hover:bg-cta-hover transition-colors text-sm"
          >
            Start Free →
          </Link>
        </div>
      </div>

      {/* Role Selection Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-[100] flex items-center justify-center">
          <div className="max-w-2xl w-full mx-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-text-primary mb-4">
                Welcome to SalesDuo
              </h2>
              <p className="text-lg text-text-secondary">
                Tell us about yourself to get started
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 max-w-lg mx-auto">
              {roleOptions.map((option) => (
                <button
                  key={option.role}
                  onClick={() => handleRoleSelect(option.role)}
                  className="flex items-center gap-4 p-4 bg-surface border-2 border-border rounded-lg hover:border-accent hover:bg-background transition-all text-left group"
                >
                  <div className="flex-shrink-0">
                    <option.icon className="w-6 h-6 text-text-muted group-hover:text-accent transition-colors" />
                  </div>
                  <div className="flex-1">
                    <div className="text-lg font-semibold text-text-primary mb-1 group-hover:text-accent transition-colors">
                      {option.role}
                    </div>
                    <div className="text-sm text-text-muted">
                      {option.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <p className="text-center text-sm text-text-muted mt-8">
              You can change this anytime from the navbar
            </p>
          </div>
        </div>
      )}
    </nav>
  );
}
