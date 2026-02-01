"use client"

import CardUserProfile from "@/components/Card/UserProfile"
import Loading from "@/components/Layout/Loading"
import { fetchUsers } from "@/server"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

export default function Home() {
	const [currentPage, setCurrentPage] = useState(2)
	const { data, status } = useQuery({
		queryKey: ["users", currentPage],
		queryFn: () => fetchUsers(currentPage),
	})

	console.log("[data]", data)
	console.log("[status]", status)

	if (status === "pending") {
		return <Loading />
	}

	if (status === "error") {
		return <div>Error</div>
	}

	return (
		<main className="mx-auto w-full max-w-360">
			{data?.map((user) => {
				return <CardUserProfile key={user.id} user={user} />
			})}
		</main>
	)
}
