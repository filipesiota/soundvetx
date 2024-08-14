import { RequestResponseClient } from "@/types/request";
import { User } from "@/types/user";
import { sendRequest } from "@/utils/request";

interface GetUsersResponseData {
    users: User[]
}

export async function getUsers() {
    const { message, data }: RequestResponseClient<GetUsersResponseData> = await sendRequest({
        url: "/api/users",
        method: "GET"
    })

    return {
        message,
        data
    }
}