"use client"

import "@/assets/css/globals.css"
import Header from "@/components/Layout/Header"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const queryClient = new QueryClient()

	return (
		<html lang="pt-br">
			<head>
				<title>Megazord React GitHub API</title>
				<link
					data-n-head="ssr"
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					data-n-head="ssr"
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<link rel="icon" href="/favicon.ico" />
			</head>
			<body className="h-full w-full">
				<Header />
				<QueryClientProvider client={queryClient}>
					<section className="flex h-full! max-h-[calc(100vh-72px)] w-full overflow-auto p-6! sm:max-h-full!">
						{children}
					</section>
					<ReactQueryDevtools initialIsOpen={false} />
				</QueryClientProvider>
			</body>
		</html>
	)
}
