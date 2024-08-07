import { Secret, sign, SignOptions } from "jsonwebtoken";

export class GenerateTokenProvider {
    async execute(userId: number) {
        const token = sign(
			{
				id: userId
			},
			process.env.JWT_SECRET as Secret,
			{
				subject: userId.toString(),
				expiresIn: "1d"
			} as SignOptions
		);

        return token;
    }
}