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

	error = validateParam(data, "examSuspicion", "string", true)
	if (error !== null)
		return {
			data: null,
			error: error
		}

	error = validateParam(data, "examComplementaryDone", "string", false)
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

	error = validateParam(data, "appendicularSkeletonItems", "string[]", false)
	if (error !== null)
		return {
			data: null,
			error: error
		}

	error = validateParam(data, "combos", "string[]", false)
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
