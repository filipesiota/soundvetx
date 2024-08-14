"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { NavbarItem } from "@/components/navbar-item"
import { usePathname } from "next/navigation"

interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {}

const Navbar = React.forwardRef<HTMLHeadingElement, NavbarProps>(
	({ className, title, ...props }, ref) => {
        const pathName = usePathname()

		return (
            <nav
                ref={ref}
                className={cn("flex flex-row gap-2", className)}
                {...props}
            >
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
		)
	}
)
Navbar.displayName = "Navbar"

export { Navbar }
