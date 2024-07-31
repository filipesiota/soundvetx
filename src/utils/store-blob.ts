import { ComboReturn } from "@/@types/combo-return";
import { RequestError } from "@/@types/request-response";
import { put } from "@vercel/blob";

export async function storeBlob(file: Blob): Promise<ComboReturn<string, RequestError>> {
	const fileName = `${Date.now().toString()}.pdf`;

	try {
		const blob = await put(fileName, file, { access: "public" });

		return {
			data: blob.url,
			error: null
		};
	} catch (error: any) {
		return {
			data: null,
			error: {
				message: "Failed to store PDF file"
			}
		};
	}
}
