import React from "react"
import { ArchiveRestore, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"

interface ToggleDeleteRestoreButtonProps {
    isDeleted: boolean
    onDelete: () => void
    onRestore: () => void
}

const ToggleDeleteRestoreButton = React.forwardRef<HTMLButtonElement, ToggleDeleteRestoreButtonProps>(
    ({ isDeleted, onDelete, onRestore }, ref) => {
    return (
        <Button
            ref={ref}
            onClick={isDeleted ? onRestore : onDelete}
            title={isDeleted ? "Restaurar" : "Deletar"}
            variant="outline"
            size="icon"
        >
            {isDeleted ? <ArchiveRestore /> : <Trash />}
        </Button>
    )
})

ToggleDeleteRestoreButton.displayName = "ToggleDeleteRestoreButton"

export { ToggleDeleteRestoreButton }
