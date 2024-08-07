import { RequestResponse, RequestError } from "@/@types/Request";
import { validateVeterinarian, Veterinarian, VeterinarianResponseData } from "@/@types/Veterinarian";
import { CreateUserUseCase } from "@/useCases/createUser/CreateUserUseCase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse<RequestResponse<VeterinarianResponseData> | RequestError>> {
    const body = await request.json();
    const { data: validationData, error: validationError } = validateVeterinarian(body);

    if (validationError !== null) {
        return NextResponse.json(validationError, { status: 400 });
    }

    const { fullName, crmv, uf, email, password, confirmPassword } = validationData as Veterinarian;

    const createUserUseCase = new CreateUserUseCase();

    try {
        const user = await createUserUseCase.execute({ fullName, crmv, uf, email, password, confirmPassword });

        return NextResponse.json({
            message: {
                serverMessage: "User registered successfully",
                clientMessage: "Usuário cadastrado com sucesso."
            },
            data: {
                user
            }
        }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(error, { status: 400 });
    }
}