import { Veterinarian } from "@/schemas/veterinarian-schema";
import { RequestResponse } from "@/types/request";
import { User } from "@/types/user";
import { sendRequest } from "@/utils/request";

interface SignUpResponseData {
    user: User
}

export async function signUpUser({ fullName, crmv, uf, email, password, confirmPassword }: Veterinarian) {
    const { message, data }: RequestResponse<SignUpResponseData> = await sendRequest({
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