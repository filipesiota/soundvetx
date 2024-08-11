import React from "react"
import { cn } from "@/utils/tailwind-utils"
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

interface FormGridProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof formGridVariants> {}

const FormGrid = React.forwardRef<HTMLDivElement, FormGridProps>(
	({ className, cols, children, ...props }, ref) => {
		const id = React.useId()

		return (
			<div id={id} ref={ref} className={cn(formGridVariants({ cols }), className)} {...props}>
				{children}
			</div>
		)
	}
)
FormGrid.displayName = "FormGrid"

export { FormGrid }
