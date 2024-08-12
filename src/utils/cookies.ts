import { NextResponse } from "next/server";

interface SetCookieProps {
    res: NextResponse,
    value: string
}

export function setTokenCookie({ res, value }: SetCookieProps) {
    res.cookies.set("soundvetx-token", value, {
        maxAge: 60 * 60 * 24 * 1, // 1 day,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production"
    })
}

export function setRefreshTokenCookie({ res, value }: SetCookieProps) {
    res.cookies.set("soundvetx-refresh-token", value, {
        maxAge: 60 * 60 * 24 * 2, // 2 days,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production"
    })
}
