"use client"

import { AuthProvider } from "@/contexts/auth-context"
import { LoadingProvider } from "@/contexts/loading-context"

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<AuthProvider>
			<LoadingProvider>{children}</LoadingProvider>
		</AuthProvider>
	)
}
