import { PasswordChangeForm } from "@/schemas/password-schema";
import { RequestResponseClient } from "@/types/request";
import { sendRequest } from "@/utils/request";

interface ChangeUserPasswordProps {
    userId: number
    values: PasswordChangeForm
}

export async function changeUserPassword({ userId, values }: ChangeUserPasswordProps) {
    const { message }: RequestResponseClient<undefined> = await sendRequest({
        url: `/api/users/${userId}/change-password`,
        method: "PATCH",
        data: values
    })

    return {
        message
    }
}