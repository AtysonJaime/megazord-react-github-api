"use client"
import CardInfoRepo from "@/components/Card/InfoRepo"
import FilterRepo from "@/components/Filter/Repo"
import Aside from "@/components/Layout/Aside"
import EmptyItem from "@/components/Layout/EmptyItem"
import Loading from "@/components/Layout/Loading"
import Paginacao from "@/components/Paginacao"
import Tag from "@/components/Tag"
import { TRepoGithub, TUserGithub } from "@/interfaces/user.interface"
import { fetchRepos, fetchStarred, fetchUser } from "@/server"
import { useFiltersStore } from "@/stores/filters"
import { useQuery } from "@tanstack/react-query"
import { BookMarked, Star, User } from "lucide-react"
import { use, useEffect, useState } from "react"
import { Tab, Tabs } from "react-bootstrap"

type TRepoData = {
	data: TRepoGithub[]
	lastPage: number
}

export default function Page({
	params,
}: Readonly<{
	params: Promise<{ slug: string }>
}>) {
	const { filter_repo } = useFiltersStore()
	const hasFilter =
		filter_repo.language !== "" ||
		filter_repo.type !== "" ||
		filter_repo.repo !== ""
	const { slug } = use(params)
	const [tab, setTab] = useState("repositories")
	const [currentPageRepo, setCurrentPageRepo] = useState(1)
	const [currentPageStarred, setCurrentPageStarred] = useState(1)
	const [totalPageRepo, setTotalPageRepo] = useState(0)
	const [totalPageStarred, setTotalPageStarred] = useState(0)

	/**
	 * Query para buscar os dados do usuário
	 */
	const {
		data: userData,
		status: userStatus,
	}: {
		data: TUserGithub | undefined
		status: "pending" | "success" | "error"
	} = useQuery({
		queryKey: ["user", slug],
		queryFn: () => fetchUser(slug),
		enabled: !!slug,
	})

	/**
	 * Query para buscar os repositórios do usuário
	 */
	const { data: reposData, status: reposStatus } = useQuery({
		queryKey: ["repos", slug, filter_repo, currentPageRepo],
		queryFn: () => fetchRepos(slug, filter_repo, currentPageRepo),
		enabled: !!slug && tab === "repositories",
	})

	/**
	 * Query para buscar os repositórios favoritos do usuário
	 */
	const { data: starredData, status: starredStatus } = useQuery({
		queryKey: ["starred", slug, filter_repo, currentPageStarred],
		queryFn: () => fetchStarred(slug, filter_repo, currentPageStarred),
		enabled: !!slug && tab === "starred",
	})

	// Separação dos dados para a listagem de repositórios e repositórios favoritos
	const { lastPage: lastPageRepo, data: itensRepo }: TRepoData = reposData || {
		lastPage: 0,
		data: [],
	}
	const { lastPage: lastPageStarred, data: itensStarred }: TRepoData =
		starredData || { lastPage: 0, data: [] }

	// Realiza validação para pegar o total de página de repositórios e não perder.
	useEffect(() => {
		if (lastPageRepo === 0) {
			if (hasFilter) return
			setTotalPageRepo(0)
			return
		}
		const newTotalPages = lastPageRepo
		if (newTotalPages <= totalPageRepo) return
		setTotalPageRepo(newTotalPages)
	}, [lastPageRepo])

	// Realiza validação para pegar o total de página de repositórios favoritos e não perder.
	useEffect(() => {
		if (lastPageStarred === 0) {
			if (hasFilter) return
			setTotalPageStarred(0)
			return
		}
		const newTotalPages = lastPageStarred
		if (newTotalPages <= totalPageStarred) return
		setTotalPageStarred(newTotalPages)
	}, [lastPageStarred])

	if (userStatus === "pending") return <Loading />

	if (userStatus === "error" || !userData)
		return (
			<EmptyItem
				feedback="Usuário não encontrado"
				icon={User}
				colorVariant="bg-red-300"
			/>
		)

	/**
	 * Função para renderizar o conteúdo da aba de repositórios favoritos
	 */
	const contentTabStarred = () => {
		if (starredStatus === "pending") return <Loading />
		if (starredStatus === "error")
			return (
				<EmptyItem
					feedback="Erro ao buscar repositórios favoritos"
					icon={Star}
					colorVariant="bg-red-300"
				/>
			)
		return (
			<ul className="m-0! flex max-h-[calc(100vh-380px)] flex-col gap-8 overflow-auto p-2!">
				{itensStarred.map((repo, index) => (
					<li key={repo.id} className="flex flex-col gap-8">
						<CardInfoRepo isStarred={true} repo={repo} username={slug} />
						{index < itensStarred.length - 1 && (
							<hr className="flex! h-[2px]! w-full! bg-(--gray-border)! lg:hidden" />
						)}
					</li>
				))}
			</ul>
		)
	}

	/**
	 * Função para renderizar o conteúdo da aba de repositórios
	 */
	const contentTabRepositories = () => {
		if (reposStatus === "pending") return <Loading />
		if (reposStatus === "error")
			return (
				<EmptyItem
					feedback="Erro ao buscar repositórios"
					icon={BookMarked}
					colorVariant="bg-red-300"
				/>
			)
		return (
			<ul className="m-0! flex max-h-[calc(100vh-380px)] flex-col gap-8 overflow-auto p-2!">
				{itensRepo.map((repo, index) => (
					<li key={repo.id} className="flex flex-col gap-8">
						<CardInfoRepo isStarred={false} repo={repo} username={slug} />
						{index < itensRepo.length - 1 && (
							<hr className="flex! h-[2px]! w-full! bg-(--gray-border)! lg:hidden" />
						)}
					</li>
				))}
			</ul>
		)
	}

	return (
		<main className="mx-auto flex h-full! min-h-[calc(100vh-120px)] w-full max-w-360 flex-col items-center gap-4 sm:flex-row sm:items-start">
			<Aside user={userData} />
			<div className="min-h-[calc(100vh-120px)] w-full">
				<Tabs defaultActiveKey="repositories" className="mb-8! border-none!">
					<Tab
						eventKey="repositories"
						onEntered={() => {
							setTab("repositories")
							setCurrentPageRepo(1)
						}}
						title={
							<div className="flex items-center gap-2">
								<BookMarked size={20} />
								<h6 className="text-[16px] sm:text-[18px]">Repositories</h6>
								<Tag topic={(totalPageRepo * 5).toString()} />
							</div>
						}
					>
						<div className="flex flex-col gap-8">
							<FilterRepo />
							{contentTabRepositories()}
							{totalPageRepo > 0 && (
								<Paginacao
									pageAtual={currentPageRepo}
									totalPages={totalPageRepo}
									clickPage={(page: number) => setCurrentPageRepo(page)}
									nextPage={() => setCurrentPageRepo(currentPageRepo + 1)}
									prevPage={() => setCurrentPageRepo(currentPageRepo - 1)}
								/>
							)}
						</div>
					</Tab>
					<Tab
						className="border-none!"
						eventKey="starred"
						onEntered={() => {
							setTab("starred")
							setCurrentPageStarred(1)
						}}
						title={
							<div className="flex items-center gap-2">
								<Star size={20} />
								<h6 className="text-[16px] sm:text-[18px]">Starred</h6>
								<Tag topic={(totalPageStarred * 5).toString()} />
							</div>
						}
					>
						<div className="flex flex-col gap-8">
							<FilterRepo />
							{contentTabStarred()}
							{totalPageStarred > 0 && (
								<Paginacao
									pageAtual={currentPageStarred}
									totalPages={totalPageStarred}
									clickPage={(page: number) => setCurrentPageStarred(page)}
									nextPage={() => setCurrentPageStarred(currentPageStarred + 1)}
									prevPage={() => setCurrentPageStarred(currentPageStarred - 1)}
								/>
							)}
						</div>
					</Tab>
				</Tabs>
			</div>
		</main>
	)
}
