import { Login, LoginResponseData, validateLogin } from "@/@types/Login";
import { NextRequest, NextResponse } from "next/server";
import { AuthenticateUserUseCase } from "@/useCases/authenticateUser/AuthenticateUserUseCase";
import { RequestError, RequestResponse } from "@/@types/RequestResponse";

export async function POST(request: NextRequest): Promise<NextResponse<RequestResponse<LoginResponseData> | RequestError>> {
    const body = await request.json();
    const { data: validationData, error: validationError } = validateLogin(body);

    if (validationError !== null) {
        return NextResponse.json(validationError, { status: 400 });
    }

    const { email, password } = validationData as Login;

    const authenticateUserUseCase = new AuthenticateUserUseCase();

    try {
        const { token, user } = await authenticateUserUseCase.execute({ email, password });

        return NextResponse.json({
            message: {
                serverMessage: "User authenticated successfully",
                clientMessage: "Usuário autenticado com sucesso."
            },
            data: {
                token,
                user
            }
        }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(error, { status: 400 });
    }
}