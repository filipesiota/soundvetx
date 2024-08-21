import { deleteUserHandler } from "@/handlers/delete-user-handler";
import { updateUserHandler } from "@/handlers/update-user-handler";
import { UserUpdateForm, validateUserUpdateForm } from "@/schemas/user-schema";
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

    const body = await request.json()
	const { data: validationData, error: validationError } = validateUserUpdateForm(body)

	if (validationError !== null) {
		return NextResponse.json(validationError, { status: 400 })
	}

	try {
		const user = await updateUserHandler({
            userId,
            values: validationData as UserUpdateForm
        })

		return NextResponse.json(
			{
				message: {
                    serverMessage: "User updated successfully",
                    clientMessage: "Usuário atualizado com sucesso."
                },
				data: {
					user
				}
			},
			{ status: 200 }
		)
	} catch (error: any) {
		const { status, message } = error
        return NextResponse.json({ message }, { status })
	}
}
