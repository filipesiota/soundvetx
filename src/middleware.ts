import { Secret, verify } from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server"

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
}

export function middleware(request: NextRequest) {
	const pathName = request.nextUrl.pathname
	const method = request.method

	if (pathName.includes("/api")) {
		if (
			pathName.includes("/login") ||
			pathName.includes("/refresh-token") ||
			(pathName.includes("/users") && method === "POST")
		) {
			return NextResponse.next()
		}

		const authToken = request.headers.get("Authorization")

		if (!authToken) {
			return NextResponse.json(
				{
					message: {
						serverMessage: "User is not authenticated",
						clientMessage: "Você não tem permissão para acessar este recurso."
					}
				},
				{ status: 401 }
			)
		}

		const [, token] = authToken.split(" ")

		try {
			verify(token, process.env.JWT_SECRET as Secret)

			return NextResponse.next()
		} catch (error: any) {
			return NextResponse.json(
				{
					message: {
						serverMessage: "Unauthorized access",
						clientMessage: "Você não tem permissão para acessar este recurso."
					}
				},
				{ status: 401 }
			)
		}
	}

	const token = request.cookies.get("soundvetx-token")

	if (!token?.value) {
		return NextResponse.redirect(new URL("/login", request.url))
	}

	return NextResponse.next()
}
