import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/utils/tailwind-utils";
import { Toaster } from "@/components/ui/sonner";
import "../styles/globals.css";
import { Providers } from "./providers";

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans"
});

export const metadata: Metadata = {
	title: "SoundvetX",
	description: "Radiologia em animais de companhia e pets exóticos"
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR">
			<head>
				<link rel="icon" href="/favicon.ico" sizes="any" />
			</head>
			<body
				className={cn(
					"min-h-dvh bg-background font-sans antialiased h-full px-4",
					fontSans.variable
				)}
			>
				<Providers>
					{children}

					<Toaster />
				</Providers>
			</body>
		</html>
	);
}
