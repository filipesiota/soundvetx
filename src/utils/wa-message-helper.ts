import { ComboReturn } from "@/@types/combo-return";
import { RequestError } from "@/@types/request-response";
import twilio from "twilio";

export type SendMessageProps = {
	text?: string;
	mediaUrl?: string[];
};

export async function sendMessage({ text, mediaUrl }: SendMessageProps): Promise<ComboReturn<boolean, RequestError>> {
	const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

	const message = await client.messages.create({
		from: process.env.TWILIO_FROM_PHONE_NUMBER,
		body: text,
		mediaUrl: mediaUrl,
		to: process.env.TWILIO_TO_PHONE_NUMBER ?? ""
	});

	if (message.errorCode) {
		return {
			data: false,
			error: {
				message: `Failed to send message: ${message.errorCode} - ${message.errorMessage}`
			}
		};
	}

	return {
		data: true,
		error: null
	};
}
