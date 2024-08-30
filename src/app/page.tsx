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
import { softTissues, skullItems, axialSkeletonItems, appendicularSkeletonItems, combos, federativeUnits } from "@/utils/options"
import { toast } from "sonner"
import { useAuth } from "@/contexts/auth-context"
import { Header } from "@/components/header"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { useRouter } from "next/navigation"
import { RequestErrorClient } from "@/types/request"
import { UserType } from "@/types/user"
import { CustomAlertDialog } from "@/components/custom-alert-dialog"
import { SendExamRequest } from "@/validations/send-exam-validation"
import { sendExamRequest } from "@/http/send-exam-request"
import { Main } from "@/components/main"

export default function ExamRequestPage() {
	const router = useRouter()
	const { isLoading, setIsLoading } = useLoading()
	const { user } = useAuth()

	const [isAlertOpen, setIsAlertOpen] = useState(false)
	const [canCloseAlert, setCanCloseAlert] = useState(false)
	const [examRequestSent, setExamRequestSent] = useState(false)
	const [sendExamRequestProps, setSendExamRequestProps] = useState<SendExamRequest>({
		veterinarianClinic: "",
		veterinarianName: "",
		patientName: "",
		reportUrl: ""
	})

	const disableVeterinarianNameInput = user ? user.type === UserType.Veterinarian : false
	const canSendToWhatsapp = user ? user.canSendWhatsapp : false

	const form = useForm<ExamRequest>({
		resolver: zodResolver(ExamRequestSchema),
		defaultValues: {
			veterinarianClinic: "",
			veterinarianName: "",
			veterinarianCrmv: "",
			veterinarianUf: "",
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
		if (user && user.type === UserType.Veterinarian) {
			form.setValue("veterinarianName", user.name)
			form.setValue("veterinarianCrmv", user.crmv)
			form.setValue("veterinarianUf", user.uf)
		}
	}, [user])

	async function onSubmit(values: ExamRequest) {
		setIsLoading(true)

		try {
			const { message, data } = await generateExamRequest(values)
	
			setSendExamRequestProps({
				veterinarianClinic: values.veterinarianClinic,
				veterinarianName: values.veterinarianName,
				patientName: values.patientName,
				reportUrl: data.url
			})
			setIsAlertOpen(true)
	
			toast.success(message.clientMessage)
		} catch (error: any) {
			const { status, message } = error as RequestErrorClient
			toast.error(message.clientMessage)

			if (status === 401) {
				router.replace("/login")
			}
		} finally {
			setIsLoading(false)
		}
	}

	function handleCloseAlert() {
		setIsAlertOpen(false)
		setCanCloseAlert(false)
		setExamRequestSent(false)
		form.reset()
	}

	function handleDownload() {
		window.open(sendExamRequestProps.reportUrl, "_blank")
		setCanCloseAlert(true)
	}

	async function handleSendToSoundvetX() {
		toast.info("Enviando para SoundvetX...")
		setIsLoading(true)

		try {
			const { message } = await sendExamRequest(sendExamRequestProps)
	
			toast.success(message.clientMessage)
			setExamRequestSent(true)
			setCanCloseAlert(true)
		} catch (error: any) {
			const { status, message } = error as RequestErrorClient
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
			<Header />

			<Main>
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

							<FormGrid cols={3}>
								<FormField
									control={form.control}
									name="veterinarianName"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Médica(o) Veterinária(o)</FormLabel>
											<FormDescription>
												Nome completo do(a) Médico(a) Veterinário(a)
											</FormDescription>
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
									name="veterinarianCrmv"
									render={({ field }) => (
										<FormItem>
											<FormLabel>CRMV do(a) Veterinário(a)</FormLabel>
											<FormDescription>
												Número de inscrição no Conselho Regional de Medicina Veterinária
											</FormDescription>
											<FormControl>
												{user ? (
													<Input placeholder="00000" {...field} disabled={disableVeterinarianNameInput} />
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
									name="veterinarianUf"
									render={({ field }) => (
										<FormItem>
											<FormLabel>UF</FormLabel>
											<FormDescription>
												Unidade Federativa referente ao CRMV
											</FormDescription>
											<FormControl>
												{user ? (
													<Select
														onValueChange={field.onChange}
														defaultValue={user.type === UserType.Veterinarian ? user.uf : field.value}
														disabled={disableVeterinarianNameInput}
													>
														<SelectTrigger>
															<SelectValue />
														</SelectTrigger>
														<SelectContent>
															{federativeUnits.map(item => (
																<SelectItem
																	key={item.abbreviation}
																	value={`${item.name} (${item.abbreviation})`}
																>
																	{item.name} ({item.abbreviation})
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												) : (
													<Skeleton className="h-[35px]" />
												)}
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

						<div className="flex justify-end">
							<Button type="submit" disabled={isLoading} className="px-14">
								Enviar
							</Button>
						</div>
					</form>
				</Form>
			</Main>

			<CustomAlertDialog
				title="Arquivo de Requisição de Exame"
				description="O arquivo de requisição de exame foi gerado com sucesso. O que deseja fazer?"
				cancelText="Fechar"
				confirmText="Fazer Download"
				secondaryButtonText={canSendToWhatsapp ? "Enviar para SoundvetX" : undefined}
				onCancel={handleCloseAlert}
				onConfirm={handleDownload}
				onSecondaryButton={handleSendToSoundvetX}
				hideCancelButton={!canCloseAlert}
				hideSecondaryButton={examRequestSent}
				isOpen={isAlertOpen}
			/>
		</>
	)
}
