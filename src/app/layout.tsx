"use client"

import "@/assets/css/globals.css"

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="pt-br" data-lt-installed="true" data-scroll-behavior="smooth">
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
				<section className="mx-auto flex w-full max-w-360 p-6!">
					{children}
				</section>
			</body>
		</html>
	)
}
