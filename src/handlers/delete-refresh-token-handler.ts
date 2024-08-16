import { prismaClient } from "@/lib/prisma-client"

interface DeleteRefreshTokenHandlerProps {
    refreshToken: string
}

export async function deleteRefreshTokenHandler({ refreshToken }: DeleteRefreshTokenHandlerProps) {
    const refreshTokenExists = await prismaClient.refreshToken.findFirst({
        where: {
            id: refreshToken
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

    await prismaClient.refreshToken.deleteMany({
        where: {
            userId: refreshTokenExists.userId
        }
    })
}