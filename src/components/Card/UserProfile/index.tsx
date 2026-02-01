import Image from "next/image"
import { User } from "lucide-react"
import Link from "next/link"
import { TListGithubCard } from "@/interfaces/user.interface"

type TCardUserProfileProps = {
	user: TListGithubCard
}
export default function CardUserProfile({ user }: TCardUserProfileProps) {
	return (
		<Link
			href="/"
			title="Visualizar perfil"
			className="flex items-center gap-2 rounded-md! p-3 transition-all duration-300 focus-within:shadow-lg! hover:shadow-(--box-shadow)!"
		>
			<div className="flex h-[70px] w-[70px] items-center justify-center rounded-full! border border-(--gray-3) bg-transparent!">
				{user.avatar_url ? (
					<Image
						className="h-full w-full object-contain!"
						src={user.avatar_url}
						alt={user.login}
						width={70}
						height={70}
					/>
				) : (
					<User size={30} color="gray" />
				)}
			</div>
			<div className="flex flex-col gap-1">
				<div className="flex flex-wrap items-center gap-2">
					<h6 className="text-[18px] font-bold! text-(--primary)!">
						{user.login}
					</h6>
				</div>
			</div>
		</Link>
	)
}
