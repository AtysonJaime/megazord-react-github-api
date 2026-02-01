import { Octokit } from "octokit"

console.log("[process.env.GITHUB_TOKEN]", process.env.NEXT_PUBLIC_GITHUB_TOKEN)

const octokit = new Octokit({
	auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
})

export const fetchUsers = async (page: number) => {
	try {
		const response = await octokit.request("GET /users", {
			search: "aty",
		})
		return response.data
	} catch (error: any) {
		console.log("[Erro ao buscar usuários]", error)
	}
}
