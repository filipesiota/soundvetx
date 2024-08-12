import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { Login } from "@/schemas/login-schema"
import { RequestErrorClient } from "@/types/request"
import { Veterinarian } from "@/schemas/veterinarian-schema"
import { User } from "@/types/user"
import { signUpUser } from "@/http/sign-up-user"
import { signInUser } from "@/http/sign-in-user"
import { signOutUser } from "@/http/sign-out-user"
import { refreshUserData } from "@/http/refresh-user-data"

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
		refreshUser()
	}, [])

	async function refreshUser() {
		try {
			const { data } = await refreshUserData()

			if (!data) {
				return
			}

			setUser(data.user)
		} catch (error: any) {
			const { message, status } = error as RequestErrorClient
			console.error(message.serverMessage)
			toast.error(message.clientMessage)

			if (status === 401) {
				router.replace("/login")
			}
		}
	}

	async function signUp({ fullName, crmv, uf, email, password, confirmPassword }: Veterinarian) {
		try {
			const { message } = await signUpUser({
				fullName,
				crmv,
				uf,
				email,
				password,
				confirmPassword
			})

			toast.success(message.clientMessage)
			router.push(`/login?email=${email}&password=${password}`)
		} catch (error: any) {
			const { message, status } = error as RequestErrorClient
			console.error(message.serverMessage)
			toast.error(message.clientMessage)

			if (status === 401) {
				router.replace("/login")
			}
		}
	}

	async function signIn({ email, password }: Login) {
		try {
			const { message, data } = await signInUser({ email, password })

			setUser(data.user)

			toast.success(message.clientMessage)
			router.push("/")
		} catch (error: any) {
			const { message, status } = error as RequestErrorClient
			console.error(message.serverMessage)
			toast.error(message.clientMessage)

			if (status === 401) {
				router.replace("/login")
			}
		}
	}

	async function signOut() {
		try {
			const { message } = await signOutUser()

			setUser(null)
			toast.success(message.clientMessage)
			router.replace("/login")
		} catch (error: any) {
			const { message, status } = error as RequestErrorClient
			console.error(message.serverMessage)
			toast.error(message.clientMessage)

			if (status === 401) {
				router.replace("/login")
			}
		}
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
