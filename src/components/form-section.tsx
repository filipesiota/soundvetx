import React from "react";
import { cn } from "@/lib/utils";

interface FormSectionProps extends React.HTMLAttributes<HTMLDivElement> {
	title: string;
}

const FormSection = React.forwardRef<HTMLDivElement, FormSectionProps>(({ className, title, children, ...props }, ref) => {
	const id = React.useId();

	return (
		<div id={id} ref={ref} className={cn("flex flex-col w-full", className)} {...props}>
			<h2 className="text-2xl font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-4">{title}</h2>

			<div className="flex flex-col gap-5">{children}</div>
		</div>
	);
});
FormSection.displayName = "FormSection";

export { FormSection };
