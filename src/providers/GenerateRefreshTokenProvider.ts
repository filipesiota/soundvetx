import { prisma } from "@/prisma/client";
import dayjs from "dayjs";

export class GenerateRefreshTokenProvider {
    async execute(userId: number) {
        const expiresIn = dayjs().add(2, "day").unix();

        const generatedRefreshToken = prisma.refreshToken.create({
            data: {
                userId,
                expiresIn
            }
        });

        return generatedRefreshToken;
    }
}