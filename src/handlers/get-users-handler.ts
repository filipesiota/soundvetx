import { prismaClient } from "@/lib/prisma-client"
import { GetUserHandlerResponse } from "@/handlers/get-user-handler"

export async function getUsersHandler() {
	const users = await prismaClient.user.findMany({
		include: {
			veterinarian: true
		},
        orderBy: {
            name: 'asc'
        }
	})

	return users.map(user =>{
		return {
            id: user.id,
            name: user.name,
            email: user.email,
            crmv: user.veterinarian?.crmv,
            uf: user.veterinarian?.uf,
            canSendWhatsapp: user.canSendWhatsapp,
            type: user.type,
            isActive: user.isActive
        }
	}) as GetUserHandlerResponse[]
}
