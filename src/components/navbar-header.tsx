"use client"

import React from "react"
import { LogOut } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Skeleton } from "@/components/ui/skeleton"
import { Navbar } from "@/components/navbar"
import { cn } from "@/lib/utils"

interface NavbarHeaderProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const NavbarHeader = React.forwardRef<HTMLHeadingElement, NavbarHeaderProps>(
	({ className, ...props }, ref) => {
        const { signOut, user } = useAuth()

		return (
            <header
                ref={ref}
                className={cn("flex flex-row items-center justify-between w-full max-w-screen-lg mx-auto py-4", className)}
                {...props}
            >
                <h1 className="text-2xl font-medium">SoundvetX</h1>

                <Navbar />

                <div className="flex flex-row items-center gap-3">
                    <div className="flex flex-col text-end text-sm leading-tight">
                        <span>{user?.name}</span>

                        {user ? ( user.type === "veterinarian" ? (
                            <span>CRMV: {user?.crmv}</span>
                        ) : (
                            <span>Administrador</span>
                        ) ) : (
                            <Skeleton className="h-[40px] w-[150px]" />
                        )}
                    </div>
                    <button type="button" onClick={signOut}>
                        <LogOut className="h-6" />
                    </button>
                </div>
            </header>
		)
	}
)
NavbarHeader.displayName = "NavbarHeader"

export { NavbarHeader }
