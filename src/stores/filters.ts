import { IFilterStore, TFilterUsers } from "@/interfaces/filters.interface"
import { create } from "zustand"

export const useFiltersStore = create<IFilterStore>((set, get) => ({
	filter_users: {
		user: "",
		location: "",
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
}))
