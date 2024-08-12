import { RequestResponse } from "@/types/request";
import { sendRequest } from "@/utils/request";

export async function signOutUser() {
    const { message }: RequestResponse<null> = await sendRequest({
        url: "/api/sign-out",
        method: "POST"
    })

    return {
        message
    }
}