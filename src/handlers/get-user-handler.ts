import { prismaClient } from "@/lib/prisma-client"

interface GetUserHandlerProps {
	userId: number
}

interface GetUserHandlerResponse {
    id: number
    name: string
    email: string
    crmv?: string
    uf?: string
    canSendWhatsapp: boolean
    type: string
}

export async function getUserHandler({ userId }: GetUserHandlerProps) {
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
			}
		}
	}

	return {
		id: user.id,
		name: user.name,
		email: user.email,
		crmv: user.veterinarian?.crmv,
		uf: user.veterinarian?.uf,
		canSendWhatsapp: user.canSendWhatsapp,
		type: user.type
	} as GetUserHandlerResponse
}
