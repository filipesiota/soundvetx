import dayjs from "dayjs"

import { prismaClient } from "@/lib/prisma-client"

interface GenerateRefreshTokenProviderProps {
	userId: number
}

export async function generateRefreshTokenProvider({ userId }: GenerateRefreshTokenProviderProps) {
	const expiresIn = dayjs().add(2, "day").unix()

	const generatedRefreshToken = await prismaClient.refreshToken.create({
		data: {
			userId,
			expiresIn
		}
	})

	return generatedRefreshToken
}
