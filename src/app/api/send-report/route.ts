import { RequestResponse } from "@/@types/request-response";
import { validateXRayRequest } from "@/@types/xray-request";
import { generatePDF } from "@/utils/generate-pdf";
import { storeBlob } from "@/utils/store-blob";
import { sendMessage } from "@/utils/wa-message-helper";
import { NextRequest, NextResponse } from "next/server";

// export const runtime = "edge";

export async function POST(request: NextRequest): Promise<NextResponse<RequestResponse>> {
	const body = await request.json();
	const { data: validationData, error: validationError } = validateXRayRequest(body);

	if (validationError !== null) {
		return NextResponse.json(validationError, { status: 400 });
	}

	const { data: pdfBuffer, error: pdfError } = await generatePDF();

	if (pdfError !== null) {
		return NextResponse.json(pdfError, { status: 500 });
	}

	const { data: blobUrl, error: blobError } = await storeBlob(pdfBuffer as Blob);

	if (blobError !== null) {
		return NextResponse.json(blobError, { status: 500 });
	}

	const { error: messageError } = await sendMessage({
		text: "Here's the report you requested",
		mediaUrl: [blobUrl as string]
	});

	if (messageError !== null) {
		return NextResponse.json(messageError, { status: 500 });
	}

	return NextResponse.json({ message: "Sent report successfully", data: validationData }, { status: 200 });
}
