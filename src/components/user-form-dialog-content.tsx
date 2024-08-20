"use client"

import { FormState } from "@/types/form-state"
import React from "react"
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useLoading } from "@/contexts/loading-context"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { UserForm, UserSchema } from "@/schemas/user-schema"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { federativeUnits, UserTypes } from "@/utils/options"
import { User, UserType } from "@/types/user"

interface UserFormDialogContentProps extends React.HTMLAttributes<HTMLFormElement> {
    state: FormState,
	user?: User,
	onClose: (user: User) => void
}

const UserFormDialogContent = React.forwardRef<HTMLFormElement, UserFormDialogContentProps>(
	({ className, state, user, onClose, ...props }, ref) => {
    const { isLoading, setIsLoading } = useLoading()

    const form = useForm<UserForm>({
        resolver: zodResolver(UserSchema),
        defaultValues: {
			type: user ? user.type : UserType.Veterinarian,
            fullName: user ? user.name : "",
			crmv: user && user.type === UserType.Veterinarian ? user.crmv : "",
            uf: user && user.type === UserType.Veterinarian ? user.uf : "",
			email: user ? user.email : ""
        }
    })

	async function onSubmit(values: UserForm) {
		setIsLoading(true)
		onClose(user ?? {} as User)
		setIsLoading(false)
	}
    
    return (
        <DialogContent onInteractOutside={e => e.preventDefault()}>
            <DialogHeader>
                <DialogTitle>{state === "add" ? "Cadastrar usuário" : "Editar usuário"}</DialogTitle>
            </DialogHeader>

            <Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col w-full gap-4"
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
						<Button type="submit" disabled={isLoading}>{state === "add" ? "Cadastrar" : "Atualizar"}</Button>
					</DialogFooter>
				</form>
            </Form>
        </DialogContent>
    )
})

UserFormDialogContent.displayName = "UserFormDialogContent"

export { UserFormDialogContent }