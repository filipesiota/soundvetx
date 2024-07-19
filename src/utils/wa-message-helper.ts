export function sendMessage(data: string) {
	const url = `https://graph.facebook.com/${process.env.VERSION}/${process.env.PHONE_NUMBER_ID}/messages`;

	const config: RequestInit = {
	  method: 'POST',
	  headers: {
		'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
		'Content-Type': 'application/json'
	  },
	  body: data
	};

	return fetch(url, config);
}

export function getTextMessageInput(recipient: string, text: string) {
	return JSON.stringify({
		messaging_product: "whatsapp",
		preview_url: false,
		recipient_type: "individual",
		to: recipient,
		type: "text",
		text: {
			body: text
		}
	});
}
