import { malformedBodyRequest, validateParam } from "@/utils/request";
import { ComboReturn } from "./ComboReturn";
import { RequestError } from "./Request";

export type RefreshTokenRequest = {
    refreshToken: string;
};

export type RefreshTokenResponse = {
    token: string;
};

export function validateRefreshTokenRequest(data: any): ComboReturn<RefreshTokenRequest, RequestError> {
    if (data === null || typeof data !== "object") {
        return {
            data: null,
            error: malformedBodyRequest()
        };
    }

    let error;

    error = validateParam(data, "refreshToken", "string", true);
    if (error !== null)
        return {
            data: null,
            error: error
        };

    return {
        data: data as RefreshTokenRequest,
        error: null
    };
}