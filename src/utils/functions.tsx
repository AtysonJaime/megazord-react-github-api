import { TFilterRepo } from "@/interfaces/filters.interface"
import { TRepoGithub } from "@/interfaces/repository.interface"

/**
 * Função para filtrar repositórios favoritos (Visto que, a API não permite filtros na busca de repositórios favoritos)
 * @param list lista de repositórios favoritos
 * @param filter_repo filtros de busca por repositórios
 * @returns lista de repositórios favoritos filtrados
 */
export const filterListStarred = (
	list: TRepoGithub[],
	filter_repo: TFilterRepo,
) => {
	const { language, type, repo } = filter_repo
	let newList = list
	if (repo)
		newList = newList.filter((item) =>
			item.name.toLowerCase().includes(repo.toLowerCase()),
		)
	if (language !== "all")
		newList = newList.filter(
			(repo) => repo.language?.toLowerCase() === language.toLowerCase(),
		)
	switch (type) {
		case "source":
			newList = newList.filter((repo) => !repo.fork)
			break
		case "forks":
			newList = newList.filter((repo) => repo.fork)
			break
		case "archived":
			newList = newList.filter((repo) => repo.archived)
			break
		case "mirrors":
			newList = newList.filter((repo) => repo.mirror_url !== null)
			break
		default:
			break
	}
	return newList
}

/**
 * Função para extrair o número da última página do header
 * @param headerLink header da requisição
 * @returns número da última página
 */
export const extractLastPageFromHeader = (
	headerLink: string | undefined,
): number => {
	if (!headerLink) return 0
	const splitLinkHeader = headerLink?.split(",")
	const lastLink = splitLinkHeader?.at(-1)
	const splitLastLink = lastLink?.split(";")
	const lastPage = splitLastLink?.[0].split("&page=")[1]
	return Number(lastPage?.charAt(0))
}

/**
 * Função para adicionar filtros de busca por repositórios
 * @param filter_repo filtros de busca por repositórios
 * @param q query de busca
 * @returns query de busca com os filtros aplicados
 */
export const addQueryFilterRepo = (
	filter_repo: TFilterRepo,
	q: string,
): string => {
	const { language, type, repo } = filter_repo
	let query = q
	if (repo) query += `+${repo}+in:name`
	if (language !== "all") query += `+language:${language}`
	switch (type) {
		case "source":
			query += "+fork:false"
			break
		case "forks":
			query += "+fork:true"
			break
		case "archived":
			query += "+archived:true"
			break
		case "mirrors":
			query += "+mirror:true"
			break
		default:
			break
	}
	return query
}
