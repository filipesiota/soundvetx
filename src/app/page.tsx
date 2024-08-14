"use client"

import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { FormSection } from "@/components/form-section"
import { FormGrid } from "@/components/form-grid"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select"
import { MainTitle } from "@/components/main-title"
import { CheckboxItem } from "@/components/checkbox-item"
import { Textarea } from "@/components/ui/textarea"
import { useLoading } from "@/contexts/loading-context"
import { generateExamRequest } from "@/http/generate-exam-request"
import { ExamRequest, ExamRequestSchema } from "@/schemas/exam-request-schema"
import { softTissues, skullItems, axialSkeletonItems, appendicularSkeletonItems, combos } from "@/utils/options"
import { toast } from "sonner"
import { useAuth } from "@/contexts/auth-context"
import { NavbarHeader } from "@/components/navbar-header"
import { useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { useRouter } from "next/router"
import { RequestErrorClient } from "@/types/request"

export default function ExamRequestPage() {
	const router = useRouter()
	const { isLoading, setIsLoading } = useLoading()
	const { user } = useAuth()
	const disableVeterinarianNameInput = user ? user.type === "veterinarian" : false

	const form = useForm<ExamRequest>({
		resolver: zodResolver(ExamRequestSchema),
		defaultValues: {
			veterinarianClinic: "",
			veterinarianName: "",
			patientName: "",
			patientSpecies: "",
			patientSex: "",
			patientAge: undefined,
			patientBreed: "",
			patientTutor: "",
			examSuspicion: "",
			examComplementaryDone: "",
			softTissues: [],
			skullItems: [],
			axialSkeletonItems: [],
			appendicularSkeletonItems: [],
			combos: [],
			observations: ""
		}
	})

	useEffect(() => {
		if (user && user.type === "veterinarian") {
			form.setValue("veterinarianName", user.name)
		}
	}, [user])

	async function onSubmit(values: ExamRequest) {
		setIsLoading(true)

		try {
			const { message, data } = await generateExamRequest(values)
	
			console.log(data?.url)
	
			toast.success(message.clientMessage)
		} catch (error: any) {
			const { status, message } = error as RequestErrorClient
			console.error(message.serverMessage)
			toast.error(message.clientMessage)

			if (status === 401) {
				router.replace("/login")
			}
		} finally {
			setIsLoading(false)
		}		
	}

	return (
		<>
			<NavbarHeader />

			<main className="flex flex-col items-center w-full max-w-screen-lg mx-auto py-8">
				<MainTitle
					size="small"
					title="Formulário para requisição de exame de imagem"
				/>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col w-full gap-8 mt-6"
					>
						<FormSection title="Dados do Requerente">
							<FormGrid cols={2}>
								<FormField
									control={form.control}
									name="veterinarianName"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Médica(o) Veterinária(o)</FormLabel>
											<FormControl>
												{user ? (
													<Input {...field} disabled={disableVeterinarianNameInput} />
												) : (
													<Skeleton className="h-[35px]" />
												)}
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="veterinarianClinic"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Clínica Veterinária</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</FormGrid>
						</FormSection>

						<FormSection title="Dados do Paciente">
							<FormGrid cols={3}>
								<FormField
									control={form.control}
									name="patientName"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Nome</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="patientSpecies"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Espécie</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="patientSex"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Sexo</FormLabel>
											<FormControl>
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}
												>
													<SelectTrigger>
														<SelectValue placeholder="" />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="Macho">Macho</SelectItem>
														<SelectItem value="Fêmea">Fêmea</SelectItem>
													</SelectContent>
												</Select>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="patientAge"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Idade</FormLabel>
											<FormControl>
												<Input type="number" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="patientBreed"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Raça</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="patientTutor"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Tutor(a)</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</FormGrid>
						</FormSection>

						<FormSection title="Dados do Exame">
							<FormField
								control={form.control}
								name="examSuspicion"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Suspeita</FormLabel>
										<FormControl>
											<Textarea className="resize-none" rows={2} {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="examComplementaryDone"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Exame complementar realizado</FormLabel>
										<FormControl>
											<Textarea className="resize-none" rows={2} {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</FormSection>

						<FormSection title="Solicitação">
							<FormGrid cols={2}>
								<FormField
									control={form.control}
									name="softTissues"
									render={() => (
										<FormItem>
											<FormLabel>Tecidos moles</FormLabel>
											<div className="grid grid-cols-1 gap-2 items-top">
												{softTissues.map(item => (
													<CheckboxItem
														key={item.id}
														name="softTissues"
														formControl={form.control}
														option={item}
													/>
												))}
											</div>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="skullItems"
									render={() => (
										<FormItem>
											<FormLabel>Crânio</FormLabel>
											<div className="grid grid-cols-2 gap-2 items-top">
												{skullItems.map(item => (
													<CheckboxItem
														key={item.id}
														name="skullItems"
														formControl={form.control}
														option={item}
													/>
												))}
											</div>
											<FormDescription>
												*Exames com necessidade de sedação para melhor
												posicionamento.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="axialSkeletonItems"
									render={() => (
										<FormItem>
											<FormLabel>Esqueleto Axial</FormLabel>
											<div className="grid grid-cols-2 gap-2 items-top">
												{axialSkeletonItems.map(item => (
													<CheckboxItem
														key={item.id}
														name="axialSkeletonItems"
														formControl={form.control}
														option={item}
													/>
												))}
											</div>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="appendicularSkeletonItems"
									render={() => (
										<FormItem>
											<FormLabel>Esqueleto Apendicular</FormLabel>
											<div className="grid grid-cols-1 gap-2 items-top">
												{appendicularSkeletonItems.map(item => (
														<CheckboxItem
															key={item.id}
															name="appendicularSkeletonItems"
															formControl={form.control}
															option={item}
														/>
													)
												)}
											</div>
											<FormMessage />
										</FormItem>
									)}
								/>
							</FormGrid>

							<FormField
								control={form.control}
								name="combos"
								render={() => (
									<FormItem>
										<FormLabel>Combos</FormLabel>
										<div className="grid grid-cols-1 gap-2 items-top">
											{combos.map(item => (
												<CheckboxItem
													key={item.id}
													name="combos"
													formControl={form.control}
													option={item}
												/>
											))}
										</div>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="observations"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Observações</FormLabel>
										<FormControl>
											<Textarea className="resize-none" rows={4} {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormDescription className="text-center">
								*Os exames de imagem devem ser correlacionados com a Clínica do paciente
								e demais exames complementares.
							</FormDescription>
						</FormSection>

						<Button type="submit" disabled={isLoading}>
							Enviar
						</Button>
					</form>
				</Form>
			</main>
		</>
	)
}
