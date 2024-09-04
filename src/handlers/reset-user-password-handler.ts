import { hash } from "bcrypt"

import { prismaClient } from "@/lib/prisma-client"
import { generateRandomPasswordProvider } from "@/providers/generate-random-password-provider"

interface ResetUserPasswordHandlerProps {
    userId: number
}

export async function resetUserPasswordHandler({ userId }: ResetUserPasswordHandlerProps) {
    const userExists = await prismaClient.user.findFirst({
        where: {
            id: userId
        },
        include: {
            veterinarian: true
        }
    })

    if (!userExists) {
        throw {
            message: {
                serverMessage: "User not found",
                clientMessage: "Usuário não encontrado."
            },
            status: 404
        }
    }
    
    const randomPassword = generateRandomPasswordProvider()
    const passwordHash = await hash(randomPassword, 8)

    await prismaClient.user.update({
        where: {
            id: userId
        },
        data: {
            password: passwordHash
        }
    })

    await prismaClient.refreshToken.deleteMany({
        where: {
            userId
        }
    })

    return {
        newPassword: randomPassword
    }
}
