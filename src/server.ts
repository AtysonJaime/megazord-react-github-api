import { Octokit } from "octokit"
import { TFilterRepo, TFilterUsers } from "./interfaces/filters.interface"
import { TRepoGithub, TUserGithub } from "./interfaces/user.interface"

const octokit = new Octokit({
	auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
})

/**
 * Função para extrair o número da última página do header
 * @param headerLink header da requisição
 * @returns número da última página
 */
const extractLastPageFromHeader = (headerLink: string | undefined): number => {
	if (!headerLink) return 0
	const splitLinkHeader = headerLink?.split(",")
	const lastLink = splitLinkHeader?.at(-1)
	const splitLastLink = lastLink?.split(";")
	const lastPage = splitLastLink?.[0].split("&page=")[1]
	return Number(lastPage?.charAt(0))
}

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
	try {
		const response = await octokit.request("GET /users/{username}/repos", {
			username,
			per_page: 5,
			page,
		})
		const linkHeader = response.headers.link
		const lastPage = extractLastPageFromHeader(linkHeader)
		return { data: response.data, lastPage } as {
			data: TRepoGithub[]
			lastPage: number
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
export const fetchStarred = async (
	username: string,
	filter_repo: TFilterRepo,
	page: number,
) => {
	try {
		const response = await octokit.request("GET /users/{username}/starred", {
			username,
			per_page: 5,
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
