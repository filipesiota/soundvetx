import { deleteRefreshTokenHandler } from "@/handlers/delete-refresh-token-handler";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const refreshToken = request.cookies.get("soundvetx-refresh-token")

    try {
        await deleteRefreshTokenHandler({ refreshToken: refreshToken?.value ?? "" })

        request.cookies.delete("soundvetx-token");
        request.cookies.delete("soundvetx-refresh-token");

        return NextResponse.json({
            message: {
                serverMessage: "User signed out successfully",
                clientMessage: "Usuário desconectado com sucesso."
            }
        }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json(error, { status: 401 })
    }
}