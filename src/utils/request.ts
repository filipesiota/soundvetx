import { RequestError, RequestErrorClient, RequestMessage } from "@/types/request"
import { Request } from "@/types/request"

export function errParamRequired(param: string, type: string): RequestError {
	return {
		message: {
			serverMessage: `Param ${param} (type: ${type}) is required`,
			clientMessage: `Algum campo obrigatório não foi preenchido. Por favor, verifique e tente novamente.`
		}
	}
}

export function invalidParamType(param: string, type: string): RequestError {
	return {
		message: {
			serverMessage: `Param ${param} must be of type ${type}`,
			clientMessage: `Algum campo foi preenchido de forma incorreta. Por favor, verifique e tente novamente.`
		}
	}
}

export function malformedBodyRequest(): RequestError {
	return {
		message: {
			serverMessage: `Malformed body request`,
			clientMessage: `Ocorreu um erro ao enviar o formulário. Por favor, contate a SoundvetX.`
		}
	}
}

export function validateParam(
	object: any,
	param: string,
	type: string,
	required: boolean
): RequestError | null {
	if (object === null || typeof object !== "object") {
		return malformedBodyRequest()
	}

	if (!object[param]) {
		return required ? errParamRequired(param, type) : null
	} else if (type.includes("[]")) {
		const arrayType = type.split("[]")[0]

		if (
			Array.isArray(object[param]) &&
			object[param].every((item: any) => typeof item === arrayType)
		) {
			return null
		} else {
			return invalidParamType(param, type)
		}
	} else if (typeof object[param] !== type) {
		return invalidParamType(param, type)
	}

	return null
}

export async function sendRequest({ url, method, data }: Request) {
	const response = await fetch(url, {
		method,
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data)
	})

	if (response.status === 401) {
		try {
			await sendRefreshTokenRequest()
			// return sendRequest({ url, method, data })
		} catch (error: any) {
			throw error as RequestErrorClient
		}
	}

	const responseData = await response.json()

	if (response.ok) {
		return responseData
	} else {
		throw {
			message: responseData.message as RequestMessage,
			status: response.status
		} as RequestErrorClient
	}
}

async function sendRefreshTokenRequest(): Promise<void> {
	const response = await fetch("/api/refresh-token", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		}
	})

	const responseData = await response.json()

	if (!response.ok) {
		throw {
			message: responseData.message as RequestMessage,
			status: response.status
		} as RequestErrorClient
	}
}
