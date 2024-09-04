import { RequestResponseClient } from "@/types/request";
import { sendRequest } from "@/utils/request";

interface ResetUserPasswordProps {
    userId: number
}

interface ResetUserPasswordResponse {
    newPassword: string
}

export async function resetUserPassword({ userId }: ResetUserPasswordProps) {
    const { message, data }: RequestResponseClient<ResetUserPasswordResponse> = await sendRequest({
        url: `/api/users/${userId}/reset-password`,
        method: "PATCH"
    })

    return {
        message,
        data
    }
}