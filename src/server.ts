import { Octokit } from "octokit"
import { TFilterRepo, TFilterUsers } from "./interfaces/filters.interface"
import { TUserGithub } from "./interfaces/user.interface"
import { TRepoGithub } from "./interfaces/repository.interface"
import {
	addQueryFilterRepo,
	extractLastPageFromHeader,
} from "./utils/functions"

const octokit = new Octokit({
	auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
})

/**
 * Função para buscar usuários no GitHub
 * @param filter_users filtros de busca por usuários
 * @param page número da página
 */
export const fetchUsers = async (filter_users: TFilterUsers, page: number) => {
	let q: string = ""
	if (filter_users.user) {
		q += `${filter_users.user}`
	}
	if (filter_users.location) {
		if (q !== "") {
			q += "+"
		}
		q += `location:${filter_users.location}`
	}
	try {
		const response = await octokit.request("GET /search/users", {
			q,
			per_page: 20,
			page,
		})
		return response.data
	} catch (error: any) {
		console.log("[Erro ao buscar usuários]", error)
	}
}

/**
 * Função para buscar um usuário no GitHub
 * @param username nome do usuário
 */
export const fetchUser = async (username: string) => {
	try {
		const response = await octokit.request("GET /users/{username}", {
			username,
		})
		const infoUser: TUserGithub = {
			...response.data,
			twitter_username: response.data.twitter_username || null,
		}
		return infoUser
	} catch (error: any) {
		console.log("[Erro ao buscar usuário]", error)
	}
}

/**
 * Função para buscar repositórios de um usuário no GitHub
 * @param username nome do usuário
 * @param filter_repo filtros de busca por repositórios
 * @param page número da página
 */
export const fetchRepos = async (
	username: string,
	filter_repo: TFilterRepo,
	page: number,
) => {
	let q = `user:${username}`
	q = addQueryFilterRepo(filter_repo, q)
	try {
		const response = await octokit.request("GET /search/repositories", {
			q,
			per_page: 5,
			page,
			sort: "updated",
		})
		return {
			items: response.data.items,
			total_count: response.data.total_count,
		} as {
			items: TRepoGithub[]
			total_count: number
		}
	} catch (error: any) {
		console.log("[Erro ao buscar repositórios]", error)
	}
}

/**
 * Função para buscar repositórios favoritos de um usuário no GitHub
 * @param username nome do usuário
 * @param filter_repo filtros de busca por repositórios
 * @param page número da página
 */
export const fetchStarred = async (username: string, page: number) => {
	try {
		const response = await octokit.request("GET /users/{username}/starred", {
			username,
			per_page: 1000,
			page,
		})
		const linkHeader = response.headers.link
		const lastPage = extractLastPageFromHeader(linkHeader)
		return { data: response.data, lastPage } as {
			data: TRepoGithub[]
			lastPage: number
		}
	} catch (error: any) {
		console.log("[Erro ao buscar repositórios favoritos]", error)
	}
}
