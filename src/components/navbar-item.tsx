"use client"

import React from "react"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { cva, VariantProps } from "class-variance-authority"

const navbarItemVariants = cva("no-underline transition-colors py-2 px-4 rounded-sm hover:no-underline text-center", {
	variants: {
		selected: {
			true: "text-background bg-foreground opacity-85",
			false: "text-foreground hover:bg-foreground hover:text-background hover:opacity-85",
		}
	},
	defaultVariants: {
		selected: false
	}
})

interface NavbarItemProps extends React.HTMLAttributes<HTMLAnchorElement>, VariantProps<typeof navbarItemVariants> {
    needsAdminPrivileges?: boolean
    label: string
    route: string
}

const NavbarItem = React.forwardRef<HTMLAnchorElement, NavbarItemProps>(
	({
        className,
        needsAdminPrivileges = false,
        label,
        route,
        selected,
        ...props
    }, ref) => {
        const { user } = useAuth()
        const hasAdminPrivileges = user ? user.type !== "veterinarian" || !needsAdminPrivileges : false

		return (
            <Link
                key={route}
                ref={ref}
                className={cn(navbarItemVariants({ selected }), className)}
                href={route}
                hidden={!hasAdminPrivileges}
                {...props}
            >
                {label}
            </Link>
		)
	}
)

NavbarItem.displayName = "NavbarItem"

export { NavbarItem }
