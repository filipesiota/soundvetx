import { z } from "zod";
import { ComboReturn } from "./ComboReturn";
import { malformedBodyRequest, validateParam } from "@/utils/request";
import { RequestError, RequestResponse } from "./Request";
import { User } from "./User";

export const LoginSchema = z.object({
    email: z.string().trim().min(1, {
        message: "Preencha o campo de e-mail."
    }).email({
        message: "E-mail inválido."
    }),
    password: z.string().trim().min(1, {
        message: "Preencha o campo de senha."
    })
});

export type Login = z.infer<typeof LoginSchema>;

export function validateLogin(data: any): ComboReturn<Login, RequestError> {
    if (data === null || typeof data !== "object") {
        return {
            data: null,
            error: malformedBodyRequest()
        };
    }

    let error;

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

    return {
        data: data as Login,
        error: null
    };
}

export type LoginResponseData = {
    token: string;
    refreshToken: string;
    user: User;
};
