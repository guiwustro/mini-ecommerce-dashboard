"use client";

import { Toaster } from "react-hot-toast";

const Dashboard = () => {
	return (
		<div className="px-52 pt-4">
			<h3 className="text-lg font-bold">Bem vindo!</h3>
			<p className="w-1/2">
				Para ver os produtos, cria-los, editá-los ou removê-los clique em
				Produtos, no menu lateral e para verificar os pedidos criados pelos
				clientes na aba Pedidos!
			</p>
		</div>
	);
};

export default Dashboard;
