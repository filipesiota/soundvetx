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

interface ProfileDropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {
	user: User
}

const ProfileDropdownMenu = React.forwardRef<HTMLDivElement, ProfileDropdownMenuProps>(
	({ user }, ref) => {
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
				<DropdownMenuLabel>
					{user.name}<br/>{userLabel}
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem className="cursor-pointer">
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
