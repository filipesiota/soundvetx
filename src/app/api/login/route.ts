import { authenticateUserHandler } from "@/handlers/authenticate-user-handler"
import { validateLogin, Login } from "@/schemas/login-schema"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
	const body = await request.json()
	const { data: validationData, error: validationError } = validateLogin(body)

	if (validationError !== null) {
		return NextResponse.json(validationError, { status: 400 })
	}

	const { email, password } = validationData as Login

	try {
		const { token, refreshToken, user } = await authenticateUserHandler({
			email,
			password
		})

		return NextResponse.json(
			{
				message: {
					serverMessage: "User authenticated successfully",
					clientMessage: "Usuário autenticado com sucesso."
				},
				data: {
					token,
					refreshToken,
					user
				}
			},
			{ status: 200 }
		)
	} catch (error: any) {
		return NextResponse.json(error, { status: 400 })
	}
}
