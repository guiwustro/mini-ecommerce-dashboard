"use client";

import { IProduct, useProductContext } from "@/app/contexts/ProductsContext";
import { convertNumberToBRL } from "@/app/utils/convertNumberToBRL";
import { AiOutlineEdit } from "react-icons/ai";
import { BsTrashFill } from "react-icons/bs";
import Alert from "../../components/Alert";
import { useState } from "react";

const TableProducts = () => {
	const { products, openModalProductEdit } = useProductContext();
	const [alert, setAlert] = useState({
		_id: "",
		isOpen: false,
		name: "",
	});

	const closeAlert = () => {
		setAlert({
			_id: "",
			isOpen: false,
			name: "",
		});
	};

	const openAlert = (product: IProduct) => {
		setAlert({
			_id: product._id,
			isOpen: true,
			name: product.name,
		});
	};

	const activeProducts = products?.filter((product) => product.is_active);
	// ProductProvider
	console.log(products);
	return (
		<>
			<div className="w-full rounded-lg  flex lg:justify-center items-center mt-4 overflow-x-auto">
				<table className="w-full table-auto overflow-x-auto  max-w-screen-xl border-2 border-collapse">
					<thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
						<tr>
							<th className="border py-3 px-6 text-left min-w-[270px]">Nome</th>
							<th className="border py-3 px-6 text-left">Preço</th>
							<th className="border py-3 px-6 text-left">Estoque</th>
							<th>Ações</th>
						</tr>
					</thead>
					<tbody className="text-gray-600 text-sm font-light ">
						{activeProducts?.map((product) => {
							return (
								<tr key={product._id}>
									<td className="border py-3 px-6 text-left">{product.name}</td>
									<td className="border py-3 px-6 text-left">
										{convertNumberToBRL(product.price)}
									</td>
									<td className="border py-3 px-6 text-left">
										{product.amount} unidades
									</td>
									<td className="border py-3 px-6 text-center ">
										<button
											className="pe-2"
											onClick={() => openModalProductEdit(product)}
										>
											<AiOutlineEdit />
										</button>
										<button onClick={() => openAlert(product)}>
											<BsTrashFill />
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
			{alert.isOpen && (
				<Alert
					_id={alert._id}
					closeAlert={closeAlert}
					isOpen={alert.isOpen}
					name={alert.name}
				/>
			)}
		</>
	);
};

export default TableProducts;
