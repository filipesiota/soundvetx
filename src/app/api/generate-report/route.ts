import { RequestError, RequestResponse } from "@/@types/RequestResponse";
import { validateExamRequest, ExamRequest } from "@/@types/ExamRequest";
import { generatePDF } from "@/utils/generate-pdf";
import { storeBlob } from "@/utils/store-blob";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse<RequestResponse<string> | RequestError>> {
	const body = await request.json();
	const { data: validationData, error: validationError } = validateExamRequest(body);

	if (validationError !== null) {
		return NextResponse.json(validationError, { status: 400 });
	}

	const { data: pdfBuffer, error: pdfError } = await generatePDF(validationData as ExamRequest);

	if (pdfError !== null) {
		return NextResponse.json(pdfError, { status: 500 });
	}

	const { data: blobUrl, error: blobError } = await storeBlob(pdfBuffer as Blob);

	if (blobError !== null) {
		return NextResponse.json(blobError, { status: 500 });
	}

	return NextResponse.json({ message: {
		serverMessage: "Report generated successfully",
		clientMessage: "Arquivo do exame gerado com sucesso."
	}, data: blobUrl }, { status: 200 });
}
