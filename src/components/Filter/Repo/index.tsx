"use client"

import { useFiltersStore } from "@/stores/filters"
import { listLanguagesRepo, listTypeRepo } from "@/utils/variables"
import { ChevronDown, Search, X } from "lucide-react"
import { useEffect, useState } from "react"
import { Button, Dropdown, Form, InputGroup, Offcanvas } from "react-bootstrap"
import { FaCheck } from "react-icons/fa"

export default function FilterRepo() {
	const { filter_repo, setFilterRepo, clearSpecificFilterRepo } =
		useFiltersStore()
	const [searchRepo, setSearchRepo] = useState(filter_repo.repo || "")

	/**
	 * Função para buscar usuários passando o nome ou localização ao pressionar a tecla Enter
	 * @param e Evento de teclado
	 */
	const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault()
			handleSearch()
		}
	}

	/**
	 * Função para buscar usuários passando o nome ou localização
	 */
	const handleSearch = () => {
		const { repo } = filter_repo
		if (repo !== searchRepo) {
			setFilterRepo({
				...filter_repo,
				repo: searchRepo,
			})
		}
	}

	/**
	 * Função para limpar o filtro de usuários
	 */
	const handleClearFilterRepo = () => {
		clearSpecificFilterRepo("repo")
		setSearchRepo("")
	}

	useEffect(() => {
		setSearchRepo(filter_repo.repo || "")
	}, [filter_repo.repo])

	return (
		<Form className="flex flex-col-reverse gap-2 lg:grid lg:grid-cols-[auto_270px]">
			<Form.Group controlId="searchRepo">
				<InputGroup>
					<Button
						type="button"
						variant="outline-secondary"
						title="Buscar repositório"
						onClick={handleSearch}
						className="sm:flex!rounded-none! hidden! border-t-0! border-r-0! border-l-0! border-(--gray-border)! hover:bg-(--gray-5)! focus:bg-(--gray-5)! active:bg-(--gray-5)!"
					>
						<Search size={24} className="text-(--gray-3)!" />
					</Button>
					<Form.Control
						type="text"
						value={searchRepo}
						onKeyDown={handlePressEnter}
						onChange={(e) => setSearchRepo(e.target.value)}
						placeholder="Search by repository. Ex: react"
						className=""
					/>
					{filter_repo.repo !== "" && (
						<Button
							variant="outline-secondary"
							className="rounded-none! border-t-0! border-r-0! border-l-0! border-(--gray-border)! hover:bg-(--gray-5)! focus:bg-(--gray-5)! active:bg-(--gray-5)!"
							title="Limpar filtro de repositório"
							onClick={handleClearFilterRepo}
						>
							<X size={24} className="text-(--gray-3)!" />
						</Button>
					)}
				</InputGroup>
			</Form.Group>
			<div className="flex items-center justify-between gap-2 rounded-lg! bg-(--gray-bg)! px-2 py-3 sm:rounded-none! sm:bg-transparent! sm:p-0!">
				<div className="flex flex-wrap gap-1">
					<ListTypesRepo />
					<ListLanguageRepo />
				</div>
				<Search size={24} className="text-(--primary)! sm:hidden!" />
			</div>
		</Form>
	)
}

function ListTypesRepo() {
	const { filter_repo, setFilterRepo } = useFiltersStore()
	const [typeRepo, setTypeRepo] = useState(filter_repo.type || "all")
	const [showList, setShowList] = useState(false)

	/**
	 * Função para mudar o tipo de filtro de repositório
	 * @param type tipo de filtro
	 */
	const handleChangeTypeRepo = (type: string) => {
		if (typeRepo === type) return
		setTypeRepo(type)
		setFilterRepo({ ...filter_repo, type })
	}

	useEffect(() => {
		setTypeRepo(filter_repo.type || "all")
	}, [filter_repo.type])

	/**
	 * Função para renderizar a listagem de tipos
	 */
	const contentList = () => {
		return (
			<ul className="m-0! flex flex-col gap-1 p-0!">
				{listTypeRepo.map((item) => {
					return (
						<li key={item.id}>
							<Button
								onClick={() => handleChangeTypeRepo(item.value)}
								className={`flex! min-h-[40px]! w-full! items-center! gap-4! rounded-none! border-none! bg-transparent! text-[16px]! text-(--dark)! shadow-none! transition-all duration-300 outline-none! hover:bg-[linear-gradient(45deg,rgba(0,86,166,0.2)_0%,rgba(5,135,255,0.2)_100%)] ${typeRepo === item.value ? "bg-[linear-gradient(45deg,rgba(0,86,166,0.2)_0%,rgba(5,135,255,0.2)_100%)] text-(--primary)!" : ""}`}
							>
								<div
									className={`flex h-[20px] w-[20px] items-center justify-center rounded-sm! border border-[--gray-border]! ${typeRepo === item.value ? "bg-(--primary)!" : "bg-transparent!"}`}
								>
									{typeRepo === item.value && (
										<FaCheck size={14} color="white" />
									)}
								</div>
								{item.name}
							</Button>
						</li>
					)
				})}
			</ul>
		)
	}

	return (
		<>
			<Button
				type="button"
				onClick={() => setShowList(true)}
				className="flex! items-center! gap-2! rounded-[42px]! border-none! bg-[linear-gradient(45deg,var(--linear-from)_0%,var(--linear-to)_100%)]! px-4! py-2! text-[14px]! text-white transition-all! duration-300 outline-none! after:content-none! hover:text-(--gray-5)! sm:hidden! lg:text-[18px]!"
			>
				<ChevronDown size={24} />
				Type
			</Button>
			<Dropdown>
				<Dropdown.Toggle className="hidden! items-center! gap-2! rounded-[42px]! border-none! bg-[linear-gradient(45deg,var(--linear-from)_0%,var(--linear-to)_100%)]! px-4! py-2! text-[14px]! text-white transition-all! duration-300 outline-none! after:content-none! hover:text-(--gray-5)! sm:flex! lg:text-[18px]!">
					<ChevronDown size={24} />
					Type
				</Dropdown.Toggle>
				<Dropdown.Menu className="min-w-[256px] bg-[linear-gradient(45deg,rgba(0,86,166,0.05)_0%,rgba(5,135,255,0.05)_100%)]!">
					{contentList()}
				</Dropdown.Menu>
			</Dropdown>
			<Offcanvas show={showList} onHide={() => setShowList(false)}>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>Type</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>{contentList()}</Offcanvas.Body>
			</Offcanvas>
		</>
	)
}

function ListLanguageRepo() {
	const { filter_repo, setFilterRepo } = useFiltersStore()
	const [showList, setShowList] = useState(false)
	const [languageRepo, setLanguageRepo] = useState(
		filter_repo.language || "all",
	)

	/**
	 * Função para mudar o tipo de filtro de repositório
	 * @param type tipo de filtro
	 */
	const handleChangeLanguageRepo = (language: string) => {
		if (languageRepo === language) return
		setLanguageRepo(language)
		setFilterRepo({ ...filter_repo, language })
	}

	useEffect(() => {
		setLanguageRepo(filter_repo.language || "all")
	}, [filter_repo.language])

	/**
	 * Função para renderizar a listagem de linguagens
	 */
	const contentList = () => {
		return (
			<ul className="m-0! flex flex-col gap-1 p-0!">
				{listLanguagesRepo.map((item) => {
					return (
						<li key={item.id}>
							<Button
								onClick={() => handleChangeLanguageRepo(item.value)}
								className={`flex! min-h-[40px]! w-full! items-center! gap-4! rounded-none! border-none! bg-transparent! text-[16px]! text-(--dark)! shadow-none! transition-all duration-300 outline-none! hover:bg-[linear-gradient(45deg,rgba(0,86,166,0.2)_0%,rgba(5,135,255,0.2)_100%)] ${languageRepo === item.value ? "bg-[linear-gradient(45deg,rgba(0,86,166,0.2)_0%,rgba(5,135,255,0.2)_100%)] text-(--primary)!" : ""}`}
							>
								<div
									className={`flex h-[20px] w-[20px] items-center justify-center rounded-sm! border border-[--gray-border]! ${languageRepo === item.value ? "bg-(--primary)!" : "bg-transparent!"}`}
								>
									{languageRepo === item.value && (
										<FaCheck size={14} color="white" />
									)}
								</div>
								{item.name}
							</Button>
						</li>
					)
				})}
			</ul>
		)
	}

	return (
		<>
			<Button
				onClick={() => setShowList(true)}
				className="flex! items-center! gap-2! rounded-[42px]! border-none! bg-[linear-gradient(45deg,var(--linear-from)_0%,var(--linear-to)_100%)]! px-4! py-2! text-[14px]! text-white transition-all! duration-300 outline-none! after:content-none! hover:text-(--gray-5)! sm:hidden! lg:text-[18px]!"
			>
				<ChevronDown size={24} />
				Language
			</Button>
			<Dropdown>
				<Dropdown.Toggle className="hidden! items-center! gap-2! rounded-[42px]! border-none! bg-[linear-gradient(45deg,var(--linear-from)_0%,var(--linear-to)_100%)]! px-4! py-2! text-[14px]! text-white transition-all! duration-300 outline-none! after:content-none! hover:text-(--gray-5)! sm:flex! lg:text-[18px]!">
					<ChevronDown size={24} />
					Language
				</Dropdown.Toggle>
				<Dropdown.Menu className="min-w-[256px] bg-[linear-gradient(45deg,rgba(0,86,166,0.05)_0%,rgba(5,135,255,0.05)_100%)]!">
					{contentList()}
				</Dropdown.Menu>
			</Dropdown>
			<Offcanvas show={showList} onHide={() => setShowList(false)}>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>Language</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>{contentList()}</Offcanvas.Body>
			</Offcanvas>
		</>
	)
}
