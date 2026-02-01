"use client"

import CardUserProfile from "@/components/Card/UserProfile"
import FilterUsers from "@/components/Filter/Users"
import EmptyItem from "@/components/Layout/EmptyItem"
import Loading from "@/components/Layout/Loading"
import Paginacao from "@/components/Paginacao"
import { TListGithubCard } from "@/interfaces/user.interface"
import { fetchUsers } from "@/server"
import { useFiltersStore } from "@/stores/filters"
import { useQuery } from "@tanstack/react-query"
import { Users2 } from "lucide-react"
import { useEffect, useState } from "react"

export default function Home() {
	const { filter_users } = useFiltersStore()
	const [totalPages, setTotalPages] = useState(0)
	const hasFilter = filter_users.user !== "" || filter_users.location !== ""
	const [currentPage, setCurrentPage] = useState(1)

	const { data, status } = useQuery({
		queryKey: ["users", filter_users, currentPage],
		queryFn: () => fetchUsers(filter_users, currentPage),
		enabled: hasFilter,
	})

	const {
		items,
		total_count,
	}: {
		items: TListGithubCard[]
		total_count: number
	} = data || { items: [], total_count: 0 }

	/**
	 * Função para retornar o conteúdo de informações de acordo com o status da busca e os filtros aplicados
	 * @returns React.ReactNode
	 */
	const contentInfo = () => {
		const { user, location } = filter_users
		if (user === "" && location === "") {
			return (
				<EmptyItem
					feedback="Nenhum filtro aplicado para iniciar as buscas."
					icon={Users2}
					colorVariant="bg-(--gray-5)"
				/>
			)
		}
		if (status === "pending") {
			return <Loading />
		}
		if (status === "error" || data === undefined) {
			return (
				<EmptyItem
					feedback="Erro ao buscar usuários filtrados."
					icon={Users2}
					colorVariant="bg-(--gray-5)"
				/>
			)
		}
		if (items.length === 0) {
			return (
				<EmptyItem
					feedback="Nenhum usuário encontrado com os filtros aplicados."
					icon={Users2}
					colorVariant="bg-(--gray-5)"
				/>
			)
		}
		return (
			<div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{items.map((user) => {
					return <CardUserProfile key={user.id} user={user} />
				})}
			</div>
		)
	}

	useEffect(() => {
		if (total_count === 0) {
			if (hasFilter) return
			setTotalPages(0)
			return
		}
		const newTotalPages = Math.ceil(
			total_count > 1000 ? 1000 : total_count / 20,
		) // Após testes, verificou-se que a api do github apenas permitir visualizar os 1000 primeiros resultados.
		if (newTotalPages === totalPages) return
		setTotalPages(newTotalPages)
	}, [total_count])

	return (
		<main className="mx-auto flex w-full max-w-360 flex-col gap-4">
			<div className="flex flex-col gap-3">
				<h3 className="font-bold!">Usuário do github</h3>
				<h5>Procure o usuário desejado, informando seu nome ou localidades.</h5>
				<FilterUsers />
			</div>
			{contentInfo()}
			{totalPages > 0 && (
				<div className="flex justify-center">
					<Paginacao
						pageAtual={currentPage}
						totalPages={totalPages}
						nextPage={() => {
							setCurrentPage(currentPage + 1)
						}}
						prevPage={() => {
							setCurrentPage(currentPage - 1)
						}}
						clickPage={(page) => {
							setCurrentPage(page)
						}}
					/>
				</div>
			)}
		</main>
	)
}
