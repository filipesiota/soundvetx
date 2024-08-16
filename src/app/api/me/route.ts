import { NextRequest, NextResponse } from "next/server"
import { decodeJwt } from "jose"
import { getUserHandler } from "@/handlers/get-user-handler"

export async function GET(request: NextRequest) {
	const token = request.cookies.get("soundvetx-token")

	if (!token?.value) {
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

	const sub = decodeJwt(token.value).sub ?? "0"
	const userId = Number(sub)

	try {
		const user = await getUserHandler({ userId })

		return NextResponse.json(
			{
				message: {
					serverMessage: "User found",
					clientMessage: "Usuário encontrado."
				},
				data: {
					user
				}
			},
			{ status: 200 }
		)
	} catch (error: any) {
		return NextResponse.json(error, { status: 404 })
	}
}
