"use client"
import CardInfoRepo from "@/components/Card/InfoRepo"
import Aside from "@/components/Layout/Aside"
import Loading from "@/components/Layout/Loading"
import { BookMarked, Star } from "lucide-react"
import { use } from "react"
import { Tab, Tabs } from "react-bootstrap"

export default function Page({
	params,
}: Readonly<{
	params: Promise<{ slug: string }>
}>) {
	const { slug } = use(params)

	if (!slug) return <Loading />
	return (
		<main className="mx-auto flex h-full! min-h-[calc(100vh-120px)] w-full max-w-360 flex-col items-center gap-4 sm:flex-row sm:items-start">
			<Aside />
			<div className="min-h-[calc(100vh-120px)] w-full">
				<Tabs defaultActiveKey="repositories" className="mb-8! border-none!">
					<Tab
						eventKey="repositories"
						title={
							<div className="flex items-center gap-2">
								<BookMarked size={20} />
								<h6 className="text-[16px] sm:text-[18px]">Repositories</h6>
							</div>
						}
					>
						<div className="flex max-h-[calc(100vh-191px)] flex-col gap-8 overflow-auto px-2 pt-2">
							<CardInfoRepo isStarred={false} />
							<CardInfoRepo isStarred={false} />
							<CardInfoRepo isStarred={false} />
							<CardInfoRepo isStarred={false} />
							<CardInfoRepo isStarred={false} />
							<CardInfoRepo isStarred={false} />
							<CardInfoRepo isStarred={false} />
							<CardInfoRepo isStarred={false} />
							<CardInfoRepo isStarred={false} />
							<CardInfoRepo isStarred={false} />
							<CardInfoRepo isStarred={false} />
							<CardInfoRepo isStarred={false} />
							<CardInfoRepo isStarred={false} />
						</div>
					</Tab>
					<Tab
						className="border-none!"
						eventKey="starred"
						title={
							<div className="flex items-center gap-2">
								<Star size={20} />
								<h6 className="text-[16px] sm:text-[18px]">Starred</h6>
							</div>
						}
					>
						<div className="flex max-h-[calc(100vh-191px)] flex-col gap-8 overflow-auto">
							<CardInfoRepo isStarred={true} />
						</div>
					</Tab>
				</Tabs>
			</div>
		</main>
	)
}
