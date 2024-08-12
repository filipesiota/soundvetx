import { generateSecret, jwtVerify, KeyLike } from "jose"
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
		"/((?!_next/static|_next/image|favicon.ico).*)"
	]
}

export async function middleware(request: NextRequest) {
	const pathName = request.nextUrl.pathname
	const method = request.method

	if (pathName.includes("/api")) {
		if (
			pathName.includes("/sign-in") ||
			pathName.includes("/refresh-token") ||
			(pathName.includes("/users") && method === "POST")
		) {
			return NextResponse.next()
		}

		const authToken = request.cookies.get("soundvetx-token")

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

		const secret = new TextEncoder().encode(process.env.JWT_SECRET)

		try {
			await jwtVerify(authToken.value, secret)

			return NextResponse.next()
		} catch (error: any) {
			console.log(error)
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
	const refreshToken = request.cookies.get("soundvetx-refresh-token")

	if (pathName.includes("/login") || pathName.includes("/register")) {
		if (refreshToken) {
			return NextResponse.redirect(new URL("/", request.url))
		}

		return NextResponse.next()
	}

	if (!token && !refreshToken) {
		return NextResponse.redirect(new URL("/login", request.url))
	}

	return NextResponse.next()
}
