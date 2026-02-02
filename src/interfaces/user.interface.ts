export type TListGithubCard = {
	login: string
	id: number
	avatar_url: string
}

export type TUserGithub = {
	id: number
	avatar_url: string | null
	bio: string | null
	blog: string | null
	company: string | null
	email: string | null
	location: string | null
	login: string
	name: string | null
	html_url: string | null
	twitter_username: string | null | undefined
	public_repos: number
}

