import { z } from "zod";
import { ComboReturn } from "./combo-return";
import { malformedBodyRequest, validateParam } from "@/utils/request";
import { RequestError } from "./request-response";

export const VeterinarianSchema = z.object({
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
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"]
});

export type Veterinarian = z.infer<typeof VeterinarianSchema>;

export function validateVeterinarian(data: any): ComboReturn<Veterinarian, RequestError> {
    if (data === null || typeof data !== "object") {
        return {
            data: null,
            error: malformedBodyRequest()
        };
    }

    let error;

    error = validateParam(data, "fullName", "string", true);
    if (error !== null)
        return {
            data: null,
            error: error
        };

    error = validateParam(data, "crmv", "string", true);
    if (error !== null)
        return {
            data: null,
            error: error
        };

    error = validateParam(data, "email", "string", true);
    if (error !== null)
        return {
            data: null,
            error: error
        };

    error = validateParam(data, "password", "string", true);
    if (error !== null)
        return {
            data: null,
            error: error
        };

    error = validateParam(data, "confirmPassword", "string", true);
    if (error !== null)
        return {
            data: null,
            error: error
        };

    return {
        data: data as Veterinarian,
        error: null
    };
}
