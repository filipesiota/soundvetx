export type User =
	| { type: 'admin' | 'dev', id: number, name: string, email: string, canSendWhatsapp: boolean, isActive: boolean }
	| { type: 'veterinarian', id: number, name: string, email: string, crmv: string, uf: string, canSendWhatsapp: boolean, isActive: boolean }
