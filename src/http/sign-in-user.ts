import { Login } from "@/schemas/login-schema";
import { RequestResponseClient } from "@/types/request";
import { User } from "@/types/user";
import { sendRequest } from "@/utils/request";

interface SignInResponseData {
    token: string
    refreshToken: string
    user: User
}

export async function signInUser({ email, password }: Login) {
    const { message, data }: RequestResponseClient<SignInResponseData> = await sendRequest({
        url: "/api/login",
        method: "POST",
        data: {
            email,
            password
        }
    })

    return {
        message,
        data
    }
}