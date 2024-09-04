import z from 'zod'

import { ComboReturn } from '@/types/combo-return'
import { RequestError } from '@/types/request'
import { malformedBodyRequest, validateParam } from '@/utils/request'

export const PasswordChangeSchema = z.object({
    currentPassword: z.string().trim().min(1, {
        message: "Preencha o campo com a senha atual."
    }),
    newPassword: z.string().trim().min(1, {
		message: "Preencha o campo de nova senha."
	}).min(5, {
		message: "A nova senha deve ter no mínimo 5 caracteres."
	}),
    confirmNewPassword: z.string().trim().min(1, {
		message: "Preencha o campo de confirmação de senha."
	})
}).refine(data => data.newPassword === data.confirmNewPassword, {
	message: "As senhas não coincidem.",
	path: ["confirmNewPassword"]
})

export type PasswordChangeForm = z.infer<typeof PasswordChangeSchema>

export function validatePasswordChangeForm(data: any): ComboReturn<PasswordChangeForm, RequestError> {
    if (data === null || typeof data !== "object") {
        return {
            data: null,
            error: malformedBodyRequest()
        }
    }

    let error

    error = validateParam(data, "currentPassword", "string", true)
    if (error !== null)
        return {
            data: null,
            error: error
    }

    error = validateParam(data, "newPassword", "string", true)
    if (error !== null)
        return {
            data: null,
            error: error
    }

    error = validateParam(data, "confirmNewPassword", "string", true)
    if (error !== null)
        return {
            data: null,
            error: error
    }

    return {
        data: data,
        error: null
    }
}
