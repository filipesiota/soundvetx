export enum UserType {
	Admin = 'admin',
	Dev = 'dev',
	Veterinarian = 'veterinarian'
}

export type UserTypeOption = {
	value: UserType
	label: string
}

export type User =
	| { type: UserType.Admin | UserType.Dev, id: number, name: string, email: string, canSendWhatsapp: boolean, isActive: boolean }
	| { type: UserType.Veterinarian, id: number, name: string, email: string, crmv: string, uf: string, canSendWhatsapp: boolean, isActive: boolean }
