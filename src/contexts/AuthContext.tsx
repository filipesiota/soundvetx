import { Login } from "@/@types/Login";
import { RequestMessage } from "@/@types/RequestResponse";
import { sendRequest } from "@/utils/request";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { parseCookies, setCookie } from "nookies";
import { User } from "@/@types/User";
import Router from "next/router";

export type AuthContextType = {
	isAuthenticated: boolean;
    user: User | null;
    signIn: (login: Login) => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
	const isAuthenticated = !!user;

    useEffect(() => {
        const { 'soundvetx-token': token } = parseCookies();

        if (token) {
            sendRequest({
                url: "/api/me",
                method: "GET"
            }).then(response => setUser(response.data));
        }
    }, []);

    async function signIn({ email, password }: Login) {
        try {
            const { message, data } = await sendRequest({
                url: "/api/login",
                method: "POST",
                data: {
                    email,
                    password
                }
            });

            const { token, user } = data;

            setCookie(undefined, "soundvetx-token", token, {
                maxAge: 60 * 60 * 24 // 1 day,
            });

            setUser(user);

            Router.push("/");

            toast.success(message.clientMessage);
        } catch (error: any) {
            const { serverMessage, clientMessage } = error as RequestMessage;
			console.error(serverMessage);
			toast.error(clientMessage);
        }
    }

	return <AuthContext.Provider value={{ isAuthenticated, user, signIn }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}
