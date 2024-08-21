import { hash } from "bcrypt"

import { prismaClient } from "@/lib/prisma-client"
import { UserCreateForm } from "@/schemas/user-schema"
import { User, UserType } from "@/types/user"

export async function createUserHandler({ type, fullName, email, password, confirmPassword, ...props }: UserCreateForm) {
    const isVeterinarian = (type === UserType.Veterinarian) && ("crmv" in props) && ("uf" in props)

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

    if (isVeterinarian) {
        const veterinarianAlreadyExists = await prismaClient.veterinarian.findFirst({
            where: {
                crmv: props.crmv,
                uf: props.uf
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

    if (isVeterinarian) {
        const veterinarian = await prismaClient.veterinarian.create({
            data: {
                user: {
                    create: {
                        name: fullName,
                        email,
                        password: passwordHash
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

    const user = await prismaClient.user.create({
        data: {
            name: fullName,
            email,
            password: passwordHash
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

