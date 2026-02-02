export type TRepoGithub = {
	id: number
	name: string
	full_name: string
	description: string | null
	html_url: string
	language: string | null
	stargazers_count: number
	forks_count: number
	topics: string[]
	fork: boolean
	archived: boolean
	mirror_url: string | null
}

export type TRepoData = {
	items: TRepoGithub[]
	total_count: number
}

export type TRepoStarredData = {
	data: TRepoGithub[]
	lastPage: number
}
