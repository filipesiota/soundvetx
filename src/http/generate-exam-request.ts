import { ExamRequest } from "@/schemas/exam-request-schema";
import { RequestResponseClient } from "@/types/request";
import { sendRequest } from "@/utils/request";

interface ExamRequestResponseData {
    url: string
}

export async function generateExamRequest({
    veterinarianClinic,
    veterinarianName,
    veterinarianCrmv,
    veterinarianUf,
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
    const { message, data }: RequestResponseClient<ExamRequestResponseData> = await sendRequest({
        url: "/api/exam-requests/generate",
        method: "POST",
        data: {
            veterinarianClinic,
            veterinarianName,
            veterinarianCrmv,
            veterinarianUf,
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