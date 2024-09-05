"use client"

import React from "react"

import { cn } from "@/lib/utils"

interface MainProps extends React.HTMLAttributes<HTMLDivElement> {}

const Main = React.forwardRef<HTMLDivElement, MainProps>(
	({ className, children, ...props }, ref) => {
		return (
            <main
                ref={ref}
                className={cn("flex flex-col items-center w-full max-w-screen-xl mx-auto py-4 px-4 pb-8", className)}
                {...props}
            >
                {children}
            </main>
		)
	}
)

Main.displayName = "Main"

export { Main }
