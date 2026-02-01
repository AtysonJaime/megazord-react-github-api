"use client"

import "@/assets/css/globals.css"
import Header from "@/components/Layout/Header"

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
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
				<section className="mx-auto flex w-full max-w-360 p-6!">
					{children}
				</section>
			</body>
		</html>
	)
}
