import { RequestResponse } from "@/types/request"
import { User } from "@/types/user"
import { sendRequest } from "@/utils/request"

interface RefreshUserData {
    user: User
}

export async function refreshUserData() {
    const { message, data }: RequestResponse<RefreshUserData> = await sendRequest({
        url: "/api/me",
        method: "POST"
    })

    return {
        message,
        data
    }
}