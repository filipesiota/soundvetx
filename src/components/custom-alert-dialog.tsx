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
	onCancel?: () => void
	onConfirm: () => void
    isOpen: boolean
}

const CustomAlertDialog = React.forwardRef<HTMLDivElement, CustomAlertDialogProps>(
	({ title, description, cancelText = "Cancelar", confirmText = "Confirmar", onCancel, onConfirm, isOpen }, ref) => {
		return (
			<AlertDialog open={isOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>{title}</AlertDialogTitle>
						<AlertDialogDescription>{description}</AlertDialogDescription>
					</AlertDialogHeader>

					<AlertDialogFooter>
						<AlertDialogCancel onClick={onCancel}>{cancelText}</AlertDialogCancel>
						<AlertDialogAction onClick={onConfirm}>{confirmText}</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		)
	}
)

CustomAlertDialog.displayName = "CustomAlertDialog"

export { CustomAlertDialog }