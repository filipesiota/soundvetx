"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { cva, VariantProps } from "class-variance-authority"

const formGridVariants = cva("grid grid-cols-1 gap-2 sm:gap-6 items-top", {
	variants: {
		cols: {
			1: "sm:grid-cols-1",
			2: "sm:grid-cols-2",
			3: "sm:grid-cols-3",
			4: "sm:grid-cols-4"
		}
	},
	defaultVariants: {
		cols: 1
	}
})

interface FormGridProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof formGridVariants> {
	title?: string
}

const FormGrid = React.forwardRef<HTMLDivElement, FormGridProps>(
	({ className, cols, children, title, ...props }, ref) => {
		const id = React.useId()

		return (
			<div className="flex flex-col gap-1">
				{title && <h2 className="font-medium tracking-tight text-md">{title}</h2>}
				<div id={id} ref={ref} className={cn(formGridVariants({ cols }), className)} {...props}>
					{children}
				</div>
			</div>
		)
	}
)
FormGrid.displayName = "FormGrid"

export { FormGrid }
