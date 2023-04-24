"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormGroup } from "./inputs/InputGlobal";
import { useForm } from "react-hook-form";
import { useUserContext } from "../contexts/UserContext";

export interface IUserLogin {
	username: string;
	password: string;
}

export const FormLogin = () => {
	const { loginUser } = useUserContext();

	const formSchema = yup.object().shape({
		username: yup.string().required("Campo obrigatório"),
		password: yup.string().required("Campo obrigatório"),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IUserLogin>({ resolver: yupResolver(formSchema) });

	const onSubmitFunction = (data: IUserLogin) => {
		loginUser(data);
	};
	return (
		<div className="flex flex-col items-center  p-8 rounded-md bg-white shadow-md ">
			<form onSubmit={handleSubmit(onSubmitFunction)}>
				<div>
					<FormGroup
						label="Usuário"
						register={register}
						registerName="username"
						errors={errors?.username?.message}
					/>
					<FormGroup
						label="Senha"
						register={register}
						type="password"
						registerName="password"
						errors={errors?.password?.message}
					/>
				</div>
				<button
					type="submit"
					className="font-bold text-lg text-center w-full mt-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg p-2"
				>
					Entrar
				</button>
			</form>
		</div>
	);
};
