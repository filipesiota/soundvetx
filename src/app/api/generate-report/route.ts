import { validateXRayRequest } from "@/@types/xray-request";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { data, error } = validateXRayRequest(body);
    
    if (error !== null) {
        return NextResponse.json(error, { status: 400 });
    }

	return NextResponse.json({ message: "Success", data: data }, { status: 200 });
}
