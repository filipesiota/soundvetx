"use client"

import React from "react"
import { LogOut } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Skeleton } from "@/components/ui/skeleton"
import { Navbar } from "@/components/navbar"
import { cn } from "@/lib/utils"
import { ProfileDropdownMenu } from "./profile-dropdown-menu"
import { SideNavbar } from "./side-navbar"

interface NavbarHeaderProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const NavbarHeader = React.forwardRef<HTMLHeadingElement, NavbarHeaderProps>(
	({ className, ...props }, ref) => {
        const { user } = useAuth()

		return (
            <header
                ref={ref}
                className={cn("flex flex-row items-center justify-between w-full max-w-screen-xl mx-auto py-4 px-4", className)}
                {...props}
            >
                {user ? (
                    <SideNavbar className="sm:hidden" />
                ) : (
                    <Skeleton className="sm:hidden h-[40px] w-[40px]" />
                )}

                <h1 className="text-2xl font-medium">SoundvetX</h1>

                {user ? (
                    <Navbar className="hidden sm:flex" />
                ) : (
                    <Skeleton className="hidden sm:block h-[40px] w-[300px]" />
                )}

                {user ? (
                    <ProfileDropdownMenu user={user} />
                ) : (
                    <Skeleton className="h-[40px] w-[40px]" />
                )}
            </header>
		)
	}
)
NavbarHeader.displayName = "NavbarHeader"

export { NavbarHeader }
