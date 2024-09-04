"use client"

import React, { useState } from "react"
import router from "next/router"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useLoading } from "@/contexts/loading-context"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { User } from "@/types/user"
import { RequestErrorClient } from "@/types/request"
import { CustomAlertDialog } from "@/components/custom-alert-dialog"
import { formDataHasChanged } from "@/utils/form"
import { PasswordInput } from "@/components/password-input"
import { PasswordChangeForm, PasswordChangeSchema } from "@/schemas/password-schema"
import { changeUserPassword } from "@/http/change-user-password"
import { resetUserPassword } from "@/http/reset-user-password"

interface PasswordResetDialogProps extends React.HTMLAttributes<HTMLDivElement> {
	user: User
}

const PasswordResetDialog = React.forwardRef<HTMLButtonElement, PasswordResetDialogProps>(
	({ user, children }, ref) => {
		const { setIsLoading } = useLoading()
		const [isCheckAlertOpen, setIsCheckAlertOpen] = useState(false)
		const [isAlertOpen, setIsAlertOpen] = useState(false)
		const [newPassword, setNewPassword] = useState("")
		const [newPasswordMessage, setNewPasswordMessage] = useState("")

		async function copyToClipboard(withText: boolean) {
			if (!navigator.clipboard) {
				return
			}

			const text = withText ? newPasswordMessage : newPassword

			await navigator.clipboard.writeText(text)

			setNewPassword("")
			setNewPasswordMessage("")
			setIsAlertOpen(false)
			toast.success("Senha copiada para a área de transferência")
		}
	
		async function resetPassword() {
			setIsLoading(true)
	
			try {
				const { message, data } = await resetUserPassword({
					userId: user.id
				})
	
				toast.success(message.clientMessage)
				setNewPassword(data.newPassword)
				setNewPasswordMessage(`A nova senha é: ${data.newPassword}`)
				setIsAlertOpen(true)
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
				<Button ref={ref} className="flex gap-1 p-2" type="button" onClick={() => setIsCheckAlertOpen(true)}>
					{children}
				</Button>

				<CustomAlertDialog
					key="alert-confirm-reset-password"
					title="Redefinição de senha"
					description="Você tem certeza que deseja redefinir a senha do usuário?"
					confirmText="Sim"
					onCancel={() => setIsCheckAlertOpen(false)}
					onConfirm={resetPassword}
					isOpen={isCheckAlertOpen}
				/>

				<CustomAlertDialog
					key="alert-reset-password"
					title="Redefinição de senha"
					description={newPasswordMessage}
					secondaryButtonText="Copiar senha com texto"
					confirmText="Copiar senha"
					onSecondaryButton={() => copyToClipboard(true)}
					onConfirm={() => copyToClipboard(false)}
					hideSecondaryButton={false}
					hideCancelButton={true}
					invertActionButtonOrder={true}
					isOpen={isAlertOpen}
				/>
			</>
		)
})

PasswordResetDialog.displayName = "PasswordResetDialog"

interface PasswordChangeDialogProps extends React.HTMLAttributes<HTMLDivElement> {
	user: User
}

const PasswordChangeDialog = React.forwardRef<HTMLFormElement, PasswordChangeDialogProps>(
	({ user, children }, ref) => {
	const { isLoading, setIsLoading } = useLoading()
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [isAlertOpen, setIsAlertOpen] = useState(false)

	const originalData: PasswordChangeForm = {
		currentPassword: "",
		newPassword: "",
		confirmNewPassword: ""
	}

	const form = useForm<PasswordChangeForm>({
        resolver: zodResolver(PasswordChangeSchema),
        defaultValues: originalData
    })

	async function onSubmit(values: PasswordChangeForm) {
        setIsLoading(true)

        try {
            const { message } = await changeUserPassword({
                userId: user.id,
				values
            })

            toast.success(message.clientMessage)
			form.reset()
			setIsDialogOpen(false)
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

	function onCloseDialog(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		if (formDataHasChanged(form.getValues(), originalData)) {
			e.preventDefault()
			setIsAlertOpen(true)
			return
		}
	}

	function onConfirmAlert() {
		setIsAlertOpen(false)
	}

	function onDiscardAlert() {
		form.reset()
		toast.info("Alterações descartadas")
		setIsAlertOpen(false)
		setIsDialogOpen(false)
	}

	function onCancelAlert() {
		setIsAlertOpen(false)
	}
	
	return (
		<>
			<CustomAlertDialog
				title="Alterações pendentes"
				description="Deseja continuar alterando sua senha?"
				secondaryButtonText="Descartar"
				confirmText="Continuar"
				onCancel={onCancelAlert}
				onSecondaryButton={onDiscardAlert}
				onConfirm={onConfirmAlert}
				hideSecondaryButton={false}
				invertActionButtonOrder={true}
				isOpen={isAlertOpen}
			/>

			<Dialog
				open={isDialogOpen}
				onOpenChange={setIsDialogOpen}
			>
				<DialogTrigger asChild>
					{children}
				</DialogTrigger>

				<DialogContent
					disableOutsideClick
					onClose={onCloseDialog}
					className="responsive-dialog"
				>
					<DialogHeader>
						<DialogTitle>Alterar senha</DialogTitle>
						<DialogDescription>
							Preencha os campos para alterar sua senha
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
								name="currentPassword"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Senha atual</FormLabel>
										<FormControl>
											<PasswordInput {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="newPassword"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nova senha</FormLabel>
										<FormControl>
											<PasswordInput {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="confirmNewPassword"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Confirmar nova senha</FormLabel>
										<FormControl>
											<PasswordInput {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<DialogFooter>
								<Button type="submit" disabled={isLoading}>Salvar</Button>
							</DialogFooter>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		</>
    )
})

PasswordChangeDialog.displayName = "PasswordChangeDialog"

export {
	PasswordResetDialog,
	PasswordChangeDialog
}
