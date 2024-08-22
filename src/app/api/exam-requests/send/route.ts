import { RequestError, RequestResponse } from "@/types/request"
import { SendExamRequest, validateSendExamRequest } from "@/validations/send-exam-validation"
import { sendMessage } from "@/utils/wa-message-sender"
import { NextRequest, NextResponse } from "next/server"
import { decodeJwt } from "jose"

export async function POST(
	request: NextRequest
): Promise<NextResponse<RequestResponse<boolean> | RequestError>> {
	const token = request.cookies.get("soundvetx-token")

	if (!token?.value) {
		return NextResponse.json(
			{
				message: {
					serverMessage: "User is not authenticated",
					clientMessage: "Você não tem permissão para acessar este recurso."
				}
			},
			{ status: 401 }
		)
	}

	const canSendWhatsapp = decodeJwt(token.value).canSendWhatsapp ?? false

	if (!canSendWhatsapp) {
		return NextResponse.json(
			{
				message: {
					serverMessage: "User is not authorized",
					clientMessage: "Você não tem permissão para acessar este recurso."
				}
			},
			{ status: 401 }
		)
	}
	
	const body = await request.json()
	const { data: validationData, error: validationError } = validateSendExamRequest(body)

	if (validationError !== null) {
		return NextResponse.json(validationError, { status: 400 })
	}

	const { veterinarianClinic, veterinarianName, patientName, reportUrl } = validationData as SendExamRequest

	const { error: messageError } = await sendMessage({
		text: `
			Nova solicitação de exame de raio-x recebida.\n\n*Nome da clínica:* ${veterinarianClinic}\n*Nome do(a) médico(a) veterinário(a):* ${veterinarianName}\n*Nome do paciente:* ${patientName}
		`,
		mediaUrl: [reportUrl as string]
	})

	if (messageError !== null) {
		return NextResponse.json(messageError, { status: 500 })
	}

	return NextResponse.json(
		{
			message: {
				serverMessage: "Report sent successfully",
				clientMessage: "Requisição de exame enviada com sucesso."
			},
			data: true
		},
		{ status: 200 }
	)
}
