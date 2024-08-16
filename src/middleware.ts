import { decodeJwt, jwtVerify } from "jose"
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

const apiRoutes = {
	unauthenticated: [
		{
			path: "/api/sign-in",
			allowedMethods: ["POST"]
		},
		{
			path: "/api/refresh-token",
			allowedMethods: ["POST"]
		},
		{
			path: "/api/users",
			allowedMethods: ["POST"]
		}
	],
	admin: [
		{
			path: "/api/users",
			allowedMethods: ["GET", "DELETE", "PATCH", "PUT"]
		}
	]
}

const appRoutes = {
	unauthenticated: [
		"/login",
		"/register"
	],
	admin: [
		"/users"
	]
}

const unauthorizedApiResponse = NextResponse.json(
	{
		message: {
			serverMessage: "Unauthorized access",
			clientMessage: "Você não tem permissão para acessar este recurso."
		}
	},
	{ status: 401 }
)

export async function middleware(request: NextRequest) {
	const method = request.method
	const pathName = request.nextUrl.pathname
	const isApiRoute = pathName.includes("/api")

	if (isApiRoute) {
		const isUnauthenticatedRoute = apiRoutes.unauthenticated.some(route => {
			return pathName.includes(route.path) && route.allowedMethods.includes(method)
		})

		// Allow unauthenticated routes to pass through
		if (isUnauthenticatedRoute) {
			return NextResponse.next()
		}

		const authToken = request.cookies.get("soundvetx-token")

		if (!authToken) {
			return unauthorizedApiResponse
		}

		const encoder = new TextEncoder()
		const secret = encoder.encode(process.env.JWT_SECRET)
		const { value: jwt } = authToken

		try {
			await jwtVerify(jwt, secret)

			const isAdminRoute = apiRoutes.admin.some(route => {
				return pathName.includes(route.path) && route.allowedMethods.includes(method)
			})

			// Check if user has admin permission to access the route
			if (isAdminRoute) {
				const payload = decodeJwt(jwt)

				if (!payload.admin) {
					return unauthorizedApiResponse
				}
			}

			// Allow authenticated routes to pass through
			return NextResponse.next()
		} catch {
			return unauthorizedApiResponse
		}
	}

	const authToken = request.cookies.get("soundvetx-token")
	const refreshToken = request.cookies.get("soundvetx-refresh-token")
	const isUnauthenticatedRoute = appRoutes.unauthenticated.some(route => {
		return pathName.includes(route)
	})

	// Allow unauthenticated routes to pass through
	if (isUnauthenticatedRoute) {
		if (refreshToken) {
			return NextResponse.redirect(new URL("/login", request.url))
		}

		return NextResponse.next()
	}

	// Redirect to login page if user is not authenticated
	if (!authToken) {
		return NextResponse.redirect(new URL("/login", request.url))
	}

	const encoder = new TextEncoder()
	const secret = encoder.encode(process.env.JWT_SECRET)
	const { value: jwt } = authToken

	try {
		await jwtVerify(jwt, secret)

		const isAdminRoute = appRoutes.admin.some(route => {
			return pathName.includes(route)
		})

		// Check if user has admin permission to access the route
		if (isAdminRoute) {
			const payload = decodeJwt(jwt)

			if (!payload.admin) {
				return NextResponse.redirect(new URL("/", request.url))
			}
		}

		// Allow authenticated routes to pass through
		return NextResponse.next()
	} catch {
		return NextResponse.redirect(new URL("/login", request.url))
	}
}
