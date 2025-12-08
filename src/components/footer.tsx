"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <footer className="h-12 bg-surface border-t border-border relative">
      <div className="flex items-center justify-between h-full px-6">
        {/* Logo / Brand */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-text-primary">
            SalesDuo
          </span>
          <span className="text-xs text-text-muted">•</span>
          <span className="text-xs text-text-secondary">
            Build custom target lists with any data source
          </span>
        </div>

        {/* Links & Copyright */}
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#how-it-works"
              className="text-xs text-text-secondary hover:text-text-primary transition-colors"
            >
              Why SalesDuo
            </a>
            <a
              href="#pricing"
              className="text-xs text-text-secondary hover:text-text-primary transition-colors"
            >
              Pricing
            </a>
            <a
              href="#examples"
              className="text-xs text-text-secondary hover:text-text-primary transition-colors"
            >
              Examples
            </a>
          </nav>

          <div className="text-xs text-text-muted">
            © {currentYear} SalesDuo
          </div>

          {/* Vertical Divider */}
          <div className="h-4 w-px bg-border"></div>

          {/* Menu Button */}
          <div
            className="relative"
            onMouseEnter={() => setShowMenu(true)}
            onMouseLeave={() => setShowMenu(false)}
          >
            <button
              className="p-0.5 text-text-muted hover:text-text-secondary transition-colors opacity-60 hover:opacity-100"
              aria-label="Legal menu"
            >
              <Menu className="w-3 h-3" />
            </button>

            {/* Hover Menu */}
            {showMenu && (
              <div className="absolute bottom-full right-0 pb-1">
                <div className="bg-background border border-border rounded shadow py-1 min-w-[100px]">
                  <a
                    href="/terms"
                    className="block px-3 py-1.5 text-xs text-text-muted hover:text-text-primary hover:bg-surface transition-colors"
                  >
                    Terms
                  </a>
                  <a
                    href="/privacy"
                    className="block px-3 py-1.5 text-xs text-text-muted hover:text-text-primary hover:bg-surface transition-colors"
                  >
                    Privacy
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
