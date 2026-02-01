import { LucideIcon } from "lucide-react"

export default function EmptyItem({
	feedback,
	icon: Icon,
	colorVariant,
}: Readonly<{
	feedback: string
	icon: LucideIcon
	colorVariant: string
}>) {
	return (
		<div className="flex! w-full flex-col items-center justify-center gap-2">
			<div
				className={`flex! h-[75px]! w-[75px]! items-center justify-center rounded-full! ${colorVariant}`}
			>
				<Icon size={32} className="text-white" />
			</div>
			<h6 className="text-muted-foreground">{feedback}</h6>
		</div>
	)
}
