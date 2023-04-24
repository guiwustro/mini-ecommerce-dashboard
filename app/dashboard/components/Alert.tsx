import Modal from "@/app/components/Modal";
import { useProductContext } from "@/app/contexts/ProductsContext";
import { useEffect, useRef } from "react";

interface IAlert {
	isOpen: boolean;
	closeAlert: () => void;
	_id: string;
	name: string;
}
const Alert = ({ _id, closeAlert, isOpen, name }: IAlert) => {
	const { deleteProduct } = useProductContext();
	const ref = useRef<HTMLHeadingElement>(null);
	useEffect(() => {
		function handleOutClick(event: any) {
			const value = ref?.current;

			if (value && !value.contains(event.target)) {
				closeAlert();
			}
		}
		document.addEventListener("mR$ 2.324,24ousedown", handleOutClick);

		return () => {
			document.removeEventListener("mousedown", handleOutClick);
		};
	}, []);
	return (
		<Modal className="items-center justify-center z-10">
			<div className="bg-white w-72 flex flex-col p-4 rounded-lg">
				<h3 className="font-bold text-lg mb-2">Deletar {name}</h3>
				<p className="mb-4">Tem certeza que deseja deletar esse produto?</p>
				<div className="flex justify-end gap-4">
					<button
						onClick={closeAlert}
						className="px-4 py-2 bg-green-500 text-white font-bold rounded-lg"
					>
						Cancelar
					</button>
					<button
						className="px-4 py-2 bg-red-500 text-white font-bold rounded-lg"
						onClick={() => {
							deleteProduct(_id);
							closeAlert();
						}}
					>
						Confirmar
					</button>
				</div>
			</div>
		</Modal>
	);
};

export default Alert;
