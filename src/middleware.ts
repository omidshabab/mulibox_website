import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { defaultLocale, locales } from "./config";

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isAppRoute =
    pathname === "/cards" ||
    pathname === "/boxes" ||
    pathname === "/collections" ||
    pathname === "/status" ||
    pathname.startsWith("/cards/") ||
    pathname.startsWith("/boxes/") ||
    pathname.startsWith("/collections/") ||
    pathname.startsWith("/status/");

  const intlMiddleware = createMiddleware({
    locales,
    defaultLocale,
    localeDetection: true,
    localePrefix: "as-needed",
  });

  if (isAppRoute) {
    request.headers.set("x-app-route", "true");
    return NextResponse.next({ request: { headers: request.headers } });
  } else {
    return intlMiddleware(request);
  }
}

export const config = {
  // Match only internationalized pathnames
  matcher: [
    "/",
    "/(en)/:path*",
    "/guide",
    "/guide/:path*",
    "/community",
    "/community/:path*",
    "/register",
    "/cards/:path*",
  ],
};
