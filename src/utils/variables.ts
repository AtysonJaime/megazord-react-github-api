import { TItemFilter } from "@/interfaces/filters.interface"

/**
 * Lista de tipos de repositórios para o filtro
 */
export const listTypeRepo: TItemFilter[] = [
	{
		id: 200,
		name: "All",
		value: "all",
	},
	{
		id: 201,
		name: "Source",
		value: "source",
	},
	{
		id: 202,
		name: "Forks",
		value: "forks",
	},
	{
		id: 203,
		name: "Archived",
		value: "archived",
	},
	{
		id: 204,
		name: "Mirrors",
		value: "mirrors",
	},
]

/**
 * Lista de linguagens de repositórios para o filtro
 */
export const listLanguagesRepo: TItemFilter[] = [
	{
		id: 1,
		name: "All",
		value: "all",
	},
	{
		id: 2,
		name: "Java",
		value: "java",
	},
	{
		id: 3,
		name: "TypeScript",
		value: "typescript",
	},
	{
		id: 4,
		name: "HTML",
		value: "html",
	},
	{
		id: 5,
		name: "CSS",
		value: "css",
	},
]
