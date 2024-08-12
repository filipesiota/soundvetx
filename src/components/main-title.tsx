import React from "react"
import { cn } from "@/lib/utils"
import { cva, VariantProps } from "class-variance-authority"

const mainTitleVariants = cva("font-bold tracking-tight text-center", {
	variants: {
		size: {
			small: "text-xl sm:text-2xl",
			medium: "text-2xl sm:text-4xl",
			large: "text-4xl sm:text-6xl"
		}
	},
	defaultVariants: {
		size: "small"
	}
})

interface MainTitleProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof mainTitleVariants> {
	title: string
	subtitle?: string
}

const MainTitle = React.forwardRef<HTMLDivElement, MainTitleProps>(
	({ className, size, title, subtitle, ...props }, ref) => {
		const id = React.useId()

		return (
			<div
				id={id}
				ref={ref}
				className={cn("flex flex-col gap-2 items-center", className)}
				{...props}
			>
				<h2 className={cn(mainTitleVariants({ size }))}>{title}</h2>
				<p className="text-base leading-6 text-center">{subtitle}</p>
			</div>
		)
	}
)
MainTitle.displayName = "MainTitle"

export { MainTitle }
