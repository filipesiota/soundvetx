import { ExamRequest } from "@/schemas/exam-request-schema";
import { RequestResponseClient } from "@/types/request";
import { sendRequest } from "@/utils/request";

interface ExamRequestResponseData {
    url: string
}

export async function generateExamRequest({ ...props }: ExamRequest) {
    const { message, data }: RequestResponseClient<ExamRequestResponseData> = await sendRequest({
        url: "/api/exam-requests/generate",
        method: "POST",
        data: { ...props }
    })

    return {
        message,
        data
    }
}