"use client"

import React, { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList
} from "@/components/ui/command"
import { cn } from "@/lib/utils"

export type ComboboxItem = {
    value: string
    label: string
}

interface ComboboxProps extends React.HTMLAttributes<HTMLButtonElement> {
    onValueChange: (value: string) => void
    value: string
    items: ComboboxItem[]
    placeholder?: string
    searchPlaceholder?: string
    noDataMessage?: string
    disabled?: boolean
}

const Combobox = React.forwardRef<HTMLButtonElement, ComboboxProps>(({
    className,
    onValueChange,
    value,
    items,
    placeholder = "",
    searchPlaceholder = "",
    noDataMessage = "Nenhum dado encontrado.",
    disabled = false
}, ref) => {
    const [open, setOpen] = useState(false)

	return (
		<>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
                        ref={ref}
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className={cn("w-[200px] justify-between", className)}
                        disabled={disabled}
					>
						{value
							? items.find(item => item.value === value)?.label
							: placeholder}
						<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className={cn("w-[200px] p-0", className)}>
					<Command>
						<CommandInput placeholder={searchPlaceholder} />
						<CommandList>
							<CommandEmpty>{noDataMessage}</CommandEmpty>
							<CommandGroup>
								{items.map(item => (
									<CommandItem
										key={item.value}
										value={item.value}
										onSelect={currentValue => {
											onValueChange(currentValue === value ? "" : currentValue)
											setOpen(false)
										}}
									>
										<Check
											className={cn(
												"mr-2 h-4 w-4",
												value === item.value
													? "opacity-100"
													: "opacity-0"
											)}
										/>
										{item.label}
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</>
	)
})

export { Combobox }
