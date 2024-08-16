import { RequestResponseClient } from "@/types/request"
import { sendRequest } from "@/utils/request"

interface CanSendWhatsappUserProps {
    userId: string
}

export async function canSendWhatsappUser({ userId }: CanSendWhatsappUserProps) {
    const { message }: RequestResponseClient<undefined> = await sendRequest({
        url: `/api/users/${userId}/can-send-whatsapp`,
        method: "PATCH"
    })

    return {
        message
    }
}