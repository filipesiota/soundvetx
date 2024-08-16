export type Request = {
	url: string
	method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
	data?: any
	retry?: boolean
}

export type RequestMessage = {
	serverMessage: string
	clientMessage: string
}

export interface RequestResponse<T> {
	message: RequestMessage
	data?: T
}

export interface RequestError extends RequestResponse<null> {}

export interface RequestResponseClient<T> {
	message: RequestMessage
	data: T
}

export interface RequestErrorClient {
	message: RequestMessage,
	status: number
}
