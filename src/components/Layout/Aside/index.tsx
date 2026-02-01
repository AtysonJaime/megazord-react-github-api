import { Building, Instagram, Link2, MapPin, Smile, User } from "lucide-react"
import Link from "next/link"
import { Accordion } from "react-bootstrap"

export default function Aside() {
	return (
		<aside className="flex w-full flex-col gap-11 sm:max-w-[217px]! lg:max-w-[255px]!">
			<div className="flex flex-col items-center justify-center gap-6">
				{/* Foto do usuário */}
				<div className="relative flex h-[104px]! w-[104px] items-center justify-center lg:h-[150px]! lg:w-[150px]">
					<div className="flex h-full w-full items-center justify-center rounded-full! bg-(--gray-bg)! shadow-(--box-shadow-inner)!">
						<User size={50} className="text-(--gray-3)!" />
					</div>
					<div className="absolute right-0 bottom-0 flex h-[28px] w-[28px] items-center justify-center rounded-full! bg-white shadow-(--box-shadow)! lg:h-[40px] lg:w-[40px]">
						<Smile size={20} className="text-(--gray-3)!" />
					</div>
				</div>
				{/* Info do usuário */}
				<div className="flex w-full max-w-[217px]! flex-col items-center justify-center gap-1 sm:max-w-full!">
					<h5 className="text-[20px]! font-bold! lg:text-[24px]!">Teste</h5>
					<p className="text-center! text-[12px]! text-(--gray-3)! md:text-[14px]! lg:text-[16px]!">
						Head development team Front-End Magazord - Tagged (#BZ)
					</p>
				</div>
			</div>
			<div className="hidden sm:block!">
				<ListLinks />
			</div>
			<Accordion className="block sm:hidden!">
				<Accordion.Item eventKey="0" className="rounded-none! border-0!">
					<Accordion.Header className="m-0! text-(--primary)! hover:text-(--primary-dark)! [&>button]:flex! [&>button]:flex-col! [&>button]:items-center! [&>button]:justify-center! [&>button]:rounded-none! [&>button]:border-0! [&>button]:bg-transparent! [&>button]:p-0! [&>button]:shadow-none! [&>button]:transition-all! [&>button]:duration-300! [&>button]:outline-none! [&>button::after]:m-auto! [&>button:hover>small]:text-(--primary-dark)! [&>button>small]:transition-all! [&>button>small]:duration-300!">
						<p className="text-(--primary)!">Informações Adicionais</p>
					</Accordion.Header>
					<Accordion.Body className="mt-2! rounded-2xl! bg-(--gray-bg)! p-4!">
						<ListLinks />
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
		</aside>
	)
}

function ListLinks() {
	const linkClassName =
		"flex items-center gap-2.5 text-(--primary)! hover:text-(--primary-dark)! hover:underline! focus:text-(--primary-dark)! focus:underline! active:text-(--primary-dark)! active:underline! transition-all duration-300!"
	return (
		<ul className="m-0! flex list-none! flex-col gap-4 p-0!">
			<li>
				<Link href={"/"} className={linkClassName}>
					<Building size={20} />
					Megazord - plataforma
				</Link>
			</li>
			<li>
				<Link href={"/"} className={linkClassName}>
					<MapPin size={20} />
					São Paulo, SP
				</Link>
			</li>
			<li>
				<Link href={"/"} className={linkClassName}>
					<Link2 size={20} />
					Cordas.hub.uok
				</Link>
			</li>
			<li>
				<Link href={"/"} className={linkClassName}>
					<Instagram size={20} />
					@atysonjaime
				</Link>
			</li>
		</ul>
	)
}
