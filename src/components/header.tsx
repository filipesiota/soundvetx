"use client"

import React from "react"

import { useAuth } from "@/contexts/auth-context"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { ProfileDropdownMenu } from "@/components/profile-dropdown-menu"

interface HeaderProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const Header = React.forwardRef<HTMLHeadingElement, HeaderProps>(
	({ className, ...props }, ref) => {
        const { user } = useAuth()

		return (
            <header
                ref={ref}
                className={cn("flex flex-row items-center justify-between w-full max-w-screen-xl mx-auto py-4 px-4", className)}
                {...props}
            >
                <h1 className="text-2xl font-medium">SoundvetX</h1>

                {user ? (
                    <div className="flex flex-row gap-1 items-center">
                        <span className="hidden md:block text-sm">{user.name}</span>
                        <ProfileDropdownMenu
                            user={user}
                        />
                    </div>
                ) : (
                    <div className="flex flex-row gap-1 items-center">
                        <Skeleton className="hidden md:block h-[40px] w-[150px]" />
                        <Skeleton className="h-[40px] w-[40px]" />
                    </div>
                )}
            </header>
		)
	}
)
Header.displayName = "Header"

export { Header }
