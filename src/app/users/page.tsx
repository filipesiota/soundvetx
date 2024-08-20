"use client"

import { MainTitle } from "@/components/main-title";
import { NavbarHeader } from "@/components/navbar-header";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { useLoading } from "@/contexts/loading-context";
import { canSendWhatsappUser } from "@/http/can-send-whatsapp-user";
import { deleteUser } from "@/http/delete-user";
import { getUsers } from "@/http/get-users";
import { restoreUser } from "@/http/restore-user";
import { updateUser } from "@/http/update-user";
import { RequestErrorClient } from "@/types/request";
import { User } from "@/types/user";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ArchiveRestore, Trash, UserPen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { UserFormDialogContent } from "@/components/user-form-dialog-content";
import { UserTypes } from "@/utils/options";

interface UserUpdateProps {
    data: User
    originalData: User
}

export default function UsersPage() {
    const router = useRouter()
    const { setIsLoading } = useLoading()
    const [users, setUsers] = useState<User[]>([])
    const [userUpdate, setUserUpdate] = useState<UserUpdateProps | null>(null)

    async function handleRestoreUser(user: User) {
        setIsLoading(true)

        try {
            const { message } = await restoreUser({ userId: user.id.toString() })

            const items = users.map(item => {
                if (item.id === user.id) {
                    return {
                        ...item,
                        isActive: true
                    }
                }
    
                return item
            })
    
            setUsers(items)

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

    async function handleDeleteUser(user: User) {
        setIsLoading(true)

        try {
            const { message } = await deleteUser({ userId: user.id.toString() })

            const items = users.map(item => {
                if (item.id === user.id) {
                    return {
                        ...item,
                        isActive: false
                    }
                }
    
                return item
            })
    
            setUsers(items)

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

    function onUserUpdateOpen(user: User) {
        setUserUpdate({
            data: user,
            originalData: user
        })
    }

    async function handleUpdateUser(user: User) {
        setIsLoading(true)

        try {
            const { message } = await updateUser({
                userId: user.id.toString(),
                name: user.name,
                email: user.email,
                crmv: user.type === "veterinarian" ? user.crmv : undefined,
                uf: user.type === "veterinarian" ? user.uf : undefined,
                canSendWhatsapp: user.canSendWhatsapp,
                type: user.type
            })

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

    async function handleCanSendWhatsappChange(user: User, checked: boolean) {
        setIsLoading(true)

        try {
            await canSendWhatsappUser({ userId: user.id.toString() })

            const items = users.map(item => {
                if (item.id === user.id) {
                    return {
                        ...item,
                        canSendWhatsapp: checked
                    }
                }
    
                return item
            })
    
            setUsers(items)
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

    async function loadUsers() {
        setIsLoading(true)

        try {
            const { data } = await getUsers()

            setUsers(data.users)
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

    useEffect(() => {
        loadUsers()
    }, [])

    return (
        <>
            <NavbarHeader />

            <main className="flex flex-col items-center w-full max-w-screen-xl mx-auto py-8">
				<MainTitle
					size="small"
					title="Gerenciamento de usuários"
				/>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="min-w-[100px]">Tipo</TableHead>
                            <TableHead className="min-w-[200px]">Nome</TableHead>
                            <TableHead className="min-w-[150px]">E-mail</TableHead>
                            <TableHead className="min-w-[100px]">CRMV</TableHead>
                            <TableHead className="min-w-[200px]">UF</TableHead>
                            <TableHead className="min-w-[100px] text-right">Pode mandar WhatsApp?</TableHead>
                            <TableHead className="min-w-[100px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map(user => {
                            const userType = UserTypes.find(item => item.value === user.type)?.label

                            return (
                                <TableRow key={user.id}>
                                    <TableCell>{userType}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.type === "veterinarian" ? user.crmv : "Não se aplica"}</TableCell>
                                    <TableCell>{user.type === "veterinarian" ? user.uf : "Não se aplica"}</TableCell>
                                    <TableCell className="text-right">
                                        <Switch
                                            checked={user.canSendWhatsapp}
                                            onCheckedChange={(checked) => {
                                                handleCanSendWhatsappChange(user, checked)
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell className="ml-2 flex gap-1">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => {
                                                        onUserUpdateOpen(user)
                                                    }}
                                                >
                                                    <UserPen />
                                                </Button>
                                            </DialogTrigger>

                                            <UserFormDialogContent
                                                state="edit"
                                                user={user}
                                                onClose={user => {
                                                    console.log(user)
                                                }}
                                            />
                                        </Dialog>

                                        {user.isActive ? (
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                title="Deletar"
                                                onClick={() => {
                                                    handleDeleteUser(user)
                                                }}
                                            >
                                                <Trash />
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                title="Restaurar"
                                                onClick={() => {
                                                    handleRestoreUser(user)
                                                }}
                                            >
                                                <ArchiveRestore />
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </main>
        </>
    )
}