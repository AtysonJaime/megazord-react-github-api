"use client"

import Image from "next/image"
import LogoGithub from "@/assets/images/logo.svg"
import { usePathname } from "next/navigation"

export default function Header() {
	const pathname = usePathname()
	const splitPathname = pathname.split("/")
	const userProfile = splitPathname.length > 2 ? "" : splitPathname.pop()
	return (
		<header className="flex h-[72px] w-full items-center bg-(--foreground)! px-6!">
			<div className="mx-auto flex w-full max-w-360 items-center gap-4">
				<Image src={LogoGithub} alt="Logo Github" width={100} height={100} />
				{userProfile !== "" && (
					<>
						<h5 className="text-white">/</h5>
						<p className="font-(var-p)! font-light! text-white">
							{userProfile}
						</p>
					</>
				)}
			</div>
		</header>
	)
}
