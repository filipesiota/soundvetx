import { NextRequest, NextResponse } from "next/server"

import { RefreshTokenRequest, validateRefreshTokenRequest } from "@/validations/refresh-token-validation"
import { refreshTokenHandler } from "@/handlers/refresh-token-handler"

export default async function POST(request: NextRequest) {
	const body = request.body
	const { data: validationData, error: validationError } = validateRefreshTokenRequest(body)

	if (validationError !== null) {
		return NextResponse.json(validationError, { status: 400 })
	}

	const { refreshToken } = validationData as RefreshTokenRequest

	try {
		const { token, newRefreshToken } = await refreshTokenHandler({ refreshToken })		

		return NextResponse.json(
			{
				message: {
					serverMessage: "Token refreshed successfully",
					clientMessage: "Token atualizado com sucesso."
				},
				data: {
					token,
					newRefreshToken
				}
			},
			{ status: 200 }
		)
	} catch (error: any) {
		return NextResponse.json(error, { status: 401 })
	}
}
