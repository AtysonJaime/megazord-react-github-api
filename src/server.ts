import { Octokit } from "octokit"
import { TFilterUsers } from "./interfaces/filters.interface"

const octokit = new Octokit({
	auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
})
export const fetchUsers = async (filter_users: TFilterUsers, page: number) => {
  let q : string = ""
  if(filter_users.user) {
    q += `${filter_users.user}`
  }
  if(filter_users.location) {
    if(q !== "") {
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
