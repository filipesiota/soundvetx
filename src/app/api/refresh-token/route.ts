import { NextRequest, NextResponse } from "next/server"

import { refreshTokenHandler } from "@/handlers/refresh-token-handler"
import { setRefreshTokenCookie, setTokenCookie } from "@/utils/cookies"

export async function POST(request: NextRequest) {
	const refreshToken = request.cookies.get("soundvetx-refresh-token")

	try {
		const { token, newRefreshToken } = await refreshTokenHandler({ refreshToken: refreshToken?.value ?? "" })

		const response = NextResponse.json(
			{
				message: {
					serverMessage: "Token refreshed successfully",
					clientMessage: "Token atualizado com sucesso."
				},
				data: true
			},
			{ status: 200 }
		)

		setTokenCookie({ res: response, value: token })

		if (newRefreshToken) {
			setRefreshTokenCookie({ res: response, value: newRefreshToken })
		}

		return response
	} catch (error: any) {
		return NextResponse.json(error, { status: 401 })
	}
}
