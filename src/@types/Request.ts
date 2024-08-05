export type Request = {
	url: string;
	method: "GET" | "POST" | "PUT" | "DELETE";
	data?: any;
};
