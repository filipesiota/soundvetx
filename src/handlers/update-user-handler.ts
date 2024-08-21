import { prismaClient } from "@/lib/prisma-client"
import { UserUpdateForm } from "@/schemas/user-schema"
import { User, UserType } from "@/types/user"

interface UserUpdateHandler {
    userId: number
    values: UserUpdateForm
}

export async function updateUserHandler({ userId, values }: UserUpdateHandler) {
    const { type, fullName, email, ...props } = values
    const isVeterinarian = (type === UserType.Veterinarian) && ("crmv" in props) && ("uf" in props)

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

    if (email) {
        const emailAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email,
                NOT: {
                    id: userId
                }
            }
        })

        if (emailAlreadyExists) {
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

    if (isVeterinarian) {
        const veterinarianAlreadyExists = await prismaClient.veterinarian.findFirst({
            where: {
                crmv: props.crmv,
                uf: props.uf,
                NOT: {
                    userId
                }
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

    if (isVeterinarian) {
        const veterinarian = await prismaClient.veterinarian.update({
            where: {
                userId
            },
            data: {
                user: {
                    update: {
                        name: fullName,
                        email
                    }
                },
                crmv: props.crmv,
                uf: props.uf
            },
            include: {
                user: true
            }
        })

        return {
            id: veterinarian.user.id,
            name: veterinarian.user.name,
            email: veterinarian.user.email,
            crmv: veterinarian.crmv,
            uf: veterinarian.uf,
            canSendWhatsapp: veterinarian.user.canSendWhatsapp,
            type,
            isActive: veterinarian.user.isActive
        } as User
    }

    const user = await prismaClient.user.update({
        where: {
            id: userId
        },
        data: {
            name: fullName,
            email
        }
    })

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        canSendWhatsapp: user.canSendWhatsapp,
        type,
        isActive: user.isActive
    } as User
}