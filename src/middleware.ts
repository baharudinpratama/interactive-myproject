import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// Define redirects that need to preserve locale
const redirects: Record<string, string> = {
  "/": "/sign-in",
  "/master/product": "/coming-soon",
  "/master/team": "/coming-soon",
  "/master/authorization": "/coming-soon",
  "/personal-task": "/coming-soon",
};

export default function middleware(req: NextRequest): NextResponse {
  const { pathname } = req.nextUrl;
  const localeFromCookie = req.cookies.get("NEXT_LOCALE")?.value;

  // Determine locale: Use cookie first, otherwise fallback to default
  let locale = routing.locales.includes(localeFromCookie!)
    ? localeFromCookie
    : routing.defaultLocale;

  console.log("[Middleware] Detected locale:", locale);
  console.log("[Middleware] Incoming pathname:", pathname);

  // 🚀 Step 1: Redirect "/" to "/{locale}/sign-in"
  if (pathname === "/") {
    console.log(`[Middleware] Redirecting / → /${locale}/sign-in`);
    return NextResponse.redirect(new URL(`/${locale}/sign-in`, req.url));
  }

  // 🚀 Step 2: Apply redirects while ensuring a locale prefix
  if (redirects[pathname]) {
    console.log(`[Middleware] Redirecting ${pathname} → /${locale}${redirects[pathname]}`);
    return NextResponse.redirect(new URL(`/${locale}${redirects[pathname]}`, req.url));
  }

  // 🚀 Step 3: Ensure every URL starts with a locale (if missing)
  const isMissingLocale = !routing.locales.some((loc) =>
    pathname.startsWith(`/${loc}`)
  );

  if (isMissingLocale) {
    console.log(`[Middleware] Locale missing, redirecting ${pathname} → /${locale}${pathname}`);
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, req.url));
  }

  console.log("[Middleware] Passing request to next-intl");
  return intlMiddleware(req);
}

// Apply only to relevant routes
export const config = {
  matcher: ["/", "/(id|en)/:path*"],
};
