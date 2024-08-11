import { ExamRequest } from "@/schemas/exam-request-schema";
import { RequestResponse } from "@/types/request";
import { sendRequest } from "@/utils/request";

interface ExamRequestResponseData {
    url: string
}

export async function generateExamRequest({
    veterinarianClinic,
    veterinarianName,
    patientName,
    patientSpecies,
    patientSex, 
    patientAge,
    patientBreed,
    patientTutor,
    examSuspicion,
    examComplementaryDone,
    softTissues,
    skullItems,
    axialSkeletonItems,
    appendicularSkeletonItems,
    combos,
    observations
}: ExamRequest) {
    const { message, data }: RequestResponse<ExamRequestResponseData> = await sendRequest({
        url: "/api/generate-report",
        method: "POST",
        data: {
            veterinarianClinic,
            veterinarianName,
            patientName,
            patientSpecies,
            patientSex, 
            patientAge,
            patientBreed,
            patientTutor,
            examSuspicion,
            examComplementaryDone,
            softTissues,
            skullItems,
            axialSkeletonItems,
            appendicularSkeletonItems,
            combos,
            observations
        }
    })

    return {
        message,
        data
    }
}