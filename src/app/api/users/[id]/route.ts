import { canSendWhatsappUserHandler } from "@/handlers/can-send-whatsapp-user-handler";
import { deleteUserHandler } from "@/handlers/delete-user-handler";
import { updateUserHandler } from "@/handlers/update-user-handler";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
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
        await deleteUserHandler({ userId })

        return NextResponse.json(
            {
                message: {
                    serverMessage: "User deleted successfully",
                    clientMessage: "Usuário deletado com sucesso."
                }
            },
            { status: 200 }
        )
    } catch (error: any) {
        return NextResponse.json(error, { status: 404 })
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
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
        const body = await request.json()

        await updateUserHandler({
            userId,
            name: body.name,
            email: body.email,
            crmv: body.crmv,
            uf: body.uf,
            canSendWhatsapp: body.canSendWhatsapp,
            type: body.type
        })

        return NextResponse.json(
            {
                message: {
                    serverMessage: "User updated successfully",
                    clientMessage: "Usuário atualizado com sucesso."
                }
            },
            { status: 200 }
        )
    } catch (error: any) {
        const { status, message } = error
        return NextResponse.json({ message }, { status })
    }
}
