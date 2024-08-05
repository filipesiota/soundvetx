import { ComboReturn } from "@/@types/ComboReturn";
import { RequestError } from "@/@types/RequestResponse";
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
		console.log(error);

		return {
			data: null,
			error: {
				message: {
					serverMessage: "Failed to store PDF file",
					clientMessage: "Ocorreu um erro ao armazenar o arquivo do exame. Por favor, contate a SoundvetX."
				}
			}
		};
	}
}
