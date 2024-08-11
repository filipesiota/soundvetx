import React from "react"
import { cn } from "@/utils/tailwind-utils"
import { GridLoader } from "react-spinners"

interface LoadingPageProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
}

const LoadingPage = React.forwardRef<HTMLDivElement, LoadingPageProps>(
	({ className, size = 5, ...props }, ref) => {
		const id = React.useId()

		return (
			<div
				id={id}
				ref={ref}
				className={cn(
					"flex flex-col items-center justify-center fixed top-0 left-0 loading-background text-loading-foreground z-10 h-full w-full",
					className
				)}
				{...props}
			>
				<GridLoader size={size * 4} />
			</div>
		)
	}
)
LoadingPage.displayName = "LoadingPage"

export { LoadingPage }
