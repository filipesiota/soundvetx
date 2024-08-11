import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { parseCookies, setCookie, destroyCookie } from "nookies"
import { toast } from "sonner"

import { Login } from "@/schemas/login-schema"
import { RequestMessage } from "@/types/request"
import { sendRequest } from "@/utils/request"
import { Veterinarian } from "@/schemas/veterinarian-schema"
import { User } from "@/types/user"
import { signUpUser } from "@/http/sign-up-user"
import { signInUser } from "@/http/sign-in-user"

interface AuthContextProps {
	isAuthenticated: boolean
	user: User | null
	signIn: (login: Login) => Promise<void>
	signUp: (veterinarian: Veterinarian) => Promise<void>
	signOut: () => void
}

const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const router = useRouter()
	const [user, setUser] = useState<User | null>(null)
	const isAuthenticated = !!user

	useEffect(() => {
		const { "soundvetx-token": token } = parseCookies(undefined)

		if (token) {
			sendRequest({
				url: "/api/me",
				method: "GET"
			}).then(response => setUser(response.data))
		}
	}, [])

	async function signUp({ fullName, crmv, uf, email, password, confirmPassword }: Veterinarian) {
		try {
			const { message, data } = await signUpUser({
				fullName,
				crmv,
				uf,
				email,
				password,
				confirmPassword
			})

			console.log(data)

			toast.success(message.clientMessage)
			router.push(`/login?email=${email}&password=${password}`)
		} catch (error: any) {
			const { serverMessage, clientMessage } = error as RequestMessage
			console.error(serverMessage)
			toast.error(clientMessage)
		}
	}

	async function signIn({ email, password }: Login) {
		try {
			const { message, data } = await signInUser({ email, password })

			setCookie(undefined, "soundvetx-token", data.token, {
				maxAge: 60 * 60 * 24 // 1 day,
			})
			setCookie(undefined, "soundvetx-refresh-token", data.refreshToken)

			setUser(data.user)

			toast.success(message.clientMessage)
			router.push("/")
		} catch (error: any) {
			const { serverMessage, clientMessage } = error as RequestMessage
			console.error(serverMessage)
			toast.error(clientMessage)
		}
	}

	async function signOut() {
		destroyCookie(undefined, "soundvetx-token")
		destroyCookie(undefined, "soundvetx-refresh-token")
		setUser(null)
		router.push("/login")
	}

	return (
		<AuthContext.Provider value={{ isAuthenticated, user, signUp, signIn, signOut }}>
			{children}
		</AuthContext.Provider>
	)
}

export function useAuth() {
	return useContext(AuthContext)
}
