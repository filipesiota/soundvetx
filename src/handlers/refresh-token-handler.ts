import dayjs from "dayjs"

import { prismaClient } from "@/lib/prisma-client"
import { generateRefreshTokenProvider } from "@/providers/generate-refresh-token-provider"
import { generateTokenProvider } from "@/providers/generate-token-provider"

interface RefreshTokenHandlerProps {
    refreshToken: string
}

interface RefreshTokenHandlerResponse {
    token: string
    newRefreshToken?: string
}

export async function refreshTokenHandler({ refreshToken }: RefreshTokenHandlerProps) {
    const refreshTokenExists = await prismaClient.refreshToken.findFirst({
        where: {
            id: refreshToken
        },
        include: {
            user: true
        }
    })

    if (!refreshTokenExists) {
        throw {
            message: {
                serverMessage: "Refresh token invalid",
                clientMessage: "Você não tem permissão para acessar este recurso."
            }
        }
    }

    const token = await generateTokenProvider({
        userId: refreshTokenExists.user.id.toString(),
        userType: refreshTokenExists.user.type
    })

    const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshTokenExists.expiresIn))

    if (refreshTokenExpired) {
        await prismaClient.refreshToken.deleteMany({
            where: {
                userId: refreshTokenExists.userId
            }
        })

        const newRefreshToken = await generateRefreshTokenProvider({ userId: refreshTokenExists.userId })

        return {
            token: token,
            newRefreshToken: newRefreshToken.id
        } as RefreshTokenHandlerResponse
    }

    return { token: token.toString() } as RefreshTokenHandlerResponse
}