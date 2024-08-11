export type User =
	| { type: 'admin', id: number, name: string, email: string }
	| { type: 'veterinarian', id: number, name: string, email: string, crmv: string, uf: string, canSendWhatsapp: boolean }
