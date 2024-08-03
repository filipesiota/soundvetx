import { NextRequest } from "next/server";

export function POST(request: NextRequest) {
    return {
        status: 200,
        body: { message: "Hello World" }
    };
}