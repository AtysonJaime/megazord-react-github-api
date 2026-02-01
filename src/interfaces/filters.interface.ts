export type TItemFilter = {
  id: number,
  name: string,
  value: string
}

export type TFilterUsers = {
	user: string
	location: string
}

export type TFilterRepo = {
	repo: string
	type: string
	language: string
}

export interface IFilterStore {
	filter_users: TFilterUsers
	filter_repo: TFilterRepo
	setFilterUsers: (filter_users: TFilterUsers) => void
	clearSpecificFilterUsers: (key: keyof TFilterUsers) => void
	setFilterRepo: (filter_repo: TFilterRepo) => void
	clearSpecificFilterRepo: (key: keyof TFilterRepo) => void
}
