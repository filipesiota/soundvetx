import { NextRequest, NextResponse } from "next/server"

import { validateExamRequest, ExamRequest } from "@/schemas/exam-request-schema"
import { RequestResponse, RequestError } from "@/types/request"
import { generateExamRequestFile } from "@/utils/generate-exam-request-file"
import { storeExamRequestFile } from "@/utils/store-exam-request-file"

export async function POST(
	request: NextRequest
): Promise<NextResponse<RequestResponse<any> | RequestError>> {
	const body = await request.json()
	const { data: validationData, error: validationError } = validateExamRequest(body)

	if (validationError !== null) {
		return NextResponse.json(validationError, { status: 400 })
	}

	const { data: pdfBuffer, error: pdfError } = await generateExamRequestFile(validationData as ExamRequest)

	if (pdfError !== null) {
		return NextResponse.json(pdfError, { status: 500 })
	}

	const { data: blobUrl, error: blobError } = await storeExamRequestFile(pdfBuffer as Blob)

	if (blobError !== null) {
		return NextResponse.json(blobError, { status: 500 })
	}

	return NextResponse.json(
		{
			message: {
				serverMessage: "Report generated successfully",
				clientMessage: "Arquivo do exame gerado com sucesso."
			},
			data: {
				url: blobUrl
			}
		},
		{ status: 200 }
	)
}
