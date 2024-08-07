import { RequestError, RequestResponse } from "@/@types/Request";
import { validateSendReportRequest } from "@/@types/SendReport";
import { sendMessage } from "@/utils/wa-message-helper";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse<RequestResponse<boolean> | RequestError>> {
	const body = await request.json();
	const { data: validationData, error: validationError } = validateSendReportRequest(body);

	if (validationError !== null) {
		return NextResponse.json(validationError, { status: 400 });
	}

	const { error: messageError } = await sendMessage({
		text: `
			Nova solicitação de exame de raio-x recebida.\n\n
			
			*Nome da clínica:* ${validationData?.veterinarianClinic}\n
			*Nome do(a) médico(a) veterinário(a):* ${validationData?.veterinarianName}\n
			*Nome do paciente:* ${validationData?.patientName}
		`,
		mediaUrl: [validationData?.reportUrl as string]
	});

	if (messageError !== null) {
		return NextResponse.json(messageError, { status: 500 });
	}

	return NextResponse.json({ message: {
		serverMessage: "Report sent successfully",
		clientMessage: "Exame enviado com sucesso."
	}, data: true }, { status: 200 });
}
