import React from "react"
import { cn } from "@/utils/tailwind-utils"

interface MainTitleProps extends React.HTMLAttributes<HTMLDivElement> {
	title: string
	subtitle?: string
}

const MainTitle = React.forwardRef<HTMLDivElement, MainTitleProps>(
	({ className, title, subtitle, ...props }, ref) => {
		const id = React.useId()

		return (
			<div
				id={id}
				ref={ref}
				className={cn("flex flex-col gap-2 items-center", className)}
				{...props}
			>
				<h2 className="sm:text-6xl text-4xl font-bold tracking-tight">{title}</h2>
				<p className="text-base leading-6 text-center">{subtitle}</p>
			</div>
		)
	}
)
MainTitle.displayName = "MainTitle"

export { MainTitle }
