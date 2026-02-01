import { Spinner } from "react-bootstrap"

export default function Loading() {
	return (
		<div className="flex w-full flex-col items-center justify-center gap-4">
			<Spinner className="h-30! w-30!" />
			<h6>Carregando...</h6>
		</div>
	)
}
