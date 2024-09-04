import { changeUserPasswordHandler } from "@/handlers/change-user-password-handler";
import { PasswordChangeForm, validatePasswordChangeForm } from "@/schemas/password-schema";
import { NextRequest, NextResponse } from "next/server";

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
    const body = await request.json()
	const { data: validationData, error: validationError } = validatePasswordChangeForm(body)

	if (validationError !== null) {
		return NextResponse.json(validationError, { status: 400 })
	}

    try {
        await changeUserPasswordHandler({
            userId,
            values: validationData as PasswordChangeForm
        })

        return NextResponse.json(
            {
                message: {
                    serverMessage: "User password updated successfully",
                    clientMessage: "Senha atualizada com sucesso."
                }
            },
            { status: 200 }
        )
    } catch (error: any) {
        const { status, message } = error
        return NextResponse.json({ message }, { status })
    }
}
