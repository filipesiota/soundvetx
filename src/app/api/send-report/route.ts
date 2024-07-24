import { RequestResponse } from "@/@types/request-response";
import { validateXRayRequest } from "@/@types/xray-request";
import { generatePDF } from "@/utils/generate-pdf";
import { sendMessage } from "@/utils/wa-message-helper";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse<RequestResponse>> {
	const body = await request.json();
	const { data: validationData, error: validationError } = validateXRayRequest(body);

	if (validationError !== null) {
		return NextResponse.json(validationError, { status: 400 });
	}

	const { data: pdfUrl, error: pdfError } = await generatePDF();

	if (pdfError !== null) {
		return NextResponse.json(pdfError, { status: 500 });
	}

	const { error: messageError } = await sendMessage({
		text: `Hello, you have a new X-Ray request. Please download the report from this link: ${pdfUrl}`,
		mediaUrl: pdfUrl ? [pdfUrl] : []
	});

	if (messageError !== null) {
		return NextResponse.json(messageError, { status: 500 });
	}

	return NextResponse.json({ message: "Sent report successfully", data: validationData }, { status: 200 });
}
