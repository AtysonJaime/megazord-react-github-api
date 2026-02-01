"use client"
import CardInfoRepo from "@/components/Card/InfoRepo"
import FilterRepo from "@/components/Filter/Repo"
import Aside from "@/components/Layout/Aside"
import Loading from "@/components/Layout/Loading"
import { BookMarked, Star } from "lucide-react"
import { use, useState } from "react"
import { Tab, Tabs } from "react-bootstrap"

export default function Page({
	params,
}: Readonly<{
	params: Promise<{ slug: string }>
}>) {
	const { slug } = use(params)
	const [tab, setTab] = useState("repositories")

	if (!slug) return <Loading />

	/**
	 * Função para renderizar o conteúdo da aba de repositórios favoritos
	 */
	const contentTabStarred = () => {
		return (
			<ul className="m-0! flex max-h-[calc(100vh-265px)] flex-col gap-8 overflow-auto p-0! px-2 pt-2">
				{Array.from({ length: 6 }).map((_, index) => (
					<li key={index}>
						<CardInfoRepo isStarred={true} />
					</li>
				))}
			</ul>
		)
	}

	/**
	 * Função para renderizar o conteúdo da aba de repositórios
	 */
	const contentTabRepositories = () => {
		return (
			<ul className="m-0! flex max-h-[calc(100vh-265px)] flex-col gap-8 overflow-auto p-0! px-2 pt-2">
				{Array.from({ length: 6 }).map((_, index) => (
					<li key={index}>
						<CardInfoRepo isStarred={false} />
					</li>
				))}
			</ul>
		)
	}

	return (
		<main className="mx-auto flex h-full! min-h-[calc(100vh-120px)] w-full max-w-360 flex-col items-center gap-4 sm:flex-row sm:items-start">
			<Aside />
			<div className="min-h-[calc(100vh-120px)] w-full">
				<Tabs defaultActiveKey="repositories" className="mb-8! border-none!">
					<Tab
						eventKey="repositories"
						onEntered={() => setTab("repositories")}
						title={
							<div className="flex items-center gap-2">
								<BookMarked size={20} />
								<h6 className="text-[16px] sm:text-[18px]">Repositories</h6>
							</div>
						}
					>
						<div className="flex flex-col gap-8">
							<FilterRepo />
							{contentTabRepositories()}
						</div>
					</Tab>
					<Tab
						className="border-none!"
						eventKey="starred"
						onEntered={() => setTab("starred")}
						title={
							<div className="flex items-center gap-2">
								<Star size={20} />
								<h6 className="text-[16px] sm:text-[18px]">Starred</h6>
							</div>
						}
					>
						<div className="flex flex-col gap-8">
							<FilterRepo />
							{contentTabStarred()}
						</div>
					</Tab>
				</Tabs>
			</div>
		</main>
	)
}
