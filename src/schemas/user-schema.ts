import { z } from "zod"
import { ComboReturn } from "../types/combo-return"
import { malformedBodyRequest, validateParam } from "@/utils/request"
import { RequestError } from "../types/request"
import { UserType } from "@/types/user"

const AdminCreateSchema = z.object({
	type: z.enum([UserType.Admin, UserType.Dev]),
	fullName: z.string().trim().min(1, {
		message: "Preencha o campo de nome completo."
	}),
	email: z.string().trim().min(1, {
		message: "Preencha o campo de e-mail."
	}).email({
		message: "E-mail inválido."
	}),
	password: z.string().trim().min(1, {
		message: "Preencha o campo de senha."
	}).min(5, {
		message: "A senha deve ter no mínimo 5 caracteres."
	}),
	confirmPassword: z.string().trim().min(1, {
		message: "Preencha o campo de confirmação de senha."
	})
}).refine(data => data.password === data.confirmPassword, {
	message: "As senhas não coincidem.",
	path: ["confirmPassword"]
})

const VeterinarianCreateSchema = z.object({
	type: z.literal(UserType.Veterinarian),
	fullName: z.string().trim().min(1, {
		message: "Preencha o campo de nome completo."
	}),
	crmv: z.string().trim().min(1, {
		message: "Preencha o campo de CRMV."
	}),
	uf: z.string().trim().min(1, {
		message: "Preencha o campo de UF."
	}),
	email: z.string().trim().min(1, {
		message: "Preencha o campo de e-mail."
	}).email({
		message: "E-mail inválido."
	}),
	password: z.string().trim().min(1, {
		message: "Preencha o campo de senha."
	}).min(5, {
		message: "A senha deve ter no mínimo 5 caracteres."
	}),
	confirmPassword: z.string().trim().min(1, {
		message: "Preencha o campo de confirmação de senha."
	})
}).refine(data => data.password === data.confirmPassword, {
	message: "As senhas não coincidem.",
	path: ["confirmPassword"]
})

export const UserCreateSchema = z.union([AdminCreateSchema, VeterinarianCreateSchema])

export type UserCreateForm = z.infer<typeof UserCreateSchema>

export function validateUserCreateForm(data: any): ComboReturn<UserCreateForm, RequestError> {
	if (data === null || typeof data !== "object") {
		return {
			data: null,
			error: malformedBodyRequest()
		}
	}

	let error

	error = validateParam(data, "type", "string", true)
	if (error !== null)
		return {
			data: null,
			error: error
	}

	error = validateParam(data, "fullName", "string", true)
	if (error !== null)
		return {
			data: null,
			error: error
		}

	error = validateParam(data, "crmv", "string", data.type === UserType.Veterinarian)
	if (error !== null)
		return {
			data: null,
			error: error
		}

	error = validateParam(data, "uf", "string", data.type === UserType.Veterinarian)
	if (error !== null)
		return {
			data: null,
			error: error
		}

	error = validateParam(data, "email", "string", true)
	if (error !== null)
		return {
			data: null,
			error: error
		}
	
	error = validateParam(data, "password", "string", true)
	if (error !== null)
		return {
			data: null,
			error: error
		}

	error = validateParam(data, "confirmPassword", "string", true)
	if (error !== null)
		return {
			data: null,
			error: error
		}

	return {
		data: data as UserCreateForm,
		error: null
	}
}

const AdminUpdateSchema = z.object({
	type: z.enum([UserType.Admin, UserType.Dev]),
	fullName: z.string().trim().min(1, {
		message: "Preencha o campo de nome completo."
	}),
	email: z.string().trim().min(1, {
		message: "Preencha o campo de e-mail."
	}).email({
		message: "E-mail inválido."
	})
})

const VeterinarianUpdateSchema = z.object({
	type: z.literal(UserType.Veterinarian),
	fullName: z.string().trim().min(1, {
		message: "Preencha o campo de nome completo."
	}),
	crmv: z.string().trim().min(1, {
		message: "Preencha o campo de CRMV."
	}),
	uf: z.string().trim().min(1, {
		message: "Preencha o campo de UF."
	}),
	email: z.string().trim().min(1, {
		message: "Preencha o campo de e-mail."
	}).email({
		message: "E-mail inválido."
	})
})

export const UserUpdateSchema = z.union([AdminUpdateSchema, VeterinarianUpdateSchema])

export type UserUpdateForm = z.infer<typeof UserUpdateSchema>

export function validateUserUpdateForm(data: any): ComboReturn<UserUpdateForm, RequestError> {
	if (data === null || typeof data !== "object") {
		return {
			data: null,
			error: malformedBodyRequest()
		}
	}

	let error

	error = validateParam(data, "type", "string", true)
	if (error !== null)
		return {
			data: null,
			error: error
	}

	error = validateParam(data, "fullName", "string", true)
	if (error !== null)
		return {
			data: null,
			error: error
		}

	error = validateParam(data, "crmv", "string", data.type === UserType.Veterinarian)
	if (error !== null)
		return {
			data: null,
			error: error
		}

	error = validateParam(data, "uf", "string", data.type === UserType.Veterinarian)
	if (error !== null)
		return {
			data: null,
			error: error
		}

	error = validateParam(data, "email", "string", true)
	if (error !== null)
		return {
			data: null,
			error: error
		}

	return {
		data: data as UserUpdateForm,
		error: null
	}
}
