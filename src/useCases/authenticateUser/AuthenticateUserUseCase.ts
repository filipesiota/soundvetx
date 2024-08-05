import { Login } from "@/@types/Login";
import { prisma } from "@/prisma/client";
import { compare } from "bcrypt";
import { Secret, sign, SignOptions } from "jsonwebtoken";

export class AuthenticateUserUseCase {
	async execute({ email, password }: Login) {
		const user = await prisma.user.findFirst({
			where: {
				email
			}
		});

		if (!user) {
			throw {
				message: {
					serverMessage: "Invalid credentials",
					clientMessage: "Credenciais inválidas."
				}
			};
		}

		const passwordMatch = await compare(password, user.password);

		if (!passwordMatch) {
			throw {
				message: {
					serverMessage: "Invalid credentials",
					clientMessage: "Credenciais inválidas."
				}
			};
		}

		const token = sign(
			{
				id: user.id
			},
			process.env.JWT_SECRET as Secret,
			{
				subject: user.id.toString(),
				expiresIn: "1d"
			} as SignOptions
		);

		return token;
	}
}
