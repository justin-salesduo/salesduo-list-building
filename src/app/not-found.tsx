"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * 404 Not Found Page
 *
 * Automatically redirects users back to the home page
 * when they try to access a non-existent route.
 */
export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home page after a brief moment
    const timeout = setTimeout(() => {
      router.replace("/");
    }, 1000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-text-primary mb-4">404</h1>
        <p className="text-xl text-text-secondary mb-6">Page not found</p>
        <p className="text-sm text-text-muted">Redirecting to home...</p>
      </div>
    </div>
  );
}
