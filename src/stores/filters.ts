import {
	IFilterStore,
	TFilterRepo,
	TFilterUsers,
} from "@/interfaces/filters.interface"
import { create } from "zustand"

export const useFiltersStore = create<IFilterStore>((set, get) => ({
	filter_users: {
		user: "",
		location: "",
	},
	filter_repo: {
		repo: "",
		type: "all",
		language: "all",
	},
	/**
	 * Função para setar os filtros de busca por usuários
	 * @param filter_users
	 */
	setFilterUsers: (filter_users: TFilterUsers) => set({ filter_users }),
	/**
	 * Função para limpar um filtro específico de busca por usuários
	 * @param key user ou location
	 */
	clearSpecificFilterUsers: (key: keyof TFilterUsers) => {
		const { filter_users } = get()
		set({ filter_users: { ...filter_users, [key]: "" } })
	},
	/**
	 * Função para setar os filtros de busca por repositórios
	 * @param filter_repo
	 */
	setFilterRepo: (filter_repo: TFilterRepo) => set({ filter_repo }),
	/**
	 * Função para limpar um filtro específico de busca por repositórios
	 * @param key repo ou type ou language
	 */
	clearSpecificFilterRepo: (key: keyof TFilterRepo) => {
		const { filter_repo } = get()
		set({ filter_repo: { ...filter_repo, [key]: "" } })
	},
}))
