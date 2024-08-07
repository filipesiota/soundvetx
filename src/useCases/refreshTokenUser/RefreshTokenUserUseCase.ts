import { prisma } from "@/prisma/client";
import { GenerateRefreshTokenProvider } from "@/providers/GenerateRefreshTokenProvider";
import { GenerateTokenProvider } from "@/providers/GenerateTokenProvider";
import dayjs from "dayjs";

export class RefreshTokenUserUseCase {
	async execute(refreshToken: string) {
		const refreshTokenExists = await prisma.refreshToken.findFirst({
			where: {
				id: refreshToken
			}
		});

		if (!refreshTokenExists) {
			throw {
				message: {
					serverMessage: "Refresh token invalid",
					clientMessage: "Você não tem permissão para acessar este recurso."
				}
			};
		}

		const generateToken = new GenerateTokenProvider();
		const token = await generateToken.execute(refreshTokenExists.userId);

		const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshTokenExists.expiresIn));

		if (refreshTokenExpired) {
			await prisma.refreshToken.deleteMany({
				where: {
					userId: refreshTokenExists.userId
				}
			});

			const generateRefreshTokenProvider = new GenerateRefreshTokenProvider();
			const newRefreshToken = await generateRefreshTokenProvider.execute(
				refreshTokenExists.userId
			);

			return {
				token,
				newRefreshToken: newRefreshToken.id
			};
		}

		return { token };
	}
}
