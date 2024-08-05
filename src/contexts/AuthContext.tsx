import { Login } from "@/@types/Login";
import { RequestMessage } from "@/@types/RequestResponse";
import { sendRequest } from "@/utils/request";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { User } from "@/@types/User";
import { useRouter } from "next/navigation";
import { Veterinarian } from "@/@types/Veterinarian";

export type AuthContextType = {
	isAuthenticated: boolean;
    user: User | null;
    signIn: (login: Login) => Promise<void>;
    signUp: (veterinarian: Veterinarian) => Promise<void>;
    signOut: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
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

    async function signUp({ fullName, crmv, uf, email, password, confirmPassword }: Veterinarian) {
        try {
			const { message } = await sendRequest({
				url: "/api/users",
				method: "POST",
				data: {
                    fullName,
                    crmv,
                    uf,
                    email,
                    password,
                    confirmPassword
                }
			});

			toast.success(message.clientMessage);
			router.push(`/login?email=${email}&password=${password}`);
		} catch (error: any) {
			const { serverMessage, clientMessage } = error as RequestMessage;
			console.error(serverMessage);
			toast.error(clientMessage);
		}
    }

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

            toast.success(message.clientMessage);
            router.push("/");
        } catch (error: any) {
            const { serverMessage, clientMessage } = error as RequestMessage;
			console.error(serverMessage);
			toast.error(clientMessage);
        }
    }

    async function signOut() {
        destroyCookie(undefined, "soundvetx-token");
        setUser(null);
        router.push("/login");
    }

	return <AuthContext.Provider value={{ isAuthenticated, user, signUp, signIn, signOut }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}
