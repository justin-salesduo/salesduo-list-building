'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function Navbar() {
  const [selectedRole, setSelectedRole] = useState<string>('Agency Owner');

  // Determine article based on selected role
  const article = selectedRole === 'Agency Owner' ? 'an' : 'a';

  return (
    <nav className="border-b border-border bg-background sticky top-0 z-50">
      <div className="flex items-center justify-between h-12 px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Image
            src="/favicon/favicon-32x32.png"
            alt="SalesDuo"
            width={24}
            height={24}
            className="w-6 h-6"
          />
          <span className="text-base font-semibold text-text-primary">
            SalesDuo
          </span>
        </Link>

        {/* Role Selector - Hidden for now */}
        {/* <div className="flex items-center gap-2 text-sm">
          <span className="text-text-secondary">I'm {article}</span>
          <div className="inline-block relative">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="p-0 m-0 bg-transparent border-0 border-b border-dashed border-text-muted text-text-secondary hover:text-text-primary appearance-none cursor-pointer hover:border-accent transition-colors focus:outline-none focus:border-accent min-w-0"
              style={{
                width: `${selectedRole.length}ch`,
              }}
            >
              <option value="Agency Owner">Agency Owner</option>
              <option value="Sales Leader">Sales Leader</option>
              <option value="Marketing Leader">Marketing Leader</option>
            </select>
          </div>
        </div> */}

        {/* CTA Button */}
        <Link
          href="/upload"
          className="px-4 py-1.5 bg-cta text-white rounded-lg font-medium hover:bg-cta-hover transition-colors text-sm"
        >
          Get Quote
        </Link>
      </div>
    </nav>
  );
}
