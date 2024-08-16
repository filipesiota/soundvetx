import { prismaClient } from "@/lib/prisma-client"

interface UpdateUserHandlerProps {
    userId: number
    name?: string
    email?: string
    crmv?: string
    uf?: string
    canSendWhatsapp?: boolean
    type?: string
}

export async function updateUserHandler({ userId, name, email, crmv, uf, canSendWhatsapp, type }: UpdateUserHandlerProps) {
    const user = await prismaClient.user.findFirst({
        where: {
            id: userId
        },
        include: {
            veterinarian: true
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

    if (email) {
        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email
            }
        })

        if (userAlreadyExists) {
            throw {
                message: {
                    serverMessage: "Email address already exists",
                    clientMessage:
                        "O endereço de e-mail informado já existe em nossa base de dados."
                },
                status: 400
            }
        }
    }

    if (crmv || uf) {
        const veterinarianAlreadyExists = await prismaClient.veterinarian.findFirst({
            where: {
                crmv: crmv ?? user.veterinarian?.crmv,
                uf: uf ?? user.veterinarian?.uf
            }
        })

        if (veterinarianAlreadyExists) {
            throw {
                message: {
                    serverMessage: "Veterinarian already exists",
                    clientMessage:
                        "Um veterinário com o CRMV informado na UF selecionada já existe em nossa base de dados."
                },
                status: 400
            }
        }
    }

    await prismaClient.user.update({
        where: {
            id: userId
        },
        data: {
            name,
            email,
            veterinarian: {
                update: {
                    crmv,
                    uf
                }
            },
            canSendWhatsapp,
            type
        }
    })
}