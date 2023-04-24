"use client";
import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from "react";
import { api } from "../services/api";
import { toast } from "react-hot-toast";

interface IProductProvider {
	children: ReactNode;
}

export interface IProduct {
	_id: string;
	name: string;
	price: number;
	amount: number;
	image: string;
	is_active: boolean;
	created: string;
	updated: string;
}

interface IProductCreate {
	data: IProduct;
}

interface IProductsResponse {
	data: IProduct[];
}

export interface IProductForm {
	name: string;
	image?: string;
	price: number;
	amount: number;
}

interface IProductUpdateForm extends IProductForm {
	is_active: boolean;
}

interface IProductContext {
	products?: IProduct[];
	createProduct: (data: IProductForm) => void;
	updateProduct: (data: Partial<IProductUpdateForm>, _id: string) => void;
	deleteProduct: (_id: string) => void;
	openModalProductCreate: () => void;
	closeModalProduct: () => void;

	openModalProductEdit: (product: IProduct) => void;
	modalConfigProduct: IModalConfigEdit;
}

export interface IModalConfigEdit {
	modalType: "closed" | "create" | "update";
	data: {
		amount: number;
		price: number;
		name: string;
		_id: string;
	};
}

const ProductContext = createContext({} as IProductContext);

export const ProductProvider = ({ children }: IProductProvider) => {
	const [products, setProducts] = useState<IProduct[]>();

	const [modalConfigProduct, setModalConfigProduct] =
		useState<IModalConfigEdit>({
			modalType: "closed",
			data: {
				amount: 0,
				price: 0,
				name: "",
				_id: "",
			},
		});

	const closeModalProduct = () => {
		setModalConfigProduct((old) => {
			return {
				modalType: "closed",
				data: {
					amount: 0,
					price: 0,
					name: "",
					_id: "",
				},
			};
		});
	};

	const openModalProductCreate = () => {
		setModalConfigProduct((old) => {
			return {
				modalType: "create",
				data: {
					amount: 0,
					price: 0,
					name: "",
					_id: "",
				},
			};
		});
	};

	const openModalProductEdit = (product: IProduct) => {
		setModalConfigProduct(() => {
			return {
				modalType: "update",
				data: {
					amount: product.amount,
					price: product.price,
					name: product.name,
					_id: product._id,
				},
			};
		});
	};

	const getAllProducts = async () => {
		toast.loading("Loading infos... ");
		const token = localStorage.getItem("@mini-ecommerce:token-dash");
		api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
		try {
			const { data }: IProductsResponse = await api.get("/products");
			setProducts(data);

			toast.dismiss();
		} catch (error) {
			console.log(error);
			toast.dismiss();
			toast.error("Não foi possível obter os dados dos produtos.");
		}
	};

	const createProduct = async (product: IProductForm) => {
		toast.loading("Loading infos... ");
		try {
			const { data }: IProductCreate = await api.post("/products", product);
			setProducts((old) => {
				if (!old) return [data];
				return [...old, data];
			});
			closeModalProduct();
			toast.dismiss();
		} catch (error) {
			console.log(error);
			toast.dismiss();
			toast.error(
				"Não foi possível adicionar o produto, pois já está cadastrado no banco de dados."
			);
		}
	};

	const updateProduct = async (
		product: Partial<IProductUpdateForm>,
		_id: string
	) => {
		toast.loading("Loading infos... ");
		try {
			const { data }: IProductCreate = await api.patch(
				`/products/${_id}`,
				product
			);
			setProducts((old) => {
				const copyProducts = [...old!];
				const updatedProductIndex = copyProducts.findIndex(
					(product) => product._id === _id
				);
				copyProducts[updatedProductIndex] = data;
				return copyProducts;
			});
			closeModalProduct();

			toast.dismiss();
		} catch (error) {
			console.log(error);
			toast.dismiss();
			toast.error("Não foi possível atualizar o produto.");
		}
	};

	const deleteProduct = async (_id: string) => {
		toast.loading("Loading infos... ");
		try {
			const { data }: IProductCreate = await api.delete(`/products/${_id}`);
			setProducts((old) => {
				return old?.filter((p) => p._id !== _id);
			});
			toast.dismiss();
		} catch (error) {
			console.log(error);
			toast.dismiss();
			toast.error("Não foi possível deletar o produto.");
		}
	};

	useEffect(() => {
		getAllProducts();
	}, []);

	return (
		<ProductContext.Provider
			value={{
				createProduct,
				deleteProduct,
				updateProduct,
				products,
				openModalProductEdit,
				closeModalProduct,
				modalConfigProduct,
				openModalProductCreate,
			}}
		>
			{children}
		</ProductContext.Provider>
	);
};

export const useProductContext = () => useContext(ProductContext);
