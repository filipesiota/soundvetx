import { Login } from "@/@types/Login";
import { prisma } from "@/prisma/client";
import { compare } from "bcrypt";
import { Secret, sign, SignOptions } from "jsonwebtoken";

export class AuthenticateUserUseCase {
	async execute({ email, password }: Login) {
		const user = await prisma.user.findFirst({
			where: {
				email
			},
			include: {
				veterinarian: true
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

		return {
			token,
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
				crmv: user.veterinarian[0].crmv,
				uf: user.veterinarian[0].uf,
				canSendWhatsapp: user.canSendWhatsapp
			}
		}
	}
}
