import { prismaClient } from "@/lib/prisma-client"

interface CanSendWhatsappUserHandlerProps {
    userId: number
}

export async function canSendWhatsappUserHandler({ userId }: CanSendWhatsappUserHandlerProps) {
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
            }
        }
    }

    await prismaClient.user.update({
        where: {
            id: userId
        },
        data: {
            canSendWhatsapp: !user.canSendWhatsapp
        }
    })
}