"use client"
import CardInfoRepo from "@/components/Card/InfoRepo"
import FilterRepo from "@/components/Filter/Repo"
import Aside from "@/components/Layout/Aside"
import EmptyItem from "@/components/Layout/EmptyItem"
import Loading from "@/components/Layout/Loading"
import Paginacao from "@/components/Paginacao"
import Tag from "@/components/Tag"
import { TRepoData, TRepoStarredData } from "@/interfaces/repository.interface"
import { TUserGithub } from "@/interfaces/user.interface"
import { fetchRepos, fetchStarred, fetchUser } from "@/server"
import { useFiltersStore } from "@/stores/filters"
import { filterListStarred } from "@/utils/functions"
import { useQuery } from "@tanstack/react-query"
import { BookMarked, Star, User } from "lucide-react"
import { use, useEffect, useState } from "react"
import { Tab, Tabs } from "react-bootstrap"

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
		queryKey: ["starred", slug, currentPageStarred],
		queryFn: () => fetchStarred(slug, currentPageStarred),
		enabled: !!slug,
	})

	// Separação dos dados para a listagem de repositórios e repositórios favoritos
	const { items: itensRepo, total_count: totalCountRepo }: TRepoData =
		reposData || {
			items: [],
			total_count: 0,
		}
	const { data: itensStarred, lastPage: totalCountStarred }: TRepoStarredData =
		starredData || {
			data: [],
			lastPage: 0,
		}

	// Realiza validação para pegar o total de página de repositórios e não perder.
	useEffect(() => {
		if (totalCountRepo === 0) {
			setTotalPageRepo(0)
			return
		}
		const newTotalPages = Math.ceil(totalCountRepo / 5)
		if (newTotalPages === totalPageRepo) return
		setTotalPageRepo(newTotalPages)
	}, [totalCountRepo])

	// Realiza validação para pegar o total de página de repositórios favoritos e não perder.
	useEffect(() => {
		if (totalCountStarred === 0) {
			if (hasFilter) return
			setTotalPageStarred(0)
			return
		}
		const newTotalPages = totalCountStarred
		if (newTotalPages <= totalPageStarred) return
		setTotalPageStarred(newTotalPages)
	}, [totalCountStarred])

	if (userStatus === "pending") return <Loading />

	if (userStatus === "error" || !userData)
		return (
			<EmptyItem
				feedback="Usuário não encontrado"
				icon={User}
				colorVariant="bg-red-300"
			/>
		)

	let totalStarredItens =
		totalCountStarred > 1 ? totalCountStarred * 100 : itensStarred.length

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
		const filteredStarred = filterListStarred(itensStarred, filter_repo)
		totalStarredItens = filteredStarred.length
		if (filteredStarred.length === 0) {
			if (hasFilter) {
				return (
					<EmptyItem
						feedback="Nenhum repositório favorito encontrado com os filtros aplicados"
						icon={Star}
						colorVariant="bg-red-300"
					/>
				)
			}
			return (
				<EmptyItem
					feedback="Nenhum repositório favorito encontrado"
					icon={Star}
					colorVariant="bg-red-300"
				/>
			)
		}
		return (
			<ul className="m-0! flex max-h-full! flex-col gap-8 overflow-auto p-2! sm:max-h-[calc(100vh-380px)]!">
				{filteredStarred.map((repo, index) => (
					<li key={repo.id} className="flex flex-col gap-8">
						<CardInfoRepo isStarred={true} repo={repo} username={slug} />
						{index < itensStarred.length - 1 && (
							<hr className="m-0! flex! h-[2px]! w-full! bg-(--gray-border)! lg:hidden!" />
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
		if (itensRepo.length === 0) {
			if (hasFilter) {
				return (
					<EmptyItem
						feedback="Nenhum repositório encontrado com os filtros aplicados"
						icon={BookMarked}
						colorVariant="bg-red-300"
					/>
				)
			}
			return (
				<EmptyItem
					feedback="Nenhum repositório encontrado"
					icon={BookMarked}
					colorVariant="bg-red-300"
				/>
			)
		}
		return (
			<ul className="m-0! flex max-h-full! flex-col gap-8 overflow-auto p-2! sm:max-h-[calc(100vh-380px)]!">
				{itensRepo.map((repo, index) => (
					<li key={repo.id} className="flex flex-col gap-8">
						<CardInfoRepo isStarred={false} repo={repo} username={slug} />
						{index < itensRepo.length - 1 && (
							<hr className="m-0! flex! h-[2px]! w-full! bg-(--gray-border)! lg:hidden!" />
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
							if (currentPageRepo !== 1) setCurrentPageRepo(1)
							setTab("repositories")
						}}
						title={
							<div className="flex items-center gap-2">
								<BookMarked size={20} />
								<h6 className="text-[16px] sm:text-[18px]">Repositories</h6>
								<Tag topic={userData.public_repos.toString()} />
							</div>
						}
					>
						<div className="flex flex-col gap-8">
							<FilterRepo />
							{contentTabRepositories()}
							{totalPageRepo > 1 && (
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
							if (currentPageStarred !== 1) setCurrentPageStarred(1)
							setTab("starred")
						}}
						title={
							<div className="flex items-center gap-2">
								<Star size={20} />
								<h6 className="text-[16px] sm:text-[18px]">Starred</h6>
								<Tag topic={totalStarredItens.toString()} />
							</div>
						}
					>
						<div className="flex flex-col gap-8">
							<FilterRepo />
							{contentTabStarred()}
							{totalPageStarred > 1 && (
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
