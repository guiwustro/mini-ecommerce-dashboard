"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import {
	IProductForm,
	useProductContext,
} from "@/app/contexts/ProductsContext";
import Modal from "@/app/components/Modal";
import { FormGroup } from "@/app/components/inputs/InputGlobal";
import IntlCurrencyInput from "react-intl-currency-input";

export const CreateProductModal = () => {
	const {
		createProduct,
		closeModalProduct,
		modalConfigProduct,
		updateProduct,
	} = useProductContext();
	const formSchema = yup.object().shape({
		name: yup.string().required("Campo obrigatório"),
		price: yup.number().required("Campo obrigatório"),
		amount: yup.number().required("Campo obrigatório."),
	});
	const currencyConfig = {
		locale: "pt-BR",
		formats: {
			number: {
				BRL: {
					style: "currency",
					currency: "BRL",
					minimumFractionDigits: 2,
					maximumFractionDigits: 2,
				},
			},
		},
	};
	const handleChange = (event: any, value: any) => {
		event.preventDefault();
		setValue("price", value);
	};
	const ref = useRef<HTMLHeadingElement>(null);
	useEffect(() => {
		function handleOutClick(event: any) {
			const value = ref?.current;

			if (value && !value.contains(event.target)) {
				closeModalProduct();
			}
		}
		document.addEventListener("mousedown", handleOutClick);

		return () => {
			document.removeEventListener("mousedown", handleOutClick);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		formState: { errors },
	} = useForm<IProductForm>({ resolver: yupResolver(formSchema) });
	const [selectedFile, setSelectedFile] = useState(undefined);

	const handleFileInput = (e: any) => {
		setSelectedFile(e.target.files[0]);
	};

	const onSubmitFunction = (data: IProductForm) => {
		if (modalConfigProduct.modalType === "update") {
			updateProduct(data, modalConfigProduct.data._id);

			return;
		}
		createProduct(data, selectedFile);
	};

	useEffect(() => {
		if (modalConfigProduct.modalType === "update") {
			const infoProduct = modalConfigProduct.data;
			setValue("name", infoProduct.name);
			setValue("amount", infoProduct.amount);
			setValue("price", infoProduct.price);
		}
	}, []);

	return (
		<Modal className="items-center justify-center">
			<div
				className="relative flex flex-col items-center max-w-530 p-8 rounded-md bg-white"
				ref={ref}
			>
				<button className="absolute top-1 right-1" onClick={closeModalProduct}>
					<AiOutlineCloseCircle
						size={22}
						color="gray"
						className="hover:bg-gray-50 rounded-full hover:fill-gray-600"
					/>
				</button>
				<div className="flex flex-col items-center">
					<h3 className="font-bold text-2xl pb-5">Registre um novo produto</h3>
				</div>
				<form onSubmit={handleSubmit(onSubmitFunction)}>
					<div>
						<FormGroup
							label="Nome do produto"
							register={register}
							registerName="name"
							errors={errors?.name?.message}
						/>
						<FormGroup
							label="Quantidade em estoque"
							register={register}
							registerName="amount"
							type="number"
							errors={errors?.amount?.message ? "Campo obrigatório" : ""}
						/>
						<label
							className={`font-medium ${
								errors?.price?.message ? "text-red-500" : "text-gray-0"
							}`}
							htmlFor="price"
						>
							Preço por unidade
						</label>
						<IntlCurrencyInput
							currency="BRL"
							config={currencyConfig as any}
							onChange={handleChange}
							max={100000}
							value={getValues("price")}
							// @ts-ignore
							className={`outline-gray-600 w-full rounded-md px-4 h-10 bg-gray-50 border-2 ${
								errors?.price?.message ? "border-red-500" : "border-gray-0"
							} `}
							defaultValue={0}
						/>
						<input
							className="pt-4 pb-2"
							type="file"
							onChange={handleFileInput}
						/>
					</div>
					<button
						type="submit"
						className="font-bold text-lg text-center w-full mt-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg p-2"
					>
						{`${
							modalConfigProduct.modalType === "update"
								? "Atualizar produto"
								: "Adicionar produto"
						} `}
					</button>
				</form>
			</div>
		</Modal>
	);
};
