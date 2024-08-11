"use client"

import { LoginSchema, Login } from "@/schemas/login-schema"
import { FormSection } from "@/components/form-section"
import { MainTitle } from "@/components/main-title"
import { PasswordInput } from "@/components/password-input"
import { Button } from "@/components/ui/button"
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { useAuth } from "@/contexts/auth-context"
import { useSearchParams } from "next/navigation"
import { useLoading } from "@/contexts/loading-context"

export default function LoginPage() {
	const searchParams = useSearchParams()
	const email = searchParams.get("email")
	const password = searchParams.get("password")

	const { isLoading, setIsLoading } = useLoading()
	const { signIn } = useAuth()

	const form = useForm<Login>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: email ?? "",
			password: password ?? ""
		}
	})

	async function onSubmit(values: Login) {
		setIsLoading(true)
		await signIn(values)
		setIsLoading(false)
	}

	return (
		<main className="flex flex-col items-center justify-center w-full h-full min-h-dvh max-w-md mx-auto py-8">
			<MainTitle title="SoundvetX" />

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col w-full gap-8 mt-5"
				>
					<FormSection title="Login" align="center">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>E-mail</FormLabel>
									<FormControl>
										<Input placeholder="nome@exemplo.com" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Senha</FormLabel>
									<FormControl>
										<PasswordInput placeholder="**********" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</FormSection>

					<Button type="submit" disabled={isLoading}>
						Entrar
					</Button>

					<div className="text-center">
						Não possui uma conta? <Link href="/register">Cadastre uma agora!</Link>
					</div>
				</form>
			</Form>
		</main>
	)
}
