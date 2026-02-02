import { TRepoGithub } from "@/interfaces/repository.interface"
import Link from "next/link"
import { FaStar } from "react-icons/fa"
import { PiGitBranch } from "react-icons/pi"

type TCardInfoRepoProps = {
	isStarred: boolean
	username: string
	repo: TRepoGithub
}
export default function CardInfoRepo({
	isStarred,
	repo,
	username,
}: TCardInfoRepoProps) {
	const {
		name,
		description,
		language,
		stargazers_count,
		forks_count,
		html_url,
		topics,
	} = repo
	return (
		<Link
			href={html_url}
			target="_blank"
			rel="noopener noreferrer"
			title="Visualizar Repositório"
			className="flex flex-col gap-2 rounded-md! p-3 transition-all duration-300 focus-within:shadow-lg! hover:shadow-(--box-shadow)!"
		>
			<h6 className="text-[18px]! font-light!">
				{username} / <b className="font-bold! text-(--primary)!">{name}</b>
			</h6>
			{description && <p className="text-(--gray-3)!">{description}</p>}
			{topics.length > 0 && (
				<div className="flex flex-wrap gap-2">
					{topics.map((topic: string) => (
						<p
							key={topic}
							className="rounded-full border border-(--primary)! px-2 py-1 text-(--primary)!"
						>
							{topic}
						</p>
					))}
				</div>
			)}
			<div className="flex items-center gap-11">
				{isStarred ? (
					<div className="flex items-center gap-2">
						<p className="font-bold!">{language}</p>
					</div>
				) : (
					<div className="flex items-center gap-2">
						<FaStar size={20} />
						<p>{stargazers_count}</p>
					</div>
				)}
				<div className="flex items-center gap-2">
					<PiGitBranch size={20} />
					<p>{forks_count}</p>
				</div>
			</div>
		</Link>
	)
}
