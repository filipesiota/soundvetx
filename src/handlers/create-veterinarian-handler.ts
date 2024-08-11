import { hash } from "bcrypt"

import { prismaClient } from "@/lib/prisma-client"
import { Veterinarian } from "@/schemas/veterinarian-schema"

interface CreateVeterinarianHandlerResponse {
    id: string
    name: string
    email: string
    crmv: string
    uf: string
    canSendWhatsapp: boolean
    type: string
}

export async function createVeterinarianHandler({ fullName, crmv, uf, email, password, confirmPassword }: Veterinarian) {
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
            }
        }
    }

    const veterinarianAlreadyExists = await prismaClient.veterinarian.findFirst({
        where: {
            crmv,
            uf
        }
    })

    if (veterinarianAlreadyExists) {
        throw {
            message: {
                serverMessage: "Veterinarian already exists",
                clientMessage:
                    "Um veterinário com o CRMV informado na UF selecionada já existe em nossa base de dados."
            }
        }
    }

    if (password !== confirmPassword) {
        throw {
            message: {
                serverMessage: "Passwords do not match",
                clientMessage: "As senhas informadas não coincidem."
            }
        }
    }

    const passwordHash = await hash(password, 8)

    const veterinarian = await prismaClient.veterinarian.create({
        data: {
            user: {
                create: {
                    name: fullName,
                    email,
                    password: passwordHash
                }
            },
            crmv,
            uf
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
        type: veterinarian.user.type
    } as CreateVeterinarianHandlerResponse
}