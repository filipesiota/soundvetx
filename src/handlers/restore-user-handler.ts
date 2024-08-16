import { prismaClient } from "@/lib/prisma-client"

interface RestoreUserHandlerProps {
    userId: number
}

export async function restoreUserHandler({ userId }: RestoreUserHandlerProps) {
    const user = await prismaClient.user.findFirst({
        where: {
            id: userId
        }
    })

    if (!user) {
        throw {
            message: {
                serverMessage: "User not found",
                clientMessage: "Usuário não encontrado."
            },
            status: 404
        }
    }

    await prismaClient.user.update({
        where: {
            id: userId
        },
        data: {
            isActive: true
        }
    })
}