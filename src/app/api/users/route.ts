import { NextRequest, NextResponse } from "next/server"

import { createVeterinarianHandler } from "@/handlers/create-veterinarian-handler"
import { validateVeterinarian, Veterinarian } from "@/schemas/veterinarian-schema"
import { getUsersHandler } from "@/handlers/get-users-handler"

export async function POST(request: NextRequest) {
	const body = await request.json()
	const { data: validationData, error: validationError } = validateVeterinarian(body)

	if (validationError !== null) {
		return NextResponse.json(validationError, { status: 400 })
	}

	const { fullName, crmv, uf, email, password, confirmPassword } = validationData as Veterinarian

	try {
		const user = await createVeterinarianHandler({
			fullName,
			crmv,
			uf,
			email,
			password,
			confirmPassword
		})

		return NextResponse.json(
			{
				message: {
					serverMessage: "User registered successfully",
					clientMessage: "Usuário cadastrado com sucesso."
				},
				data: {
					user
				}
			},
			{ status: 200 }
		)
	} catch (error: any) {
		return NextResponse.json(error, { status: 400 })
	}
}

export async function GET() {
	try {
		const users = await getUsersHandler()

		return NextResponse.json(
			{
				message: {
					serverMessage: "Users found",
					clientMessage: "Usuários encontrados."
				},
				data: {
					users
				}
			},
			{ status: 200 }
		)
	} catch (error: any) {
		return NextResponse.json(
			{
				message: {
					serverMessage: error.message ?? "Internal server error",
					clientMessage: "Ocorreu um erro interno no servidor."
				}
			},
			{ status: 500 }
		)
	}
}
