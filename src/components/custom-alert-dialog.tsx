import React from "react"
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from "@/components/ui/alert-dialog"

interface CustomAlertDialogProps {
	title: string
	description: string
	cancelText?: string
	confirmText?: string
	secondaryButtonText?: string
	onCancel?: () => void
	onConfirm: () => void
	onSecondaryButton?: () => void
	hideCancelButton?: boolean
	hideSecondaryButton?: boolean
    isOpen: boolean
}

const CustomAlertDialog = React.forwardRef<HTMLDivElement, CustomAlertDialogProps>(
	({
		title,
		description,
		cancelText = "Cancelar",
		confirmText = "Confirmar",
		secondaryButtonText,
		onCancel,
		onConfirm,
		onSecondaryButton,
		hideCancelButton = false,
		hideSecondaryButton = true,
		isOpen
	}, ref) => {
		return (
			<AlertDialog open={isOpen}>
				<AlertDialogContent ref={ref} className="responsive-dialog">
					<AlertDialogHeader>
						<AlertDialogTitle>{title}</AlertDialogTitle>
						<AlertDialogDescription>{description}</AlertDialogDescription>
					</AlertDialogHeader>

					<AlertDialogFooter>
						{!hideCancelButton && <AlertDialogCancel onClick={onCancel}>{cancelText}</AlertDialogCancel>}
						<AlertDialogAction onClick={onConfirm}>{confirmText}</AlertDialogAction>
						{!hideSecondaryButton && <AlertDialogAction onClick={onSecondaryButton}>{secondaryButtonText}</AlertDialogAction>}
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		)
	}
)

CustomAlertDialog.displayName = "CustomAlertDialog"

export { CustomAlertDialog }