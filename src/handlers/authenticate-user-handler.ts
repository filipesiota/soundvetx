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
		id: number
		name: string
		email: string
		crmv: string | null
		uf: string | null
		canSendWhatsapp: boolean
		type: string
		isActive: boolean
	}
}

export async function authenticateUserHandler({ email, password }: AuthenticateUserHandlerProps) {
	const user = await prismaClient.user.findFirst({
		where: {
			email,
			isActive: true
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

	const token = await generateTokenProvider({
		userId: user.id.toString(),
		userType: user.type,
		userCanSendWhatsapp: user.canSendWhatsapp
	})

	await prismaClient.refreshToken.deleteMany({
		where: {
			userId: user.id
		}
	})

	const refreshToken = await generateRefreshTokenProvider({ userId: user.id })

	return {
		token: token,
		refreshToken: refreshToken.id,
		user: {
			id: user.id,
			name: user.name,
			email: user.email,
			crmv: user.veterinarian?.crmv,
			uf: user.veterinarian?.uf,
			canSendWhatsapp: user.canSendWhatsapp,
			type: user.type,
			isActive: user.isActive
		}
	} as AuthenticateUserHandlerResponse
}
