import { RequestResponse } from "@/@types/request-response";
import { validateXRayRequest } from "@/@types/xray-request";
import { getTextMessageInput, sendMessage } from "@/utils/wa-message-helper";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse<RequestResponse>> {
	const body = await request.json();
	const { data, error } = validateXRayRequest(body);

	if (error !== null) {
		return NextResponse.json(error, { status: 400 });
	}

	const textMessage = getTextMessageInput(process.env.RECIPIENT_WAID ?? "", "Olá, tudo bem?\nRecebemos um novo pedido de exame de raio-x. Em breve entraremos em contato para agendar a consulta.");

    try {
        const response = await sendMessage(textMessage);

        console.log(response);
    } catch {
        return NextResponse.json({ message: "Failed to send report" }, { status: 500 });
    }

	return NextResponse.json({ message: "Sent report successfully", data: data }, { status: 200 });
}
