import { RefreshTokenRequest, validateRefreshTokenRequest } from "@/@types/RefreshToken";
import { RefreshTokenUserUseCase } from "@/useCases/refreshTokenUser/RefreshTokenUserUseCase";
import { NextRequest, NextResponse } from "next/server";

export default async function POST(request: NextRequest) {
    const body = request.body;
    const { data: validationData, error: validationError } = validateRefreshTokenRequest(body);

    if (validationError !== null) {
        return NextResponse.json(validationError, { status: 400 });
    }

    const { refreshToken } = validationData as RefreshTokenRequest;

    const refreshTokenUserUseCase = new RefreshTokenUserUseCase();

    try {
        const { token, newRefreshToken } = await refreshTokenUserUseCase.execute(refreshToken);

        return NextResponse.json({
            message: {
                serverMessage: "Token refreshed successfully",
                clientMessage: "Token atualizado com sucesso."
            },
            data: {
                token,
                refreshToken: newRefreshToken
            }
        }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(error, { status: 401 });
    }
}