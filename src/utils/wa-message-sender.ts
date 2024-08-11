import twilio from "twilio"

import { ComboReturn } from "@/types/combo-return"
import { RequestError } from "@/types/request"

export interface SendMessageProps {
	text?: string
	mediaUrl?: string[]
}

export async function sendMessage({
	text,
	mediaUrl
}: SendMessageProps): Promise<ComboReturn<null, RequestError>> {
	const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

	const message = await client.messages.create({
		body: text,
		mediaUrl: mediaUrl,
		from: `whatsapp:${process.env.TWILIO_FROM_PHONE_NUMBER}`,
		to: `whatsapp:${process.env.TWILIO_TO_PHONE_NUMBER}`
	})

	if (message.errorCode) {
		return {
			data: null,
			error: {
				message: {
					serverMessage: "Failed to send message",
					clientMessage:
						"Ocorreu um erro ao enviar o arquivo do exame por WhatsApp. Por favor, contate a SoundvetX."
				}
			}
		}
	}

	return {
		data: null,
		error: null
	}
}
