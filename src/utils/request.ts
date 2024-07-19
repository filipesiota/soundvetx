import { RequestError } from "@/@types/request-error";

export function errParamRequired(param: string, type: string): RequestError {
    return {
        message: `Param ${param} (type: ${type}) is required`
    };
}

export function invalidParamType(param: string, type: string): RequestError {
    return {
        message: `Param ${param} must be of type ${type}`
    };
}

export function malformedBodyRequest(): RequestError {
    return {
        message: `Malformed body request`
    };
}

export function validateParam(object: any, param: string, type: string, required: boolean): RequestError | null {
    if (object === null || typeof object !== "object") {
        return malformedBodyRequest();
    }

    if (!object[param]) {
        return required ? errParamRequired(param, type) : null;
    } else if (type.includes("[]")) {
        const arrayType = type.split("[]")[0];
        
        if (Array.isArray(object[param]) && object[param].every((item: any) => typeof item === arrayType)) {
            return null;
        } else {
            return invalidParamType(param, type);
        }
    } else if (typeof object[param] !== type) {
		return invalidParamType(param, type);
	}

    return null;
}