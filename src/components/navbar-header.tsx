import React, { useEffect } from "react"
import { LogOut } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useLoading } from "@/contexts/loading-context"
import { Skeleton } from "@/components/ui/skeleton"

interface NavbarHeaderProps extends React.HTMLAttributes<HTMLHeadingElement> {
	title: string
}

const NavbarHeader = React.forwardRef<HTMLHeadingElement, NavbarHeaderProps>(
	({ className, title, ...props }, ref) => {
        const { signOut, user } = useAuth()

		return (
            <header ref={ref} className="flex flex-row items-center justify-between w-full max-w-screen-md mx-auto py-2 border-b border-black" {...props}>
                <h1 className="text-xl font-medium">{title}</h1>

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
