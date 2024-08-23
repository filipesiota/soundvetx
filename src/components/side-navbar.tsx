import React from "react"
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { NavbarItem } from "@/components/navbar-item"
import { usePathname } from "next/navigation"

interface SideNavbarProps extends React.HTMLAttributes<HTMLButtonElement> {}

const SideNavbar = React.forwardRef<HTMLButtonElement, SideNavbarProps>(({ ...props }, ref) => {
    const pathName = usePathname()

	return (
		<Sheet>
			<SheetTrigger ref={ref} {...props}>
                <Menu className="w-7 h-7" />
            </SheetTrigger>
			<SheetContent side="left">
				<SheetHeader className="mt-5">
					<SheetTitle><h1 className="text-2xl font-medium">SoundvetX</h1></SheetTitle>
					<SheetDescription>
                        Radiologia em animais de companhia e pets exóticos
					</SheetDescription>
				</SheetHeader>

                <nav className="mt-10 flex flex-col w-full gap-2">
                    <NavbarItem
                        label="Formulário"
                        route="/"
                        selected={pathName === "/"}
                        needsAdminPrivileges={false}
                    />
                    <NavbarItem
                        label="Usuários"
                        route="/users"
                        selected={pathName === "/users"}
                        needsAdminPrivileges={true}
                    />
                </nav>
			</SheetContent>
		</Sheet>
	)
})

SideNavbar.displayName = "SideNavbar"

export { SideNavbar }
