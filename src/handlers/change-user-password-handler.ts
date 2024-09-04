import { compare, hash } from "bcrypt"

import { prismaClient } from "@/lib/prisma-client"
import { PasswordChangeForm } from "@/schemas/password-schema"

interface ChangeUserPasswordHandlerProps {
    userId: number
    values: PasswordChangeForm
}

export async function changeUserPasswordHandler({ userId, values }: ChangeUserPasswordHandlerProps) {
    const { currentPassword, newPassword, confirmNewPassword } = values

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

    const passwordMatch = await compare(currentPassword, userExists.password)

    if (!passwordMatch) {
        throw {
            message: {
                serverMessage: "Current password is incorrect",
                clientMessage: "A senha atual está incorreta."
            },
            status: 400
        }
    }

    if (newPassword !== confirmNewPassword) {
        throw {
            message: {
                serverMessage: "Passwords do not match",
                clientMessage: "As senhas informadas não coincidem."
            },
            status: 400
        }
    }

    const passwordHash = await hash(newPassword, 8)

    await prismaClient.user.update({
        where: {
            id: userId
        },
        data: {
            password: passwordHash
        }
    })
}
