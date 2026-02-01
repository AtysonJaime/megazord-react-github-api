export type TFilterUsers = {
	user: string
	location: string
}

export interface IFilterStore {
	filter_users: TFilterUsers
	setFilterUsers: (filter_users: TFilterUsers) => void
	clearSpecificFilterUsers: (key: keyof TFilterUsers) => void
}
