import { createContext, useContext, useState } from "react"

import { LoadingPage } from "@/components/loading-page"

interface LoadingContextProps {
	isLoading: boolean
	setIsLoading: (isLoading: boolean) => void
}

const LoadingContext = createContext({} as LoadingContextProps)

export function LoadingProvider({ children }: { children: React.ReactNode }) {
	const [isLoading, setIsLoading] = useState(false)

	return (
		<LoadingContext.Provider value={{ isLoading, setIsLoading }}>
			{children}

			{isLoading && <LoadingPage />}
		</LoadingContext.Provider>
	)
}

export function useLoading() {
	return useContext(LoadingContext)
}
