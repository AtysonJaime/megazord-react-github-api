"use client"

import { Search, X } from "lucide-react"
import { Button, Form, InputGroup } from "react-bootstrap"
import { useState } from "react"
import { useFiltersStore } from "@/stores/filters"

export default function FilterUsers() {
	const { filter_users, setFilterUsers, clearSpecificFilterUsers } =
		useFiltersStore()
	const [searchUser, setSearchUser] = useState(filter_users.user || "")
	const [searchLocation, setSearchLocation] = useState(
		filter_users.location || "",
	)

	/**
	 * Função para buscar usuários passando o nome ou localização ao pressionar a tecla Enter
	 * @param e Evento de teclado
	 */
	const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			handleSearch()
		}
	}

	/**
	 * Função para buscar usuários passando o nome ou localização
	 */
	const handleSearch = () => {
		const { user, location } = filter_users
		setFilterUsers({
			user: user === searchUser ? user : searchUser,
			location: location === searchLocation ? location : searchLocation,
		})
	}

	/**
	 * Função para limpar o filtro de usuários
	 */
	const handleClearFilterUser = () => {
		clearSpecificFilterUsers("user")
		setSearchUser("")
	}

	/**
	 * Função para limpar o filtro de localizações
	 */
	const handleClearFilterLocation = () => {
		clearSpecificFilterUsers("location")
		setSearchLocation("")
	}

	return (
		<Form className="grid w-full! grid-cols-1 flex-wrap items-center gap-2 md:grid-cols-2 md:flex-nowrap">
			<Form.Group controlId="searchUser">
				<Form.Label className="text-[16px]! font-bold!">Usuário</Form.Label>
				<InputGroup>
					<Button
						variant="outline-secondary"
						title="Buscar usuário"
						onClick={handleSearch}
						className="rounded-none! border-t-0! border-r-0! border-l-0! border-(--gray-border)! hover:bg-(--gray-5)! focus:bg-(--gray-5)! active:bg-(--gray-5)!"
					>
						<Search size={24} className="text-(--gray-3)!" />
					</Button>
					<Form.Control
						type="text"
						value={searchUser}
						onKeyDown={handlePressEnter}
						onChange={(e) => setSearchUser(e.target.value)}
						placeholder="Search by user. Ex: pedro"
						className=""
					/>
					{filter_users.user !== "" && (
						<Button
							variant="outline-secondary"
							className="rounded-none! border-t-0! border-r-0! border-l-0! border-(--gray-border)! hover:bg-(--gray-5)! focus:bg-(--gray-5)! active:bg-(--gray-5)!"
							title="Limpar filtro de usuário"
							onClick={handleClearFilterUser}
						>
							<X size={24} className="text-(--gray-3)!" />
						</Button>
					)}
				</InputGroup>
			</Form.Group>
			<Form.Group controlId="searchLocation">
				<Form.Label className="text-[16px]! font-bold!">Localização</Form.Label>
				<InputGroup>
					<Button
						variant="outline-secondary"
						title="Buscar localização"
						onClick={handleSearch}
						className="rounded-none! border-t-0! border-r-0! border-l-0! border-(--gray-border)! hover:bg-(--gray-5)! focus:bg-(--gray-5)! active:bg-(--gray-5)!"
					>
						<Search size={24} className="text-(--gray-3)!" />
					</Button>
					<Form.Control
						type="text"
						value={searchLocation}
						onKeyDown={handlePressEnter}
						onChange={(e) => setSearchLocation(e.target.value)}
						placeholder="Search by location. Ex: Brazil"
						className=""
					/>
					{filter_users.location !== "" && (
						<Button
							variant="outline-secondary"
							className="rounded-none! border-t-0! border-r-0! border-l-0! border-(--gray-border)! hover:bg-(--gray-5)! focus:bg-(--gray-5)! active:bg-(--gray-5)!"
							title="Limpar filtro de localização"
							onClick={handleClearFilterLocation}
						>
							<X size={24} className="text-(--gray-3)!" />
						</Button>
					)}
				</InputGroup>
			</Form.Group>
		</Form>
	)
}
