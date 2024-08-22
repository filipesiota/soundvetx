import { UserCreateForm } from "@/schemas/user-schema";
import { RequestResponseClient } from "@/types/request";
import { User } from "@/types/user";
import { sendRequest } from "@/utils/request";

interface CreateUserResponseData {
    user: User
}

export async function createUser({ type, fullName, email, password, confirmPassword, ...props }: UserCreateForm) {
    const { message, data }: RequestResponseClient<CreateUserResponseData> = await sendRequest({
        url: "/api/users",
        method: "POST",
        data: {
            type,
            fullName,
            email,
            password,
            confirmPassword,
            ...props
        }
    })

    return {
        message,
        data
    }
}