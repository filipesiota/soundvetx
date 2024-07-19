import { z } from "zod";
import { malformedBodyRequest, validateParam } from "@/utils/request";
import { RequestResponse } from "@/@types/request-response";
import { ComboReturn } from "@/@types/combo-return";

export const XRayRequestSchema = z.object({
	veterinaryClinic: z.string().trim().min(1, {
		message: "Este campo é obrigatório."
	}),
	veterinaryDoctor: z.string().trim().min(1, {
		message: "Este campo é obrigatório."
	}),
	patientName: z.string().trim().min(1, {
		message: "Este campo é obrigatório."
	}),
	patientSpecies: z.string().trim().min(1, {
		message: "Este campo é obrigatório."
	}),
	patientSex: z.string().trim().min(1, {
		message: "Este campo é obrigatório."
	}),
	patientAge: z
		.number()
		.or(z.string().min(1, { message: "Este campo é obrigatório." }).regex(/\d+/).transform(Number))
		.refine(n => n >= 0, { message: "Idade inválida." }),
	patientRace: z.string().trim().min(1, {
		message: "Este campo é obrigatório."
	}),
	patientTutor: z.string().trim().min(1, {
		message: "Este campo é obrigatório."
	}),
	examSuspicion: z.string().trim().min(1, {
		message: "Este campo é obrigatório."
	}),
	examComplementaryDone: z.string().optional(),
	softTissues: z.array(z.string()).optional(),
	skullItems: z.array(z.string()).optional(),
	axialSkeletonItems: z.array(z.string()).optional(),
	appendicularSkeletonItems: z.array(z.string()).optional(),
	combos: z.array(z.string()).optional(),
	observations: z.string().optional()
});

export type XRayRequest = z.infer<typeof XRayRequestSchema>;

export function validateXRayRequest(data: any): ComboReturn<XRayRequest, RequestResponse> {
	if (data === null || typeof data !== "object") {
		return {
			data: null,
			error: malformedBodyRequest()
		};
	}

	let error;

	error = validateParam(data, "veterinaryClinic", "string", true);
	if (error !== null)
		return {
			data: null,
			error: error
		};

	error = validateParam(data, "veterinaryDoctor", "string", true);
	if (error !== null)
		return {
			data: null,
			error: error
		};

	error = validateParam(data, "patientName", "string", true);
	if (error !== null)
		return {
			data: null,
			error: error
		};

	error = validateParam(data, "patientSpecies", "string", true);
	if (error !== null)
		return {
			data: null,
			error: error
		};

	error = validateParam(data, "patientSex", "string", true);
	if (error !== null)
		return {
			data: null,
			error: error
		};

	error = validateParam(data, "patientAge", "number", true);
	if (error !== null)
		return {
			data: null,
			error: error
		};

	error = validateParam(data, "patientRace", "string", true);
	if (error !== null)
		return {
			data: null,
			error: error
		};

	error = validateParam(data, "patientTutor", "string", true);
	if (error !== null)
		return {
			data: null,
			error: error
		};

	error = validateParam(data, "examSuspicion", "string", true);
	if (error !== null)
		return {
			data: null,
			error: error
		};

	error = validateParam(data, "examComplementaryDone", "string", false);
	if (error !== null)
		return {
			data: null,
			error: error
		};

	error = validateParam(data, "softTissues", "string[]", false);
	if (error !== null)
		return {
			data: null,
			error: error
		};

	error = validateParam(data, "skullItems", "string[]", false);
	if (error !== null)
		return {
			data: null,
			error: error
		};

	error = validateParam(data, "axialSkeletonItems", "string[]", false);
	if (error !== null)
		return {
			data: null,
			error: error
		};

	error = validateParam(data, "appendicularSkeletonItems", "string[]", false);
	if (error !== null)
		return {
			data: null,
			error: error
		};

	error = validateParam(data, "combos", "string[]", false);
	if (error !== null)
		return {
			data: null,
			error: error
		};

	error = validateParam(data, "observations", "string", false);
	if (error !== null)
		return {
			data: null,
			error: error
		};

	return {
		data: data,
		error: null
	};
}
