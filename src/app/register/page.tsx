"use client";

import { brazilStates } from "@/@types/brazil-states";
import { VeterinarianSchema, Veterinarian } from "@/@types/veterinarian";

import { FormSection } from "@/components/form-section";
import { MainTitle } from "@/components/main-title";
import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
	FormDescription
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectItem,
	SelectValue
} from "@/components/ui/select";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function RegisterPage() {
	const form = useForm<Veterinarian>({
		resolver: zodResolver(VeterinarianSchema),
		defaultValues: {
			fullName: "",
			crmv: "",
            uf: "",
			email: "",
			password: "",
			confirmPassword: ""
		}
	});

	async function onSubmit(values: Veterinarian) {
		toast.success("Formulário processado com sucesso!");
	}

	return (
		<main className="flex flex-col items-center justify-center w-full h-full min-h-dvh max-w-md mx-auto py-8">
			<MainTitle title="SoundvetX" />

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col w-full gap-8 mt-5"
				>
					<FormSection title="Cadastrar conta" align="center">
						<FormField
							control={form.control}
							name="fullName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nome completo</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="crmv"
							render={({ field }) => (
								<FormItem>
									<FormLabel>CRMV</FormLabel>
									<FormDescription>
										Número de inscrição no Conselho Regional de Medicina
										Veterinária
									</FormDescription>
									<FormControl>
										<Input placeholder="00000" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="uf"
							render={({ field }) => (
								<FormItem>
									<FormLabel>UF</FormLabel>
									<FormDescription>
										Unidade Federativa referente ao CRMV
									</FormDescription>
									<FormControl>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<SelectTrigger>
												<SelectValue placeholder="" />
											</SelectTrigger>
											<SelectContent>
												{brazilStates.map(state => (
													<SelectItem
														key={state.abbreviation}
														value={`${state.name} (${state.abbreviation})`}
													>
														{state.name} ({state.abbreviation})
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>E-mail</FormLabel>
									<FormControl>
										<Input {...field} />
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
										<PasswordInput {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="confirmPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirmar senha</FormLabel>
									<FormControl>
										<PasswordInput {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</FormSection>

					<Button type="submit">Cadastrar</Button>

					<div className="text-center">
						Já possui uma conta? <Link href="/login">Faça seu login!</Link>
					</div>
				</form>
			</Form>
		</main>
	);
}
