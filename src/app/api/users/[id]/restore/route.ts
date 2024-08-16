import { restoreUserHandler } from "@/handlers/restore-user-handler"
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    if (!params.id) {
        return NextResponse.json(
            {
                message: {
                    serverMessage: "User ID not found",
                    clientMessage: "Usuário não encontrado."
                }
            },
            { status: 404 }
        )
    }

    const userId = Number(params.id)

    try {
        await restoreUserHandler({ userId })

        return NextResponse.json(
            {
                message: {
                    serverMessage: "User updated successfully",
                    clientMessage: "Usuário restaurado com sucesso."
                }
            },
            { status: 200 }
        )
    } catch (error: any) {
        return NextResponse.json(error, { status: 404 })
    }
}