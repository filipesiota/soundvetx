"use client"

import { MainTitle } from "@/components/main-title";
import { NavbarHeader } from "@/components/navbar-header";
import { Switch } from "@/components/ui/switch";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { useLoading } from "@/contexts/loading-context";
import { getUsers } from "@/http/get-users";
import { RequestErrorClient } from "@/types/request";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function UsersPage() {
    const router = useRouter()
    const { setIsLoading } = useLoading()
    const [users, setUsers] = useState<User[]>([])

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

            <main className="flex flex-col items-center w-full max-w-screen-lg mx-auto py-8">
				<MainTitle
					size="small"
					title="Gerenciamento de usuários"
				/>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Tipo</TableHead>
                            <TableHead>Nome</TableHead>
                            <TableHead>E-mail</TableHead>
                            <TableHead className="w-[100px]">CRMV</TableHead>
                            <TableHead className="w-[100px]">UF</TableHead>
                            <TableHead className="text-right">Pode mandar WhatsApp?</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map(user => {
                            let userType = ""

                            switch (user.type) {
                                case "admin":
                                    userType = "Administrador"
                                    break
                                case "veterinarian":
                                    userType = "Veterinário"
                                    break
                                case "dev":
                                    userType = "Desenvolvedor"
                                    break
                            }

                            return (
                                <TableRow key={user.id}>
                                    <TableCell>{userType}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.type === "veterinarian" ? user.crmv : "Não se aplica"}</TableCell>
                                    <TableCell>{user.type === "veterinarian" ? user.uf : "Não se aplica"}</TableCell>
                                    <TableCell className="text-right">
                                        <Switch checked={user.canSendWhatsapp} />
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