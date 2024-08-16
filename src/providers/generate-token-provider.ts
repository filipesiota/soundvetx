import { SignJWT } from "jose"


interface GenerateTokenProviderProps {
	userId: string
	userType: string
}

export async function generateTokenProvider({ userId, userType }: GenerateTokenProviderProps) {
	const encoder = new TextEncoder()
	const secret = encoder.encode(process.env.JWT_SECRET)
	const jwt = new SignJWT({
		sub: userId,
		admin: ['admin', 'dev'].includes(userType)
	})
		.setExpirationTime("1d")
		.setProtectedHeader({ alg: "HS256" })
	
	return jwt.sign(secret)
}
