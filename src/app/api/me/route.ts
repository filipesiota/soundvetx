import { NextRequest, NextResponse } from "next/server"
import { decodeJwt } from "jose"

export async function POST(request: NextRequest) {
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

	const id = decodeJwt(token.value).sub

	console.log(id)

	// try {
	// 	const { token, refreshToken, user } = await authenticateUserHandler({
	// 		email,
	// 		password
	// 	})

	// 	return NextResponse.json(
	// 		{
	// 			message: {
	// 				serverMessage: "User authenticated successfully",
	// 				clientMessage: "Usuário autenticado com sucesso."
	// 			},
	// 			data: {
	// 				token,
	// 				refreshToken,
	// 				user
	// 			}
	// 		},
	// 		{ status: 200 }
	// 	)
	// } catch (error: any) {
	// 	return NextResponse.json(error, { status: 400 })
	// }
}
