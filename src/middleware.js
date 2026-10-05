import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request) {
  const sessionCookie = getSessionCookie(request);
  const { pathname } = request.nextUrl;

  // Jodi user login na thake ebong se jodi login, register ba sign-up page-e na thake
  if (
    !sessionCookie &&
    pathname !== "/login" &&
    pathname !== "/register" &&
    !pathname.startsWith("/sign-up")
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Jodi user already login thake, tokhon abar login ba register page-e jete chaile home page-e pathiye dibe
  if (
    sessionCookie &&
    (pathname === "/login" || pathname === "/register" || pathname.startsWith("/sign-up"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon)
     * - public folder images (jpg, jpeg, png, svg, webp, gif etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:jpg|jpeg|png|svg|webp|gif)).*)",
  ],
};