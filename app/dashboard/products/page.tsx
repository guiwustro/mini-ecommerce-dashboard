"use client";
import { useProductContext } from "@/app/contexts/ProductsContext";
import TableProducts from "./components/TableProducts";
import { CreateProductModal } from "./components/ModalFormProduct";

export default function Products() {
	const { modalConfigProduct, openModalProductCreate } = useProductContext();
	return (
		<main className="flex min-h-screen flex-col items-center px-10 lg:ps-52">
			<div className="pt-4 flex justify-between w-full items-center max-w-7xl">
				<h1 className="font-semibold text-xl text-gray-600 ">
					Lista de produtos
				</h1>
				<button
					onClick={openModalProductCreate}
					className="font-bold text-lg text-center px-4 py-2 mt-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg"
				>
					Adicionar
				</button>
			</div>
			<TableProducts />
			{modalConfigProduct.modalType !== "closed" && <CreateProductModal />}
		</main>
	);
}
