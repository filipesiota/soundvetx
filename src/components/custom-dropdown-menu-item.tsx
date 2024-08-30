"use client"

import React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { cva, VariantProps } from "class-variance-authority"
import { useRouter } from "next/navigation"

import { useAuth } from "@/contexts/auth-context"
import { cn } from "@/lib/utils"
import { UserType } from "@/types/user"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

const customDropdownMenuItemVariants = cva("cursor-pointer", {
	variants: {
		selected: {
			true: "bg-accent text-accent-foreground pointer-events-none",
			false: "",
		}
	},
	defaultVariants: {
		selected: false
	}
})

interface CustomDropdownMenuItemProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof customDropdownMenuItemVariants> {
    needsAdminPrivileges?: boolean
    route?: string
    canNavigate?: boolean
    beforeNavigate?: () => void
}

const CustomDropdownMenuItem = React.forwardRef<
React.ElementRef<typeof DropdownMenuPrimitive.Item>,
React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean
} & CustomDropdownMenuItemProps>(
	({
        className,
        needsAdminPrivileges = false,
        route,
        selected,
        children,
        onClick,
        canNavigate = true,
        beforeNavigate = () => {},
        ...props
    }, ref) => {
        const router = useRouter()
        const { user } = useAuth()
        const hasAdminPrivileges = user ? user.type !== UserType.Veterinarian || !needsAdminPrivileges : false

        function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
            if (!canNavigate) {
                beforeNavigate()
                return
            }

            if (onClick) {
                onClick(event)
                return
            }

            if (route) {
                router.push(route)
            }
        }

		return (
            <DropdownMenuItem
                key={route}
                ref={ref}
                className={cn(customDropdownMenuItemVariants({ selected }), className)}
                onClick={handleClick}
                hidden={!hasAdminPrivileges}
                {...props}
            >
                {children}
            </DropdownMenuItem>
		)
	}
)

CustomDropdownMenuItem.displayName = "CustomDropdownMenuItem"

export { CustomDropdownMenuItem }
