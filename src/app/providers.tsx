"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import { LoadingProvider } from "@/contexts/LoadingContext";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<AuthProvider>
			<LoadingProvider>{children}</LoadingProvider>
		</AuthProvider>
	);
}
