import { SignJWT } from "jose"


interface GenerateTokenProviderProps {
	userId: number
}

export async function generateTokenProvider({ userId }: GenerateTokenProviderProps) {
	const secret = new TextEncoder().encode(process.env.JWT_SECRET)
	const jwt = new SignJWT({ id: userId })
	jwt.setExpirationTime("1d")
	jwt.setSubject(userId.toString())
	jwt.setProtectedHeader({ alg: "HS256" })
	
	return await jwt.sign(secret)
}
