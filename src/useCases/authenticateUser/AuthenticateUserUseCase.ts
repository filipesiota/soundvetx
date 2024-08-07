import { Login } from "@/@types/Login";
import { prisma } from "@/prisma/client";
import { GenerateRefreshTokenProvider } from "@/providers/GenerateRefreshTokenProvider";
import { GenerateTokenProvider } from "@/providers/GenerateTokenProvider";
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

		const generateToken = new GenerateTokenProvider();
		const token = await generateToken.execute(user.id);

		await prisma.refreshToken.deleteMany({
			where: {
				userId: user.id
			}
		});

		const generateRefreshToken = new GenerateRefreshTokenProvider();
		const refreshToken = await generateRefreshToken.execute(user.id);

		return {
			token,
			refreshToken: refreshToken.id,
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
				crmv: user.veterinarian?.crmv,
				uf: user.veterinarian?.uf,
				canSendWhatsapp: user.canSendWhatsapp,
				type: user.type
			}
		}
	}
}
