import { RequestResponseClient } from "@/types/request";
import { sendRequest } from "@/utils/request";
import { SendExamRequest } from "@/validations/send-exam-validation";

export async function sendExamRequest({ veterinarianClinic, veterinarianName, patientName, reportUrl }: SendExamRequest) {
    const { message }: RequestResponseClient<boolean> = await sendRequest({
        url: "/api/exam-requests/send",
        method: "POST",
        data: {
            veterinarianClinic,
            veterinarianName,
            patientName,
            reportUrl
        }
    })

    return {
        message
    }
}
