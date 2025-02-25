import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = {
  locales: ["en", "id"], // Supported locales
  defaultLocale: "en", // Default fallback locale
  localeDetection: true, // Auto-detect user locale

  redirects: {
    "/": "/sign-in",
  },
};

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
