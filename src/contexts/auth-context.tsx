import { createContext, useContext, useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { toast } from "sonner"

import { Login } from "@/schemas/login-schema"
import { RequestErrorClient } from "@/types/request"
import { User } from "@/types/user"
import { createUser } from "@/http/create-user"
import { signInUser } from "@/http/sign-in-user"
import { signOutUser } from "@/http/sign-out-user"
import { refreshUserData } from "@/http/refresh-user-data"
import { useLoading } from "@/contexts/loading-context"
import { UserCreateForm } from "@/schemas/user-schema"

interface AuthContextProps {
	isAuthenticated: boolean
	user: User | null
	signIn: (login: Login) => Promise<void>
	signUp: (user: UserCreateForm) => Promise<void>
	signOut: () => void
}

const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const router = useRouter()
	const pathname = usePathname()
	const { setIsLoading } = useLoading()
	const [user, setUser] = useState<User | null>(null)
	const isAuthenticated = !!user

	useEffect(() => {
		if (!["/login", "/register"].includes(pathname)) {
			refreshUser()
		}
	}, [])

	async function refreshUser() {
		try {
			const { data } = await refreshUserData()

			if (!data) {
				return
			}

			setUser(data.user)
		} catch (error: any) {
			const { status } = error as RequestErrorClient

			if (status === 401) {
				router.replace("/login")
			}
		}
	}

	async function signUp({ fullName, email, password, confirmPassword, ...props }: UserCreateForm) {
		setIsLoading(true)

		try {
			const { message } = await createUser({
				fullName,
				email,
				password,
				confirmPassword,
				...props
			})

			toast.success(message.clientMessage)
			router.push(`/login?email=${email}&password=${password}`)
		} catch (error: any) {
			const { message, status } = error as RequestErrorClient
			toast.error(message.clientMessage)

			if (status === 401) {
				router.replace("/login")
			}
		} finally {
			setIsLoading(false)
		}
	}

	async function signIn({ email, password }: Login) {
		setIsLoading(true)

		try {
			const { message, data } = await signInUser({ email, password })

			setUser(data.user)

			toast.success(message.clientMessage)
			router.push("/")
		} catch (error: any) {
			const { message, status } = error as RequestErrorClient
			toast.error(message.clientMessage)

			if (status === 401) {
				router.replace("/login")
			}
		} finally {
			setIsLoading(false)
		}
	}

	async function signOut() {
		setIsLoading(true)

		try {
			const { message } = await signOutUser()

			setUser(null)
			toast.success(message.clientMessage)
			router.replace("/login")
		} catch (error: any) {
			const { message, status } = error as RequestErrorClient
			toast.error(message.clientMessage)

			if (status === 401) {
				router.replace("/login")
			}
		} finally {
			setIsLoading(false)
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
