import { malformedBodyRequest, validateParam } from "@/utils/request"
import { ComboReturn } from "../types/combo-return"
import { RequestError } from "../types/request"

interface SendReportRequest {
	veterinarianClinic: string
	veterinarianName: string
	patientName: string
	reportUrl: string
}

export function validateSendReportRequest(data: any): ComboReturn<SendReportRequest, RequestError> {
	if (data === null || typeof data !== "object") {
		return {
			data: null,
			error: malformedBodyRequest()
		}
	}

	let error

	error = validateParam(data, "veterinarianClinic", "string", true)
	if (error !== null)
		return {
			data: null,
			error: error
		}

	error = validateParam(data, "veterinarianName", "string", true)
	if (error !== null)
		return {
			data: null,
			error: error
		}

	error = validateParam(data, "patientName", "string", true)
	if (error !== null)
		return {
			data: null,
			error: error
		}

	error = validateParam(data, "reportUrl", "string", true)
	if (error !== null)
		return {
			data: null,
			error: error
		}

	return {
		data: data as SendReportRequest,
		error: null
	}
}
