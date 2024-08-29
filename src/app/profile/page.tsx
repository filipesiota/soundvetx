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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select"
import { MainTitle } from "@/components/main-title"
import { useLoading } from "@/contexts/loading-context"
import { federativeUnits, UserTypes } from "@/utils/options"
import { toast } from "sonner"
import { useAuth } from "@/contexts/auth-context"
import { Header } from "@/components/header"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { RequestErrorClient } from "@/types/request"
import { UserType } from "@/types/user"
import { CustomAlertDialog } from "@/components/custom-alert-dialog"
import { updateUser } from "@/http/update-user"
import { UserUpdateForm, UserUpdateSchema } from "@/schemas/user-schema"
import { Main } from "@/components/main"

export default function ExamRequestPage() {
    const router = useRouter()
    const { user } = useAuth()
	const { isLoading, setIsLoading } = useLoading()

	const [isAlertOpen, setIsAlertOpen] = useState(false)
	const [originalData, setOriginalData] = useState<UserUpdateForm>()

	const form = useForm<UserUpdateForm>({
        resolver: zodResolver(UserUpdateSchema),
        defaultValues: {
            type: UserType.Veterinarian,
            fullName: "",
            crmv: "",
            uf: "",
            email: ""
        }
    })

    useEffect(() => {
        if (user) {
            setOriginalData({
                type: user.type,
                fullName: user.name,
                crmv: user.type === UserType.Veterinarian ? user.crmv : "",
                uf: user.type === UserType.Veterinarian ? user.uf : "",
                email: user.email
            })
        }
    }, [user])

	async function onSubmit(values: UserUpdateForm) {
        if (!user) {
            return
        }

        setIsLoading(true)

        try {
            const { message } = await updateUser({
                userId: user.id,
				values
            })

            toast.success(message.clientMessage)
			setOriginalData(values)
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

	function onConfirmAlert() {
		form.handleSubmit(onSubmit)()
		setIsAlertOpen(false)
	}

	function onCancelAlert() {
		form.reset()
		toast.info("Alterações descartadas")
		setIsAlertOpen(false)
	}
	
	return (
		<>
            <Header />

            <Main>
                <MainTitle
					size="small"
					title="Perfil"
				/>

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

                        <div className="flex justify-end">
                            <Button type="submit" disabled={isLoading}>
                                Salvar alterações
                            </Button>
                        </div>
                    </form>
                </Form>
            </Main>

            <CustomAlertDialog
				title="Salvar alterações"
				description="Deseja salvar as alterações feitas?"
				cancelText="Descartar"
				confirmText="Salvar"
				onCancel={onCancelAlert}
				onConfirm={onConfirmAlert}
				isOpen={isAlertOpen}
			/>
		</>
    )
}
