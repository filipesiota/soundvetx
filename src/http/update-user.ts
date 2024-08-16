import { RequestResponseClient } from "@/types/request";
import { sendRequest } from "@/utils/request";

interface UpdateUserProps {
    userId: string
    name?: string
    email?: string
    crmv?: string
    uf?: string
    canSendWhatsapp?: boolean
    type?: string
}

export async function updateUser({ userId, name, email, crmv, uf, canSendWhatsapp, type }: UpdateUserProps) {
    const { message }: RequestResponseClient<boolean> = await sendRequest({
        url: `/api/users/${userId}`,
        method: "PUT",
        data: {
            name,
            email,
            crmv,
            uf,
            canSendWhatsapp,
            type
        }
    })

    return {
        message
    }
}