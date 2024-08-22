"use client"

import React, { useState } from "react"
import router from "next/router"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { UserPlus, UserPen } from "lucide-react"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useLoading } from "@/contexts/loading-context"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormState } from "@/types/form"
import { User, UserType } from "@/types/user"
import { RequestErrorClient } from "@/types/request"
import { federativeUnits, UserTypes } from "@/utils/options"
import { updateUser } from "@/http/update-user"
import { UserCreateForm, UserCreateSchema, UserUpdateForm, UserUpdateSchema } from "@/schemas/user-schema"
import { CustomAlertDialog } from "@/components/custom-alert-dialog"
import { formDataHasChanged } from "@/utils/form"
import { createUser } from "@/http/create-user"
import { PasswordInput } from "@/components/password-input"

interface UserCreateDialogProps {
	onClose: (user: User) => void
}

const UserCreateDialog = React.forwardRef<HTMLFormElement, UserCreateDialogProps>(
	({ onClose }, ref) => {
		const { isLoading, setIsLoading } = useLoading()
		const [isDialogOpen, setIsDialogOpen] = useState(false)
		const [isAlertOpen, setIsAlertOpen] = useState(false)

		const originalData: UserCreateForm = {
			type: UserType.Veterinarian,
			fullName: "",
			crmv: "",
			uf: "",
			email: "",
			password: "",
			confirmPassword: ""
		}

		const form = useForm<UserCreateForm>({
			resolver: zodResolver(UserCreateSchema),
			defaultValues: originalData
		})
	
		async function onSubmit(values: UserCreateForm) {
			setIsLoading(true)
	
			try {
				const { message, data } = await createUser(values)
	
				toast.success(message.clientMessage)
				onClose(data.user)
				setIsDialogOpen(false)
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

		function onCloseDialog(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
			if (formDataHasChanged(form.getValues(), originalData)) {
				e.preventDefault()
				setIsAlertOpen(true)
				return
			}
		}
	
		function onConfirmAlert() {
			form.handleSubmit(onSubmit)()
			setIsAlertOpen(false)
		}
	
		function onCancelAlert() {
			form.reset()
			toast.info("Dados descartados")
			setIsAlertOpen(false)
			setIsDialogOpen(false)
		}
	
		return (
			<>
				<CustomAlertDialog
					title="Salvar usuário"
					description="Deseja salvar este novo usuário?"
					cancelText="Descartar"
					confirmText="Salvar"
					onCancel={onCancelAlert}
					onConfirm={onConfirmAlert}
					isOpen={isAlertOpen}
				/>
	
				<Dialog
					open={isDialogOpen}
					onOpenChange={setIsDialogOpen}
				>
					<DialogTrigger asChild>
						<Button
							variant="outline"
							size="default"
							className="flex items-center gap-2"
						>
							<UserPlus className="size-5" />
							Cadastrar usuário
						</Button>
					</DialogTrigger>
	
					<DialogContent
						disableOutsideClick
						onClose={onCloseDialog}
					>
						<DialogHeader>
							<DialogTitle>Cadastrar usuário</DialogTitle>
							<DialogDescription>
								Preencha os campos para cadastrar um novo usuário
							</DialogDescription>
						</DialogHeader>
	
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="flex flex-col w-full gap-4"
								ref={ref}
							>
								<FormField
									control={form.control}
									name="type"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Tipo</FormLabel>
											<FormControl>
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}
												>
													<SelectTrigger>
														<SelectValue placeholder="" />
													</SelectTrigger>
													<SelectContent>
														{UserTypes.map(item => (
															<SelectItem
																key={item.value}
																value={item.value}
															>
																{item.label}
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
	
								{form.watch("type") === UserType.Veterinarian && (
									<>
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
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</>
								)}
	
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
	
								<DialogFooter>
									<Button type="submit" disabled={isLoading}>Atualizar</Button>
								</DialogFooter>
							</form>
						</Form>
					</DialogContent>
				</Dialog>
			</>
		)
})

UserCreateDialog.displayName = "UserCreateDialog"

interface UserUpdateDialogProps {
	user: User
	onClose: (user: User) => void
}

const UserUpdateDialog = React.forwardRef<HTMLFormElement, UserUpdateDialogProps>(
	({ user, onClose }, ref) => {
	const { isLoading, setIsLoading } = useLoading()
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [isAlertOpen, setIsAlertOpen] = useState(false)
	const [originalData, setOriginalData] = useState<UserUpdateForm>({
		type: user.type,
		fullName: user.name,
		crmv: user.type === UserType.Veterinarian ? user.crmv : "",
		uf: user.type === UserType.Veterinarian ? user.uf : "",
		email: user.email
	})

	const form = useForm<UserUpdateForm>({
        resolver: zodResolver(UserUpdateSchema),
        defaultValues: originalData
    })

	async function onSubmit(values: UserUpdateForm) {
        setIsLoading(true)

        try {
            const { message, data } = await updateUser({
                userId: user.id,
				values
            })

            toast.success(message.clientMessage)
			onClose(data.user)
			setOriginalData(values)
			setIsDialogOpen(false)
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

	function onCloseDialog(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		if (formDataHasChanged(form.getValues(), originalData)) {
			e.preventDefault()
			setIsAlertOpen(true)
			return
		}
	}

	function onConfirmAlert() {
		form.handleSubmit(onSubmit)()
		setIsAlertOpen(false)
	}

	function onCancelAlert() {
		form.reset()
		toast.info("Alterações descartadas")
		setIsAlertOpen(false)
		setIsDialogOpen(false)
	}
	
	return (
		<>
			<CustomAlertDialog
				title="Salvar alterações"
				description="Deseja salvar as alterações feitas?"
				cancelText="Descartar"
				confirmText="Salvar"
				onCancel={onCancelAlert}
				onConfirm={onConfirmAlert}
				isOpen={isAlertOpen}
			/>

			<Dialog
				open={isDialogOpen}
				onOpenChange={setIsDialogOpen}
			>
				<DialogTrigger asChild>
					<Button
						variant="outline"
						size="icon"
					>
						<UserPen />
					</Button>
				</DialogTrigger>

				<DialogContent
					disableOutsideClick
					onClose={onCloseDialog}
				>
					<DialogHeader>
						<DialogTitle>Editar usuário</DialogTitle>
						<DialogDescription>
							Edite as informações do usuário
						</DialogDescription>
					</DialogHeader>

					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="flex flex-col w-full gap-4"
							ref={ref}
						>
							<FormField
								control={form.control}
								name="type"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Tipo</FormLabel>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<SelectTrigger>
													<SelectValue placeholder="" />
												</SelectTrigger>
												<SelectContent>
													{UserTypes.map(item => (
														<SelectItem
															key={item.value}
															value={item.value}
														>
															{item.label}
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

							{form.watch("type") === UserType.Veterinarian && (
								<>
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
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</>
							)}

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

							<DialogFooter>
								<Button type="submit" disabled={isLoading}>Atualizar</Button>
							</DialogFooter>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		</>
    )
})

UserUpdateDialog.displayName = "UserUpdateDialog"

interface UserFormDialogProps {
    state: FormState,
	user?: User,
	onClose: (user: User) => void
}

const UserFormDialog = React.forwardRef<HTMLFormElement, UserFormDialogProps>(
	({ state, user, onClose, ...props }, ref) => {
	return state === FormState.Update && user ? (
		<UserUpdateDialog ref={ref} user={user} onClose={onClose} />
	) : (
		<UserCreateDialog ref={ref} onClose={onClose} />
	)
})

UserFormDialog.displayName = "UserFormDialog"

export { UserFormDialog }
