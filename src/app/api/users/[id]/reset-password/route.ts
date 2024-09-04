import { NextRequest, NextResponse } from "next/server";

import { resetUserPasswordHandler } from "@/handlers/reset-user-password-handler";

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
        const { newPassword } = await resetUserPasswordHandler({ userId })

        return NextResponse.json(
            {
                message: {
                    serverMessage: "User updated successfully",
                    clientMessage: "Usuário atualizado com sucesso."
                },
                data: {
                    newPassword
                }
            },
            { status: 200 }
        )
    } catch (error: any) {
        const { status, message } = error
        return NextResponse.json({ message }, { status })
    }
}