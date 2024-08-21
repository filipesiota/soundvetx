import { UserUpdateForm } from "@/schemas/user-schema";
import { RequestResponseClient } from "@/types/request";
import { User } from "@/types/user";
import { sendRequest } from "@/utils/request";

interface UpdateUserProps {
    userId: number
    values: UserUpdateForm
}

interface UpdateUserResponseData {
    user: User
}

export async function updateUser({ userId, values }: UpdateUserProps) {
    const { type, fullName, email, ...props } = values

    const { message, data }: RequestResponseClient<UpdateUserResponseData> = await sendRequest({
        url: `/api/users/${userId}`,
        method: "PUT",
        data: {
            type,
            fullName,
            email,
            ...props
        }
    })

    return {
        message,
        data
    }
}