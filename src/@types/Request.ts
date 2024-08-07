export type Request = {
	url: string;
	method: "GET" | "POST" | "PUT" | "DELETE";
	data?: any;
};

export type RequestMessage = {
	serverMessage: string;
	clientMessage: string;
};

export interface RequestResponse<T> {
	message: RequestMessage;
	data?: T;
}

export interface RequestError extends RequestResponse<null> {}

