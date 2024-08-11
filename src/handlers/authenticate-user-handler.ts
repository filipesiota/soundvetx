import { compare } from "bcrypt"

import { prismaClient } from "@/lib/prisma-client"
import { generateRefreshTokenProvider } from "@/providers/generate-refresh-token-provider"
import { generateTokenProvider } from "@/providers/generate-token-provider"

interface AuthenticateUserHandlerProps {
	email: string
	password: string
}

interface AuthenticateUserHandlerResponse {
	token: string
	refreshToken: string
	user: {
		id: string
		name: string
		email: string
		crmv: string | null
		uf: string | null
		canSendWhatsapp: boolean
		type: string
	}
}

export async function authenticateUserHandler({ email, password }: AuthenticateUserHandlerProps) {
	const user = await prismaClient.user.findFirst({
		where: {
			email
		},
		include: {
			veterinarian: true
		}
	})

	if (!user) {
		throw {
			message: {
				serverMessage: "Invalid credentials",
				clientMessage: "Credenciais inválidas."
			}
		}
	}

	const passwordMatch = await compare(password, user.password)

	if (!passwordMatch) {
		throw {
			message: {
				serverMessage: "Invalid credentials",
				clientMessage: "Credenciais inválidas."
			}
		}
	}

	const token = generateTokenProvider(user.id)

	await prismaClient.refreshToken.deleteMany({
		where: {
			userId: user.id
		}
	})

	const refreshToken = await generateRefreshTokenProvider(user.id)

	return {
		token,
		refreshToken: refreshToken.id,
		user: {
			id: user.id,
			name: user.name,
			email: user.email,
			crmv: user.veterinarian?.crmv,
			uf: user.veterinarian?.uf,
			canSendWhatsapp: user.canSendWhatsapp,
			type: user.type
		}
	} as AuthenticateUserHandlerResponse
}
