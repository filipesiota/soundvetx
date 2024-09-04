"use client"

import React, { useState } from "react"
import { ArchiveRestore, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CustomAlertDialog } from "@/components/custom-alert-dialog"

interface ToggleDeleteRestoreButtonProps {
    isDeleted: boolean
    onDelete: () => void
    onRestore: () => void
}

const ToggleDeleteRestoreButton = React.forwardRef<HTMLButtonElement, ToggleDeleteRestoreButtonProps>(
    ({ isDeleted, onDelete, onRestore }, ref) => {
    const [isAlertOpen, setIsAlertOpen] = useState(false)

    function handleAction() {
        setIsAlertOpen(true)
    }

    function onConfirmAlert() {
        if (isDeleted) {
            onRestore()
        } else {
            onDelete()
        }

        setIsAlertOpen(false)
    }

    function onCancelAlert() {
        setIsAlertOpen(false)
    }

    return (
        <>
            <CustomAlertDialog
				title={isDeleted ? "Restaurar usuário" : "Deletar usuário"}
				description={`Deseja realmente ${isDeleted ? "restaurar" : "deletar"} este usuário?`} 
				confirmText={isDeleted ? "Restaurar" : "Deletar"}
				onCancel={onCancelAlert}
				onConfirm={onConfirmAlert}
				isOpen={isAlertOpen}
			/>

            <Button
                ref={ref}
                onClick={handleAction}
                title={isDeleted ? "Restaurar usuário" : "Deletar usuário"}
                variant="outline"
                size="icon"
            >
                {isDeleted ? <ArchiveRestore /> : <Trash />}
            </Button>
        </>
    )
})

ToggleDeleteRestoreButton.displayName = "ToggleDeleteRestoreButton"

export { ToggleDeleteRestoreButton }
