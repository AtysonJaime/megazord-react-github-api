"use client"
type TTagProps = {
	topic: string
}
export default function Tag({ topic }: TTagProps) {
	return (
		<span className="rounded-full border border-(--gray-5)! bg-(--gray-bg)! px-2 py-1 text-[14px]! text-(--gray-3)!">
			{topic}
		</span>
	)
}
