import { NextRequest, NextResponse } from "next/server";
import { parseCookies } from "nookies";

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		"/((?!login|register|_next/static|_next/image|favicon.ico).*)"
	]
};

export function middleware(request: NextRequest) {
	const { "soundvetx-token": token } = parseCookies({ req: request });

	if (!token) {
		return NextResponse.redirect(new URL("/login", request.url));
	}
}
