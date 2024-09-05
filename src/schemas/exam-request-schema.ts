import { z } from "zod"
import { malformedBodyRequest, validateParam } from "@/utils/request"
import { RequestError } from "@/types/request"
import { ComboReturn } from "@/types/combo-return"

export const ExamRequestSchema = z.object({
	veterinarianClinic: z.string().trim().min(1, {
		message: "Este campo é obrigatório."
	}),
	veterinarianName: z.string().trim().min(1, {
		message: "Este campo é obrigatório."
	}),
	veterinarianCrmv: z.string().trim().min(1, {
		message: "Este campo é obrigatório."
	}),
	veterinarianUf: z.string().trim().min(1, {
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
		.number({ message: "Este campo é obrigatório." })
		.or(
			z
				.string()
				.min(1, { message: "Este campo é obrigatório." })
				.regex(/\d+/)
				.transform(Number)
		)
		.refine(n => n >= 0, { message: "Idade inválida." }),
	patientBreed: z.string().trim().min(1, {
		message: "Este campo é obrigatório."
	}),
	patientTutor: z.string().trim().min(1, {
		message: "Este campo é obrigatório."
	}),
	chip: z.string().trim().min(1, {
		message: "Este campo é obrigatório."
	}),
	paymentMethod: z.string().trim().min(1, {
		message: "Este campo é obrigatório."
	}),
	softTissues: z.array(z.string()).optional(),
	skullItems: z.array(z.string()).optional(),
	axialSkeletonItems: z.array(z.string()).optional(),
	appendicularSkeletonThoracicLimb: z.string().optional(),
	appendicularSkeletonThoracicLimbOptions: z.array(z.string()).optional(),
	appendicularSkeletonPelvicLimb: z.string().optional(),
	appendicularSkeletonPelvicLimbOptions: z.array(z.string()).optional(),
	appendicularSkeletonPelvis: z.array(z.string()).optional(),
	observations: z.string().optional()
})

export type ExamRequest = z.infer<typeof ExamRequestSchema>

export function validateExamRequest(data: any): ComboReturn<ExamRequest, RequestError> {
	if (data === null || typeof data !== "object") {
		return {
			data: null,
			error: malformedBodyRequest()
		}
	}

	let error

	error = validateParam(data, "veterinarianClinic", "string", true)
	if (error !== null)
		return {
			data: null,
			error: error
		}

	error = validateParam(data, "veterinarianName", "string", true)
	if (error !== null)
		return {
			data: null,
			error: error
		}

	error = validateParam(data, "veterinarianCrmv", "string", true)
	if (error !== null)
		return {
			data: null,
			error: error
		}

	error = validateParam(data, "veterinarianUf", "string", true)
	if (error !== null)
		return {
			data: null,
			error: error
		}

	error = validateParam(data, "patientName", "string", true)
	if (error !== null)
		return {
			data: null,
			error: error
		}

	error = validateParam(data, "patientSpecies", "string", true)
	if (error !== null)
		return {
			data: null,
			error: error
		}

	error = validateParam(data, "patientSex", "string", true)
	if (error !== null)
		return {
			data: null,
			error: error
		}

	error = validateParam(data, "patientAge", "number", true)
	if (error !== null)
		return {
			data: null,
			error: error
		}

	error = validateParam(data, "patientBreed", "string", true)
	if (error !== null)
		return {
			data: null,
			error: error
		}

	error = validateParam(data, "patientTutor", "string", true)
	if (error !== null)
		return {
			data: null,
			error: error
		}

	error = validateParam(data, "paymentMethod", "string", true)
	if (error !== null)
		return {
			data: null,
			error: error
		}

	error = validateParam(data, "chip", "string", true)
	if (error !== null)
		return {
			data: null,
			error: error
		}

	error = validateParam(data, "softTissues", "string[]", false)
	if (error !== null)
		return {
			data: null,
			error: error
		}

	error = validateParam(data, "skullItems", "string[]", false)
	if (error !== null)
		return {
			data: null,
			error: error
		}

	error = validateParam(data, "axialSkeletonItems", "string[]", false)
	if (error !== null)
		return {
			data: null,
			error: error
		}

	error = validateParam(data, "appendicularSkeletonThoracicLimb", "string[]", false)
	if (error !== null)
		return {
			data: null,
			error: error
		}

	error = validateParam(data, "appendicularSkeletonThoracicLimbOptions", "string[]", false)
	if (error !== null)
		return {
			data: null,
			error: error
		}

	error = validateParam(data, "appendicularSkeletonPelvicLimb", "string[]", false)
	if (error !== null)
		return {
			data: null,
			error: error
		}

	error = validateParam(data, "appendicularSkeletonPelvicLimbOptions", "string[]", false)
	if (error !== null)
		return {
			data: null,
			error: error
		}

	error = validateParam(data, "appendicularSkeletonPelvis", "string[]", false)
	if (error !== null)
		return {
			data: null,
			error: error
		}

	error = validateParam(data, "observations", "string", false)
	if (error !== null)
		return {
			data: null,
			error: error
		}

	return {
		data: data as ExamRequest,
		error: null
	}
}
