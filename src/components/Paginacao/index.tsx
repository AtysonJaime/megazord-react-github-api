import React, { ReactElement } from "react"
import { ChevronLeft, ChevronRight, Ellipsis } from "lucide-react"

type Props = {
	pageAtual: number
	totalPages: number
	nextPage: () => void
	prevPage: () => void
	clickPage: (pagina: any) => void
}

export default function Paginacao({
	pageAtual,
	totalPages,
	nextPage,
	prevPage,
	clickPage,
}: Readonly<Props>) {
	const generatePaginationButtons = () => {
		const items: ReactElement[] = []
		const addButton = (index: number) =>
			items.push(
				<button
					key={`page_${index}`}
					className={`page flex h-[30px] px-1! min-w-[30px] cursor-pointer items-center justify-center rounded-[6px]! border border-(--dark) bg-white text-(--dark)! transition-all duration-500 hover:bg-(--primary)! hover:text-white! focus:bg-(--primary)! focus:text-white! active:bg-(--primary)! active:text-white! disabled:border-(--gray-3)! disabled:bg-(--gray-5)! disabled:text-(--dark)! [.active]:bg-(--primary)! [.active]:text-white! ${pageAtual === index ? "active" : ""}`}
					title={`Ir para página ${index}`}
					aria-label={`Ir para página ${index}`}
					onClick={() => clickPage(index)}
				>
					{index}
				</button>,
			)

		const addDots = (key: string) =>
			items.push(
				<button
					key={key}
					className="page flex h-[30px] w-[30px] min-w-[30px] cursor-pointer items-end justify-center rounded-[6px]! border border-(--dark) bg-white text-(--dark)! transition-all duration-500 hover:bg-(--primary)! hover:text-white! focus:bg-(--primary)! focus:text-white! active:bg-(--primary)! active:text-white! disabled:border-(--gray-3)! disabled:bg-(--gray-5)! disabled:text-(--dark)! [.active]:bg-(--primary)! [.active]:text-white!"
					disabled
					data-testid="pagination-dots"
				>
					<Ellipsis size={20} />
				</button>,
			)

		if (totalPages <= 5) {
			for (let i = 1; i <= totalPages; i++) addButton(i)
		} else {
			addButton(1)
			if (pageAtual > 3) addDots("left-dots")

			const rangeStart = Math.max(2, pageAtual - 1)
			const rangeEnd = Math.min(totalPages - 1, pageAtual + 1)
			for (let i = rangeStart; i <= rangeEnd; i++) addButton(i)

			if (pageAtual < totalPages - 2) addDots("right-dots")
			addButton(totalPages)
		}

		return items
	}

	return (
		<div
			data-testid="pagination-content"
			className="flex items-end justify-end gap-2"
		>
			<button
				data-testid="previous-button"
				className="previous flex! h-[30px] w-[30px] min-w-[30px] cursor-pointer items-center justify-center rounded-[6px]! border border-(--dark) bg-white text-(--dark)! transition-all duration-500 hover:bg-(--primary)! hover:text-white! focus:bg-(--primary)! focus:text-white! active:bg-(--primary)! active:text-white! disabled:border-(--gray-3)! disabled:bg-(--gray-5)! disabled:text-(--dark)! [.active]:bg-(--primary)! [.active]:text-white!"
				title="Voltar página"
				aria-label="Voltar página"
				disabled={pageAtual === 1}
				onClick={prevPage}
			>
				<ChevronLeft size={20} />
			</button>
			<div className="pages flex flex-wrap items-center justify-center gap-2">
				{generatePaginationButtons()}
			</div>
			<button
				data-testid="next-button"
				className="next flex h-[30px] w-[30px] min-w-[30px] cursor-pointer items-center justify-center rounded-[6px]! border border-(--dark) bg-white text-(--dark)! transition-all duration-500 hover:bg-(--primary)! hover:text-white! focus:bg-(--primary)! focus:text-white! active:bg-(--primary)! active:text-white! disabled:border-(--gray-3)! disabled:bg-(--gray-5)! disabled:text-(--dark)! [.active]:bg-(--primary)! [.active]:text-white!"
				title="Proxima página"
				aria-label="Proxima página"
				disabled={pageAtual === totalPages}
				onClick={nextPage}
			>
				<ChevronRight size={20} />
			</button>
		</div>
	)
}
