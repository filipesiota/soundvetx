export type User =
	| { type: 'admin' | 'dev', id: number, name: string, email: string, canSendWhatsapp: boolean }
	| { type: 'veterinarian', id: number, name: string, email: string, crmv: string, uf: string, canSendWhatsapp: boolean }
