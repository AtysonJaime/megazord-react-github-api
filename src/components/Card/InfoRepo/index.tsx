import Link from "next/link"
import { FaStar } from "react-icons/fa"
import { PiGitBranch } from "react-icons/pi"

type TCardInfoRepoProps = {
	isStarred: boolean
}
export default function CardInfoRepo({ isStarred }: TCardInfoRepoProps) {
	return (
		<Link
			href={`/`}
			target="_blank"
			rel="noopener noreferrer"
			title="Visualizar Repositório"
			className="flex flex-col gap-2 rounded-md! p-3 transition-all duration-300 focus-within:shadow-lg! hover:shadow-(--box-shadow)!"
		>
			<h6 className="text-[18px] font-light!">
				Node / <b className="font-medium! text-(--primary)!">Release</b>
			</h6>
			<p className="text-(--gray-3)!">
				Node.js Foundation Release Working Group.
			</p>
			<div className="flex items-center gap-11">
				{isStarred ? (
					<div className="flex items-center gap-2">
						<p>C++</p>
					</div>
				) : (
					<div className="flex items-center gap-2">
						<FaStar size={20} />
						<p>1159</p>
					</div>
				)}
				<div className="flex items-center gap-2">
					<PiGitBranch size={20} />
					<p>1159</p>
				</div>
			</div>
		</Link>
	)
}
