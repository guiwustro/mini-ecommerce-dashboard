"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import { api } from "../services/api";
import { toast } from "react-hot-toast";
import { IUserLogin } from "../components/FormLogin";
import { useRouter } from "next/navigation";

interface IUserProvider {
	children: ReactNode;
}

interface ILoginRes {
	data: {
		token: string;
		type: "admin" | "common";
	};
}

interface IUserContext {
	loginUser: (data: IUserLogin) => void;
	logout: () => void;
	isAuthenticated: boolean;
}

const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: IUserProvider) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const navigation = useRouter();

	const loginUser = async (loginData: IUserLogin) => {
		toast.loading("Loading infos... ");
		try {
			const { data }: ILoginRes = await api.post("/login", loginData);
			localStorage.setItem("@mini-ecommerce:token-dash", data.token);
			api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
			if (data.type === "common") {
				toast.error("Usuário não possui permissões");
				return;
			}
			setIsAuthenticated(true);
			navigation.push("/dashboard");
			toast.dismiss();
		} catch (error) {
			console.log(error);
			toast.dismiss();
			toast.error("Usuário ou senha inválidos.");
		}
		5;
	};

	const logout = () => {
		localStorage.removeItem("@mini-ecommerce-dash:token");
		navigation.push("/");
		setIsAuthenticated(false);
	};

	return (
		<UserContext.Provider
			value={{
				loginUser,
				logout,
				isAuthenticated,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export const useUserContext = () => useContext(UserContext);
