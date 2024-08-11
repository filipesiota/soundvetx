import { Secret, sign, SignOptions } from "jsonwebtoken"

interface GenerateTokenProviderProps {
	userId: string
}

export function generateTokenProvider({ userId }: GenerateTokenProviderProps) {
	const token = sign(
		{
			id: userId
		},
		process.env.JWT_SECRET as Secret,
		{
			subject: userId.toString(),
			expiresIn: "1d"
		} as SignOptions
	)

	return token
}
