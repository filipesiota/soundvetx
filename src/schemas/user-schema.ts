import { z } from "zod"
import { ComboReturn } from "../types/combo-return"
import { malformedBodyRequest, validateParam } from "@/utils/request"
import { RequestError } from "../types/request"
import { UserType } from "@/types/user"

const UserAdminSchema = z.object({
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

const UserVeterinarianSchema = z.object({
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

export const UserSchema = z.union([UserAdminSchema, UserVeterinarianSchema])

export type UserForm = z.infer<typeof UserSchema>

export function validateVeterinarian(data: any): ComboReturn<UserForm, RequestError> {
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

	error = validateParam(data, "email", "string", true)
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

	return {
		data: data as UserForm,
		error: null
	}
}
