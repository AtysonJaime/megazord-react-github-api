import Link from "next/link"

export default function NotFound() {
	return (
		<div className="flex h-full w-full flex-col items-center justify-center gap-3">
			<h2 className="z-1 m-0 text-center">Rota acessada não existe</h2>
			<h4 className="z-1 m-0 max-w-300 text-center">
				Não conseguimos encontrar a rota desejada, por favor, verifique o
				endereço informado.
			</h4>
			<div className="z-1 flex flex-wrap items-center justify-center gap-2">
				<Link
					href={"/"}
					className="rounded-md! border border-(--primary)! bg-transparent! p-2! font-bold! text-(--primary)! transition-all duration-300! hover:bg-(--primary)! hover:text-white!"
					type="button"
				>
					Voltar para a página inicial
				</Link>
			</div>
		</div>
	)
}
