"use client"

import {
	LogOut,
	User as UserIcon,
	CircleUser
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import React from "react"
import { User, UserType } from "@/types/user"
import { UserTypes } from "@/utils/options"
import { getAbbreviationFromUf } from "@/utils/get-abbreviation-from-uf"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

interface ProfileDropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {
	user: User
}

const ProfileDropdownMenu = React.forwardRef<HTMLDivElement, ProfileDropdownMenuProps>(
	({ user }, ref) => {
	const router = useRouter()
	const { signOut } = useAuth()

	const userTypeName = UserTypes.find((type) => type.value === user.type)?.label
	const userUf = user.type === UserType.Veterinarian && getAbbreviationFromUf(user.uf)
	const userLabel = user.type === UserType.Veterinarian ? `CRMV ${user.crmv}/${userUf}` : userTypeName

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon" className="focus-visible:ring-0">
					<CircleUser className="w-7 h-7" />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent className="w-56" ref={ref}>
				<DropdownMenuLabel className="flex flex-col gap-0">
					<span className="md:hidden">{user.name}</span>
					<span>{userLabel}</span>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem className="cursor-pointer" onClick={() => router.push("/profile")}>
						<UserIcon className="mr-2 h-4 w-4" />
						<span>Perfil</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem className="cursor-pointer" onClick={signOut}>
					<LogOut className="mr-2 h-4 w-4" />
					<span>Sair</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
})

ProfileDropdownMenu.displayName = "ProfileDropdownMenu"

export { ProfileDropdownMenu }
